import {createStore} from 'vuex';
uni.getStorage({
	key:'cars',
	success(res) {
		let data=JSON.parse(res.data)
		state.cars.push(...data)
	}
})
const state={
	cars:[],
	login_state:0,
	moments:[],
	user_info:{
		openid:'',
		name:'',
		avatar:'https://www.mynameisczy.asia/antique/user_avatar/default_avatar.jpg',
		introduce:'',
		sex:'',
		background:'https://www.mynameisczy.asia/antique/user_background/default_background.jpg',
		works:[],
		moments:[]
	}
}
const mutations={
	BUY(state){
		uni.setStorage({
			key:'cars',
			data:JSON.stringify(state.cars)
		})
	},
	DELETEBILL(state){
		uni.setStorage({
			key:'cars',
			data:JSON.stringify(state.cars)
		})
	}
}
const actions={
	buy({commit,state},value){
		let val=JSON.parse(value)
		// 遍历查看是否存在，若存在那么就count+1
		let len=state.cars.length;
		if(len==0){
			state.cars.push(val)
		}
		for(let i=0;i<len;i++){
			if(state.cars[i].name==val.name){
				state.cars[i].count++;
				break
			}else if(i==len)
				state.cars.push(val)
		}
		commit("BUY")
	},
	addmoment({state},value){
		state.user_info.moments.unshift({...JSON.parse(value)})
		state.moments.unshift({...JSON.parse(value)})
		console.log(state);
	},
	deleteBill({commit},value){
		let val=JSON.parse(value)
		let len=state.cars.length;
		for(let i=0;i<len;i++){
			if(state.cars[i].name==val.name)
				state.cars.splice(i,1)
		}
		commit("DELETEBILL")
	},
	set_login({commit,state},value){
		state.login_state=value
	}
}
const getters={
	login_state(state){
		return state.login_state
	},
	openid(state){
		return state.user_info.openid
	},
	name(state){
		return state.user_info.name
	},
	avatar(state){
		return state.user_info.avatar
	},
	sex(state){
		return state.user_info.sex
	},
	introduce(state){
		return state.user_info.introduce
	},
	background(state){
		return state.user_info.background
	},
	moments(state){
		return state.moments
	},
	my_moments(state){
		return state.user_info.moments
	},
	works(state){
		return state.user_info.works
	}
}
export default createStore({
	actions,
	mutations,
	getters,
	state
})