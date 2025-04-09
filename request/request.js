import {baseURL} from './baseUrl.js'
const instance = {
	get(url,params){
		return req("GET",url,params)
	},
	post(url,params){
		return req("POST",url,params)
	},
	put(url,params){
		return req("PUT",url,params)
	},
	delete(url,params){
		return req("DELETE",url,params)
	}
}

const req = (method,url,params) => {
	return new Promise((res,rej) => {
		uni.request({
			url:baseURL + url,
			method:method,
			data:{
				...params
			},
			success(response) {
				console.log(response.data);
				if(response.data.code != 1){
					uni.showToast({
						title:response.data.msg,
						icon:'none'
					})
					rej(response.data.msg)
					return
				}
				res(response.data.data)
			},
			fail(err) {
				console.log(err,'request err');
				rej(err)
			}
		})
	})
}

export default instance