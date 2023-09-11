const express=require('express')
const cors=require('cors')
const {readFile, readFileSync}=require('fs')
const {query} =require('../db_config/query')
const {connectionMysql,insertData,update}=require('../db_config/dbs')
const { resolve } = require('path')
const {parse}=require('url')
const https=require('https')
const WXBizDataCrypt=require('./WXBizDataCrypt')
const multer=require('multer')
const axios= require('axios')
const {randomUUID}=require('crypto')
const {storage_avatar,antique,store_picture,storage_background,storage_mask,moments,WORK}=require('./custom_multer')

// 创建app
const app=express()

// 解析post请求数据
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({limit : '21000000kb'}));
    
    // 网页端
    const upload_store=multer({storage:store_picture}).single('images')
    const uploader=multer({storage:antique}).single('files')


    const Works=multer({storage:WORK}).single('works')
    

    const upload_mask=multer({storage:storage_mask}).single('mask')

    const upload_moments=multer({storage:moments}).single('moment')

    // 小程序端
    const upload=multer({storage:storage_avatar}).single('avatar')
    const upload_background=multer({storage:storage_background}).single('avatar')

app.use(cors())
const options = {
  key: readFileSync(resolve(__dirname,'..', 'cert','a.key')),
  cert: readFileSync(resolve(__dirname,'..', 'cert','a.pem'))
}
entry()
//  入口文件
function entry(){
    // 解析文件
    readFile('./base_config.json',async function(err,data){   
        if(err) return 
        data=JSON.parse(data.toString())
        const {server_config,db_config}=data
// 这是机制问题，当没有操作数据的时候，就断开连接了 在网站stackoverflow看到了解决方案 强制连接,让数据库每1hours查询一次        
        await connectionMysql(db_config).then(value=>{
            let n=0
            setInterval(()=>{
                value.query('select 1')
                n++
            },3600000)
            MountRouter(value,db_config)  
            https.createServer(options,app).listen(server_config.port,function(){
            })  
        })
    })
}
function MountRouter(dbs,db_config){
const {database}=db_config

function table(tab){
    return database+'.'+tab
}
    app.post('/get_code',(req,res)=>{
        if(typeof req.body === 'string')
            req.body=JSON.parse(req.body)
        if(!req.body.hasOwnProperty('code')){
            res.send({
                state:0,
                error:1,
                errMes:'缺少参数'
            })
        }
        let {code}=req.body
        let url=`https://api.weixin.qq.com/sns/jscode2session?appid=wxa30b9f23a9cc5e65&secret=da2bfc24afaa33b78cfc8223e2c32e0c&js_code=${code}&grant_type=authorization_code`
        axios.get(url).then(e=>{
            res.send({
                state:1,
                error:0,
                data:e.data
            })
        }).catch(e=>{
            res.send({
                state:0,
                error:1
            })
        })
    })
    app.post('/getRun',function(req,res){
        if(typeof req.body === 'string')
            req.body=JSON.parse(req.body)
            var appId = 'wxa30b9f23a9cc5e65'
        let {sessionKey,encryptedData,iv}=req.body
        var pc = new WXBizDataCrypt(appId, sessionKey)

        var data = pc.decryptData(encryptedData , iv)
        res.send({
            state:1,
            error:0,
            data:data
        });
    })  

    
// 小程序上传文件接口
app.post('/upload_avatar',(req,res)=>{
    upload(req,res,function(err){
        if(err){
            res.send({
                state:0,
                error:1,
                errMes:err
            })
            return
        }
    if(typeof req.body == 'string') 
        req.body=JSON.parse(req.body)
    // 缺少参数
    if(req.body.openid.length<=0||req.body.openid==null||req.body.openid==undefined){
        res.send({
            state:0,
            error:1,
            errMes:'缺少参数'
        })
        return
    }
    let path=`https://mynameisczy.cn/antique/user_avatar/${req.file.filename}`
    if(req.file.filename.length<=0){
        send_err(res)
        return
    }
    // 写入数据库
    update(dbs,db_config.database+'.main_table',{openid:req.body.openid},'avatar',path,'string').then(()=>{
        // 保存成功
            res.send({
                state:1,
                error:0,
                value:path
            })
    }).catch(()=>{
        res.send({
            state:0,
            error:1,
            errMes:'保存失败'
        })
    })
    })
})

// 小程序上传文件接口
app.post('/upload_background',(req,res)=>{
    upload_background(req,res,function(err){
        if(err){
            res.send({
                state:0,
                error:1,
                errMes:err
            })
            return
        }
    if(typeof req.body == 'string') 
        req.body=JSON.parse(req.body)
    // 缺少参数
    if(req.body.openid.length<=0||req.body.openid==null||req.body.openid==undefined){
        res.send({
            state:0,
            error:1,
            errMes:'缺少参数'
        })
        return
    }
    let path=`https://mynameisczy.cn/antique/user_background/${req.file.filename}`
    // 写入数据库
    update(dbs,db_config.database+'.main_table',{openid:req.body.openid},'background',path,'string').then(()=>{
        // 保存成功
            res.send({
                state:1,
                error:0,
                value:path
            })
    }).catch(()=>{
        res.send({
            state:0,
            error:1,
            errMes:'保存失败'
        })
    })
    })
})

 //  登录
 app.post('/login_user',function(req,res){
    // 参数列表:
        // openid:<string>(用户唯一标识)
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    
    if(req.body.openid.trim().length<1){
        res.send({
            state:0,
            error:2,
            errorMes:"数据值无效(上传数据为空|长度小于1)"
        })
        return
    }        
    const {openid}=req.body                
    // 查询用户是否注册(在user_info里显示)
    query(dbs,db_config.database+'.main_table',['name','avatar','sex','background','introduce'],{openid:openid}).then(e=>{
        // 存在
        // 将查询到的数据返回
        if(e.length){
            res.send({
                state:2,
                error:0,
                value:e[0]
            })
            return
        }else{
        // 不存在
        // 插入数据
            insertData(dbs,db_config.database+'.main_table',JSON.stringify({
                openid
            })).then(e=>{
                // 插入成功
                res.send({
                    state:1,
                    error:0
                })
                return
            }).catch(e=>{
                // 插入失败
                res.send({
                    state:0,
                    error:1,
                    errorMes:"插入失败"
                })
                return
            })
        }
    })
})

// 拿到openid
app.post('/getOpenid',function(req,res){
    // {
        // session_key: 'FVzfM5h17mD+R4TfgQSsmg==',
        // openid: 'o8e2B5FgakIBZkIl9PUkdAfv2_aA'
    //   }            
        const appid='wxa30b9f23a9cc5e65'
        const secret='c47844ad22cd7771aed6127fa0dad6df'
        if(typeof req.body === 'string')
            req.body=JSON.parse(req.body)
        if(!req.body.hasOwnProperty('code')){
            res.send({
                state:0,
                error:1,
                errorMes:'缺少参数'
            })
            return
        }
        if(typeof req.body.code !== 'string'){
            res.send({
                state:0,
                error:1,
                errorMes:'数据类型出错'
            })
            return
        }
        if(!req.body.code.trim().length){
            res.send({
                state:0,
                error:2,
                errorMes:"数据值无效(上传数据为空|长度小于1)"
            })
            return
        }
        const {code}=req.body
        let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';

        axios.post(url).then(value=>{
            // 这里拿到value存入
            // 先查看是否存在，不存在就存储
            // query(dbs,'mynameisczy_asia.user_info',[''])
            res.send({
                state:1,
                value:value.data
            })
            return
        }).catch(e=>{
            res.send({
                state:0,
                error:1,
                errorMes:e
            })
            return
        })
    }) 


app.post('/set_user_property',function(req,res){
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('openid')||!req.body.hasOwnProperty('value')||!req.body.hasOwnProperty('property')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }          
    if(req.body.value.trim().length<1||req.body.property.trim().length<1){
        res.send({
            state:0,
            error:2,
            errorMes:"数据值无效(数据为空|长度小于1)"
        })
        return
    }
    
    const {value,property,openid}=req.body
    update(dbs,db_config.database+'.main_table',{openid:openid},property,value,'string').then(e=>{
        res.send({
            state:1,
            error:0
        })
    })
})

