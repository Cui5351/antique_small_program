import {createStore} from 'vuex';
uni.getStorage({
	key:'cars',
	success(res) {
		let data=JSON.parse(res.data)
		state.cars.push(...data)
	}
})
const state={
	cars:[]
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
	deleteBill({commit},value){
		let val=JSON.parse(value)
		let len=state.cars.length;
		for(let i=0;i<len;i++){
			if(state.cars[i].name==val.name)
				state.cars.splice(i,1)
		}
		commit("DELETEBILL")
	}
}
const getters={
}
export default createStore({
	actions,
	mutations,
	getters,
	state
})