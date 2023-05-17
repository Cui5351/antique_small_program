const multer=require('multer')
const {randomUUID}=require('crypto')
exports.storage_mask=multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
        cb(null, '/backup/server_data/books/antique/video_masks')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
},
//设置保存的name
filename: function (req, file, cb) {    
    // 1拿到图片的类型
    let type=file.mimetype.match(/(jpg|jpeg|png)/g)
    cb(null, `${randomUUID()}.${type}`)
}
})

// 文件上传
exports.storage_avatar=multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
        cb(null, '/backup/server_data/books/antique/user_avatar')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
},
//设置保存的name
filename: function (req, file, cb) {    
    // 1拿到图片的类型
    let type=file.mimetype.match(/(jpg|jpeg|png)/g)
    cb(null, `${randomUUID()}.${type}`)
}
})
exports.store_picture=multer.diskStorage({
    destination(req,file,cb){
        cb(null, '/backup/server_data/books/antique/store_picture')
    },
    filename(req, file, cb){
        // 1拿到图片的类型
        let type=file.mimetype.match(/(jpg|jpeg|png)/g)
        cb(null, `${randomUUID()}.${type}`)
    }
})
exports.storage_background=multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
        cb(null, '/backup/server_data/books/antique/user_background')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
},
//设置保存的name
filename: function (req, file, cb) {    
    // 1拿到图片的类型
    let type=file.mimetype.match(/(jpg|jpeg|png)/g)
    cb(null, `${randomUUID()}.${type}`)
}
})

exports.antique=multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
        if((/(jpg|jpeg|png)/g).test(file.mimetype)){
            cb(null, '/backup/server_data/books/antique/antiques')
        }else if((/(mp4)/g).test(file.mimetype)){
            cb(null, '/backup/server_data/books/antique/videos')
        }else{
            cb(null,null)
        }
    },
    //设置保存的name
    filename: function (req, file, cb) {    
        // 1拿到图片的类型
        if((/(jpg|jpeg|png)/g).test(file.mimetype)){
            let type=file.mimetype.match(/(jpg|jpeg|png)/g)
            cb(null, `${randomUUID()}.${type}`)
        }else if((/(mp4)/g).test(file.mimetype)){
            cb(null, `${randomUUID()}.mp4`)
        }else{
            cb(null,null)
        }
    }
})
exports.moments=multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
            cb(null, '/backup/server_data/books/antique/moment_picture')
    },
    //设置保存的name
    filename: function (req, file, cb) {    
        // 1拿到图片的类型
        if((/(jpg|jpeg|png)/g).test(file.mimetype)){
            let type=file.mimetype.match(/(jpg|jpeg|png)/g)
            cb(null, `${randomUUID()}.${type}`)
        }else if((/(mp4)/g).test(file.mimetype)){
            cb(null, `${randomUUID()}.mp4`)
        }else{
            cb(null,null)
        }
    }
})

exports.WORK=multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
        if((/(mp4)/g).test(file.mimetype)){
            cb(null, '/backup/server_data/books/antique/works')
        }else{
            cb(null,null)
        }
    },
    //设置保存的name
    filename: function (req, file, cb) {    
        // 1拿到图片的类型
        if((/(mp4)/g).test(file.mimetype)){
            const uuid=randomUUID()
            req.work_uuid=uuid
            cb(null, `${uuid}.mp4`)
        }else{
            cb(null,null)
        }
    }
})