app.post('/getStoreInfo',(req,res)=>{
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('name')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }  
    let {name}=req.body
    query(dbs,db_config.database+'.goods',null,{name:name}).then(e=>{
        if(e.length<=0){
            res.send({
                state:0,
                error:1,
                errMes:"该商品不存在"
            })
            return
        }
    query(dbs,db_config.database+'.goods_pic','src',{name:name}).then(e2=>{
        if(e2.length<=0){
            res.send({
                state:0,
                error:1,
                errMes:"该商品不存在"
            })
            return
        }
        res.send({
            state:1,
            error:0,
            data:{
                info:e[0],
                pic:e2
            }
        })
    })
    })
})
app.post('/buy_goods',(req,res)=>{
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('goods_name')||!req.body.hasOwnProperty('openid')||!req.body.hasOwnProperty('count')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }  
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    let {goods_name,openid,count}=req.body
    // 查询该商品库存是否够
    query(dbs,db_config.database+'.goods',['depository','money','src','store'],{name:goods_name}).then(e1=>{
        if(e1.length<1){
            res.send({
                state:0,
                error:1,
                errMes:"该商品不存在"
            })
            return
        }
        let {src,money,store}=e1[0]
        if(e1[0].depository<=0){
            res.send({
                state:0,
                error:1,
                errMes:"该商品售空"
            })
        }else{
            // 购买业务
            // 查询openid（然后进行购买）
            query(dbs,db_config.database+'.main_table',['avatar','name'],{openid:openid}).then(e=>{
                if(e.length<1){
                    res.send({
                        state:0,
                        error:1,
                        errMes:"该用户不存在"
                    })
                    return
                }
                // 增加数据
                insertData(dbs,db_config.database+'.bought_log',{openid:openid,bought_count:1,name:goods_name})
                insertData(dbs,db_config.database+'.bills',{openid:openid,src:src,name:goods_name,count:count,money:money,uuid:randomUUID(),store:store})

                // 修改数据
                update(dbs,db_config.database+'.goods',{name:goods_name},'depository',count,'number','-')
                update(dbs,db_config.database+'.goods',{name:goods_name},'sale',count,'number','+')
                res.send({
                    state:1,
                    error:0
                })
            })
        }
    })
})

