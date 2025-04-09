import storage from '@/storage/storage'
import { baseUrl } from '@/util/baseConfig'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
const instance = axios.create({
    // baseURL:"/api",
    // baseURL:"/",
    baseURL: baseUrl + "/admin",
    timeout:5000
})
const openFullScreen2 = () => {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    return loading
  }
let loading
// 取消请求
instance.interceptors.request.use(async request => {
    const data = JSON.parse(storage.ls.get("user"))
    // if(data == null){
    //     ElMessage.error("请重新登录")
    //     return
    // }
    
    request.params = {
        ...request.params,
        user_id:data== null ?"":data.id,
        // store_id:data== null ?"":data.id
    }
    request.data = {
        ...request.data,
        user_id:(data== null ?"":data.id)
        // user_id:request.data.user_id == null ?(data== null ?"":data.id) : request.data.user_id,

        // store_id:data == null ?"":data.id
    }
    console.log(request,"request");
    if(!(/^(\/admin\/report)/g).test(request.url)){
        loading = openFullScreen2()
    }else{
        function await_(){
            return new Promise((res) => {
                setTimeout(() => {
                    res()
                }, 800);
            })
        }
        await await_()
    }
    return request
})

const requestState = {
    1:() => {
        // ElMessage.success("查询成功")
    },
    0:() => {
        ElMessage.error("请求失败")
    }
}

instance.interceptors.response.use(response => {
    if(loading){
        loading.close()
    }
    console.log(response,'response');
    const { data } = response
    if(response.headers['content-type'] == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '货运记录.xlsx'; // 设置下载文件名，可根据实际修改
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { code:1 }
    }
    // 如果存在就执行
    // requestState[data.code]?.()
    // console.log(response,'response');
    console.log(data,'data');
    if(data.code != 1){
        ElMessage.error(data.msg)
        return Promise.reject(data.msg)
    }
    return {data:data.data,code:data.code}
},(err) => {
    if(loading){
        loading.close()
    }
    console.log(err,'err');
    if(err.message == "Network Error"){
        return Promise.reject(err.message)
        }
    if(err.code == '"ECONNABORTED"'){
        return Promise.reject("请求超时")
    }
    return Promise.reject(err.message)
})

export default instance