app.post('/get_goods',(req,res)=>{
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('goods_name')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }  
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    dbs.query(`select name,bought_date,(select avatar from main_table where openid=b.openid) as user_avatar,(select name from main_table where openid=b.openid) as user_name  from bought_log b where name="${req.body.goods_name}"`,function(err,result){
        if(err){
            send_err(res,err)
        }
        send(res,result)
    })

    // query(dbs,db_config.database+'.bought_log','',{name:req.body.goods_name}).then(e=>{
        // send(res,e)
    // })
})

app.post('/get_bills',(req,res)=>{
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }  
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    let {openid}=req.body
    // explain SELECT name,count,src,money,uuid,date,(select store from goods where name="团扇") as store_name FROM `bills` WHERE state="show" and name="团扇" and openid="oMLZp5fTbzeqkoNhx41dVCvIWJjE"

    query(dbs,table('bills'),['name','count','src','money','uuid','date','store','state2'],{state:'show',openid:openid}).then(e=>{
        if(e.length){
            send(res,e)
        }
    }).catch(e=>{
        send_err(res,e)
    })

})

app.post('/hid_bill',(req,res)=>{
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('uuid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    const {uuid}=req.body
    update(dbs,table('bills'),{uuid:uuid},'state','deleted','string').then(e=>{
        send(res)
    }).catch(e=>{
        send_err(res,e)
    })
})
app.post('/upload_store',(req,res)=>{
    upload_store(req,res,function(err){
        if(err){
            res.send({
                state:0,
                error:1,
                errMes:err
            })
            return
        }
    let path=`https://mynameisczy.cn/antique/store_picture/${req.file.filename}`
    if(req.file.filename.length<=0){
        send_err(res)
        return
    }
    // 写入数据库
    send(res,'success')
    })
})


app.post('/upload_material',(req,res)=>{
    uploader(req,res,function(err){
        if(err){
            res.send({
                state:0,
                error:1,
                errMes:err
            })
            return
        }
        if(req.file.filename.length<=0){
            send_err(res)
            return
        }
    send(res,{name:req.file.filename})
    })
})

app.post('/upload_work',(req,res)=>{
    Works(req,res,function(err){
        if(err){
            res.send({
                state:0,
                error:1,
                errMes:err
            })
            return
        }
        if(req.file.filename.length<=0){
            send_err(res)
            return
        }
    // 写入数据库
    send(res,{src:'https://mynameisczy.cn/antique/works/'+req.file.filename,uuid:req.work_uuid})
    })
})

app.get('/get_label_by_name',(req,res)=>{

    // 最大拿10条
    if(!req.query.hasOwnProperty('name')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    const {name}=req.query
    dbs.query(`select name from ${table('work')} where name like '%${name}%' and state='show' and show_work='show' limit 0,10`,(err,result)=>{
        if(err){
            send_err(res)
            return
        }
        send(res,result)
    })
})
app.get('/get_video_by_name',(req,res)=>{

    // 最大拿10条
    if(!req.query.hasOwnProperty('name')||!req.query.hasOwnProperty('skip')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    const {name,skip}=req.query
    dbs.query(`select title,name,duration,(select name from ${table('main_table')} where openid=w.openid) as user_name,mask,work_uuid from ${table('work')} w where name like '%${name}%' and state='show' and show_work='show' limit ${skip},10`,(err,result)=>{
        if(err){
            send_err(res)
            return
        }
        send(res,result)
    })
})

app.get('/get_hottest_video',(req,res)=>{
    if(!req.query.hasOwnProperty('skip')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    const {skip}=req.query
    
    // 后通过uuid获取
    // dbs.query(`select title,mask,uuid from ${table('works')} w where show_work="show" and (select count(*) from work where work_uuid=w.uuid)>0 order by score desc limit ${skip},3`,function(err,result){
    // 自己获取作者信息
    dbs.query(`select (select avatar from main_table where openid=w.openid) as avatar,title,(select name from main_table where openid=w.openid) as name,mask,uuid,w.openid as openid from ${table('works')} w where show_work="show" and (select count(*) from work where work_uuid=w.uuid and state='show' and show_work='show')>0 order by score desc limit ${skip},3`,function(err,result){
        if(err){
            send_err(res)
            return
        }
        send(res,result)
    })
})

app.post('/get_video',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('uuid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    const {uuid}=req.body
    update(dbs,table('works'),{uuid:uuid},'score',1,'number','+')
    // dbs.query(`select name,src,video_id,mask,publish_date,show_work,title,(select avatar from main_table m2 where m2.openid=m.openid) user_avatar,(select name from main_table m2 where m2.openid=m.openid) user_name,openid from ${table('work')} m`,(err,e)=>{
    //     console.log(e,'e');
    //     console.log(err,'err');
    //     let arr=[]
    //     e.forEach(item=>{
    //         if(item.show_work=='show')
    //             arr.push(item)
    //     })
    //     send(res,arr)
    // })
    query(dbs,table('work'),['name','src','video_id','mask',"publish_date","show_work","title","openid"],{work_uuid:uuid,state:'show'}).then(e=>{
            //     console.log(e,'e');
    //     console.log(err,'err');
        let arr=[]
        e.forEach(item=>{
            if(item.show_work=='show')
                arr.push(item)
        })
        if(arr.length>0){
            let openid=arr[0].openid
            query(dbs,table('main_table'),['avatar','name'],{openid:openid}).then(e1=>{
                if(e1.length<=0){
                    send(res,{arr:[]})
                    return
                }
                send(res,{arr:arr,name:e1[0].name,avatar:e1[0].avatar,openid:openid})
            })
        }else{
            send(res,{arr:[]})
        }
        
    })
})

app.post('/send_danmu',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('video_id')||!req.body.hasOwnProperty('message')||!req.body.hasOwnProperty('video_time')||!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {video_id,message,video_time,openid}=req.body
    insertData(dbs,table('danmu'),{video_id:video_id,openid:openid,danmu:message,video_time}).then(()=>{
        send(res)
    }).catch(e=>{
        send_err(res,e)
    })
})

app.post('/get_danmu',(req,res)=>{
    if(typeof req.body === 'string')
        req.body=JSON.parse(req.body)
        if(!req.body.hasOwnProperty('video_id')){
            res.send({
                state:0,
                error:1,
                errorMes:'缺少参数'
            })
            return 
        }
        const {video_id}=req.body
    if(video_id.length<=0){
        res.send({
            state:0,
            error:1,
            errorMes:'参数值无效'
        })
        return 
    }
    dbs.query(`select (select name from main_table where openid=d.openid) user_name,(select avatar from main_table where openid=d.openid) user_avatar,danmu,video_time,send_date from danmu d where video_id='${video_id}'`,function(err,result){
        if(err){
            send_err(res,err)
        }
        send(res,result)
    })
})

app.post('/upload_mask',(req,res)=>{
    upload_mask(req,res,function(err){
        if(err){
            res.send({
                state:0,
                error:1,
                errMes:err
            })
            return
        }
        if(req.file.filename.length<=0){
            send_err(res)
            return
        }
        send(res,{mask:('https://mynameisczy.cn/antique/video_masks/'+req.file.filename)})
    })
})

app.post('/send_danmu',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('openid')||!req.body.hasOwnProperty('title')||!req.body.hasOwnProperty('mask')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
})

app.post('/get_workAll',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {openid}=req.body
    query(dbs,table('works'),['title','mask','score','show_work','description','uuid'],{openid:openid,state:'show'}).then(e=>{
        send(res,e)
    }).catch(e=>{
        send_err(res,e)
    })
})

app.get('/get_community_moments',(req,res)=>{
    if(!req.query.hasOwnProperty('skip')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    const {skip}=req.query

    // 方法一
    dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,(select count(*) from community_moment_comment where uuid=c.uuid) moment_count,place,send_date,browse,openid,content,uuid from antique.community_moments c where show_moment='show' and state='show' order by c.id desc limit ${skip},10`,async function(err,result){
        if(err)
            send_err(res,err)

    try{
        await new Promise(async(resolve,reject)=>{
            for(let i=0;i<result.length;i++){
                try{
                    await new Promise((resolve2,reject2)=>{
                        query(dbs,table('community_moment_pic'),['src','mask'],{uuid:result[i].uuid}).then(e=>{
                            result[i].src=e.map(e=>e.src)
                            result[i].mask=e.map(e=>e.mask)
                            resolve2()
                        }).catch(e=>{
                            reject2()
                        })
                    })
                }catch(e){
                    reject()
                }
                if(i==result.length-1)
                    resolve()
            }
        })
        send(res,result)
    }catch(e){
        send(res,result)
    }
    })

    // dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,place,send_date,browse,content,c.uuid,cp.src from antique.community_moments c left join community_moment_pic cp on c.uuid=cp.uuid and c.show_moment='show' order by c.id desc limit ${skip},10`,function(err,result){
    //     // 查询两次
    //     if(err)
    //         send_err(res,err)
    //     result.forEach(item=>{
    //         item.src=[item.src]
    //     })
    //     let group=[result[0]]
    //     for(let i=1;i<result.length;i++){
    //         for(let j=0;j<group.length;j++){
    //             if(result[i].uuid==group[j].uuid){
    //                 if(result[i].src[0]==null||check(group[j].src,result[i].src[0]))
    //                     break
    //                 group[j].src.push(...result[i].src)
    //                 break
    //             }
    //             if(j==group.length-1)
    //                 group.push(result[i])
    //         }
    //     }
    //     function check(arr,val){
    //         for(let i=0;i<arr.length;i++){
    //             if(arr[i]==val)
    //                 return 1
    //         }
    //         return 0
    //     }
    //     send(res,group)
    // })


    // query(dbs,table('community_moments'),'*',null,{skip:skip,count:10}).then(e=>{
        // send(res,e)
        // `select (select avatar from main_table where openid=c.openid),(select name from main_table where openid=c.openid),send_date,browse,uuid from antique.community_moments c limit ${skip},10`
    // }).catch(e=>{
        // send_err(res,e)
    // })
})
app.post('/new_work_collection',(req,res)=>{
    if(!req.body.hasOwnProperty('title')||!req.body.hasOwnProperty('description')||!req.body.hasOwnProperty('mask')||!req.body.hasOwnProperty('show_work')||!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {title,description,mask,show_work,openid}=req.body
    let uuid=randomUUID()
    insertData(dbs,table('works'),{title,description,mask,show_work,openid,uuid}).then(()=>{
        send(res,uuid)
    }).catch(e=>{
        send_err(res,e)
    })
})

app.post('/upload_moment_material',function(req,res){
    upload_moments(req,res,function(err){
        if(err){
            send_err(res,err)
            return
        }
        if(req.file.filename.length<=0){
            send_err(res)
            return
        }
        send(res,'https://mynameisczy.cn/antique/moment_picture/'+req.file.filename)
    })
})
// paths:info.paths,
// openid:uni.current_this.store.state.user_info.openid,
// show_work:info.show_work?'show':'hid',
// place:info.place,
// content:info.content
app.post('/upload_moment',async function(req,res){
    if(!req.body.hasOwnProperty('paths')||!req.body.hasOwnProperty('openid')||!req.body.hasOwnProperty('show_work')||!req.body.hasOwnProperty('place')||!req.body.hasOwnProperty('content')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.body).forEach(item=>{
        if(item=='place')
            return
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {paths,place,content,show_work,openid}=req.body
    let id=randomUUID()
    try{
        let sus=[]
        await new Promise(async(resolve1,reject1)=>{
                if(place.length<=0)
                    await new Promise((reso,reje)=>{
                    insertData(dbs,table('community_moments'),{openid,content,uuid:id,show_moment:show_work}).then(e=>{
                        reso()
                    }).catch(e=>{
                            reject1()
                        })
                })
                else
                    await new Promise((reso,reje)=>{
                        insertData(dbs,table('community_moments'),{openid,content,uuid:id,show_moment:show_work,place}).then(e=>{
                            reso()
                        }).catch(e=>{
                        reject1()
            })
                    })
            for(let i=0;i<paths.length;i++){
                try{
                    await new Promise((resolve,reject)=>{
                        insertData(dbs,table('community_moment_pic'),{uuid:id,src:paths[i],mask:req.body.hasOwnProperty('mask')?req.body.mask:'none',duration:req.body.hasOwnProperty('duration')?req.body.duration:null}).then(e=>{
                            resolve()
                        }).catch(e=>{
                            reject()
                        })
                    })
                    sus.push(paths[i])
                }catch(e){}
            }
            resolve1()
        })
        send(res,{sus,uuid:id})
    }catch(e){
        send_err(res)
    }
})
app.post('/send_community_comment',(req,res)=>{
    if(!req.body.hasOwnProperty('uuid')||!req.body.hasOwnProperty('openid')||!req.body.hasOwnProperty('content')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {uuid,openid,content}=req.body
    insertData(dbs,table('community_moment_comment'),{openid,uuid,content}).then(e=>{
        send(res)
    }).catch(e=>{
        send_err(res,e)
    })
})
app.get('/get_community_comment',(req,res)=>{
    if(!req.query.hasOwnProperty('uuid')||!req.query.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.query).forEach(item=>{
        if(item=='openid')
            return
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {uuid,openid}=req.query
    // 查询状态是否被删除/隐藏
    query(dbs,table('community_moments'),['show_moment','openid'],{uuid:uuid,state:'show'}).then(e=>{
        if(!e.length){
            res.send({
                // 被删除
                state:2,
                mes:'该作品已被删除'
            })
            return
        }
        if(e[0].show_moment=='hid'&&e[0].openid==openid){
            dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,content,date from community_moment_comment c where uuid='${uuid}' order by date desc`,function(err,result){
                if(err){
                    send_err(res,err)
                    return
                }
                res.send({
                    state:2,
                    mes:'该作品被隐藏',
                    data:result
                })
            })            
            return
        }
        if(e[0].show_moment=='hid'){
            // 被隐藏
            res.send({
                state:2,
                mes:'该作品被隐藏'
            })
            return
        }
    update(dbs,table('community_moments'),{uuid:uuid},'browse',1,'number','+')
    dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,content,date from community_moment_comment c where uuid='${uuid}' order by date desc`,function(err,result){
        if(err){
            send_err(res,err)
            return
        }
        send(res,result)
    })
})
})

app.post('/upload_work_info',(req,res)=>{
    if(!req.body.hasOwnProperty('openid')||!req.body.hasOwnProperty('show_work')||!req.body.hasOwnProperty('title')||!req.body.hasOwnProperty('name')||!req.body.hasOwnProperty('src')||!req.body.hasOwnProperty('mask')||!req.body.hasOwnProperty('work_uuid')||!req.body.hasOwnProperty('video_id')||!req.body.hasOwnProperty('duration')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.query).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })

    const {openid,show_work,title,name,src,mask,work_uuid,video_id,duration}=req.body
    insertData(dbs,table('work'),{openid,show_work,title,name,src,mask,work_uuid,video_id,duration}).then(s=>{
        send(res)
    }).catch(e=>{
        send_err(res)
    })
    
})

app.post('/show_hid_works',(req,res)=>{
    if(!req.body.hasOwnProperty('uuid')||!req.body.hasOwnProperty('state')||!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.query).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })

    const {uuid,state,openid}=req.body
    update(dbs,table('community_moments'),{uuid:uuid,openid:openid},'show_moment',state,'string').then(_=>{
        send(res)
    }).catch(_=>{
        send_err(res)
    })
})

app.post('/delete_works',(req,res)=>{
    if(!req.body.hasOwnProperty('uuid')||!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.query).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })

    const {uuid,openid}=req.body
    update(dbs,table('community_moments'),{uuid:uuid,openid:openid},'state','deleted','string').then(_=>{
        send(res)
    }).catch(_=>{
        send_err(res)
    })
})

app.post('/get_new_community_moments',(req,res)=>{
    if(!req.body.hasOwnProperty('uuid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })

    const {uuid}=req.body
    // select * from community_moments c where id >(select id from community_moments where uuid=c.uuid)
    // 方法一
    dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,(select count(*) from community_moment_comment where uuid=c.uuid) moment_count,place,send_date,browse,openid,content,uuid from antique.community_moments c where id >(select id from community_moments where uuid="${uuid}") and show_moment='show' and state='show' order by c.id desc limit 0,3`,async function(err,result){
        if(err)
            send_err(res,err)
            if(result.length<=0){
                send(res,[])
                return
            }
    try{
        await new Promise(async(resolve,reject)=>{
            for(let i=0;i<result.length;i++){
                try{
                    await new Promise((resolve2,reject2)=>{
                        query(dbs,table('community_moment_pic'),'src',{uuid:result[i].uuid}).then(e=>{
                            result[i].src=e.map(e=>e.src)
                            resolve2()
                        }).catch(e=>{
                            reject2()
                        })
                    })
                }catch(e){
                    reject()
                }
                if(i==result.length-1)
                    resolve()
            }
        })
        send(res,result)
    }catch(e){
        send(res,result)
    }
    })
})

app.post('/get_person_community_moments',(req,res)=>{
    if(!req.body.hasOwnProperty('skip')||!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    const {skip,openid}=req.body

    // 方法一
    dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,(select count(*) from community_moment_comment where uuid=c.uuid) moment_count,place,send_date,browse,openid,content,uuid from ${table('community_moments')} c where openid='${openid}' and state='show' order by c.id desc limit ${skip},7`,async function(err,result){
        if(err)
            send_err(res,err)

    try{
        await new Promise(async(resolve,reject)=>{
            for(let i=0;i<result.length;i++){
                try{
                    await new Promise((resolve2,reject2)=>{
                        query(dbs,table('community_moment_pic'),['src','mask','duration'],{uuid:result[i].uuid}).then(e=>{
                            result[i].src=e.map(e=>e.src)
                            result[i].mask=e.map(e=>e.mask)
                            result[i].duration=e.map(e=>e.duration)
                            resolve2()
                        }).catch(e=>{
                            reject2()
                        })
                    })
                }catch(e){
                    reject()
                }
                if(i==result.length-1)
                    resolve()
            }
        })
        send(res,result)
    }catch(e){
        send(res,result)
    }
    })
})
app.post('/get_person_community_moments2',(req,res)=>{
    if(!req.body.hasOwnProperty('skip')||!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    const {skip,openid}=req.body

    // 方法一
    dbs.query(`select (select avatar from main_table where openid=c.openid) as avatar,(select name from main_table where openid=c.openid) as name,(select count(*) from community_moment_comment where uuid=c.uuid) moment_count,place,send_date,browse,openid,content,uuid from antique.community_moments c where openid='${openid}' and state='show' and show_moment='show' order by c.id desc limit ${skip},7`,async function(err,result){
        if(err)
            send_err(res,err)

    try{
        await new Promise(async(resolve,reject)=>{
            for(let i=0;i<result.length;i++){
                try{
                    await new Promise((resolve2,reject2)=>{
                        query(dbs,table('community_moment_pic'),['src','mask','duration'],{uuid:result[i].uuid}).then(e=>{
                            result[i].src=e.map(e=>e.src)
                            result[i].mask=e.map(e=>e.mask)
                            result[i].duration=e.map(e=>e.duration)
                            resolve2()
                        }).catch(e=>{
                            reject2()
                        })
                    })
                }catch(e){
                    reject()
                }
                if(i==result.length-1)
                    resolve()
            }
        })
        send(res,result)
    }catch(e){
        send(res,result)
    }
    })
})

app.post('/get_author_info',(req,res)=>{
    if(!req.body.hasOwnProperty('openid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }    
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {openid}=req.body
    query(dbs,table('main_table'),['background','introduce','sex'],{openid:openid}).then(e=>{
        send(res,e[0])
    }).catch(e=>{
        send_err(res)
    })
})

app.post('/deleted_video',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('uuid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {uuid}=req.body
    update(dbs,table('work'),{video_id:uuid},'state','deleted','string').then(e=>{
        send(res)
    }).catch(e=>{
        send_err(res,e)
    })
})

app.post('/set_video',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('uuid')||!req.body.hasOwnProperty('state')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {uuid,state}=req.body
    update(dbs,table('work'),{video_id:uuid},'show_work',state?'show':'hid','string').then(e=>{
        send(res,state?'show':'hid')
    }).catch(e=>{
        send_err(res,e)
    })
})


app.post('/deleted_video_collection',(req,res)=>{
    if(typeof req.body === 'string')
    req.body=JSON.parse(req.body)
    if(!req.body.hasOwnProperty('uuid')){
        res.send({
            state:0,
            error:1,
            errorMes:'缺少参数'
        })
        return 
    }
    Object.keys(req.body).forEach(item=>{
        if(typeof req.body[item] == 'string'&&req.body[item].length<1){
            res.send({
                state:0,
                error:1,
                errorMes:'值小于1'
            })
        }
    })
    const {uuid}=req.body
    // 隐藏
    update(dbs,table('works'),{uuid:uuid},'state','deleted','string').then(e=>{
        send(res)
    }).catch(e=>{
        send_err(res,e)
    })
})

// 实现周热榜




}

function send(res,data=null,state=1){
    res.send({
        state:state,
        error:0,
        data:data
    })
}
function send_err(res,e){
    res.send({
        state:0,
        error:1,
        errMes:e
    })
}