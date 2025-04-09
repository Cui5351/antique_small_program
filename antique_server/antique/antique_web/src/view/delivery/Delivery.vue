<template>
    <div class="page">
      <div style="background-color: white;padding: 20px;box-sizing: border-box;text-align: start;">
        <el-form>
          <el-row>
            <el-form-item label="门店名称" prop="store" v-if="userData.role == '超级管理员'">
               <!-- <el-input style="width: 200px;" placeholder="请输入门店名称" v-model="search.store"></el-input> -->
               <el-select style="width: 200px;" placeholder="请选择门店名称" v-model="search.store_id">
                <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称" >
              <el-input style="width: 200px;" placeholder="请输入商品名称" v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item label="订单单号" >
              <el-input style="width: 200px;" placeholder="请输入订单单号" v-model="search.uuid"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" >
               <!-- 商品状态（待发货，待收货，已完成，已取消） -->
               <el-select style="width: 200px;" placeholder="请选择商品状态" v-model="search.state2">
                <el-option v-for="item in state" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下单时间" >
              <el-date-picker style="width: 230px;" type="daterange" placeholder="选择日期" v-model="search.date" value-format="YYYY-MM-DD"
              start-placeholder="开始日期" end-placeholder="结束日期"
              range-separator="至"
              @change="searchStoreInfo"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 搜索 -->
            <el-form-item>
              <!-- 重置 -->
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="searchStoreInfo">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-button type="primary" v-if="selected.length" @click="exposeSelected">导出</el-button>
            <el-button type="primary" @click="exposeAll">导出全部</el-button>
          </el-row>
  
        </el-form>
        <el-table :data="storeList" style="width: 100%;margin-top: 20px;" border @selection-change="selectChange">
          <!-- store,name,description,money,transport_money,sale,depository -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="id" width="80" align="center"></el-table-column>
          <el-table-column prop="uuid" label="订单单号" width="230" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="store" label="门店名称" width="150" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" show-overflow-tooltip width="150" align="center">
          </el-table-column>
          <!-- 商品图片 -->
          <el-table-column prop="src" label="商品图片" width="170" align="center">
            <template #default="scope">
              <img :src="scope.row.src" alt="" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="user" label="下单用户" show-overflow-tooltip width="150" align="center">
          </el-table-column>
          <el-table-column prop="state2" label="商品状态" width="100" align="center">
            <template #default="scope">
                <el-tag :type="state2Color(scope.row.state2)" >
                    {{scope.row.state2}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="下单数量" show-overflow-tooltip width="100" align="center">
            <template #default="scope">
              {{scope.row.count}}件
            </template>
        </el-table-column>
          <el-table-column prop="money" label="商品价格" width="120" align="center">
            <template #default="scope">
              {{(scope.row.money)?.toFixed(2)}}元
            </template>
          </el-table-column>
          <el-table-column prop="transport_money" label="运输费" width="100" align="center">
            <template #default="scope">
              {{scope.row.transport_money?.toFixed(2)}}元
            </template>
          </el-table-column>
          <el-table-column label="合计" width="120" align="center">
            <template #default="scope">
              {{(scope.row.money * scope.row.count + scope.row.transport_money)?.toFixed(2)}}元
            </template>
          </el-table-column>
          <el-table-column prop="date" label="下单时间" show-overflow-tooltip width="160" align="center">
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right" align="center">
            <template #default="scope">
            <el-button type="default" @click="edit(scope.row,true)">详情</el-button>
            <!-- 修改状态 -->
            <el-button type="primary" @click="edit(scope.row,false)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px;">
          <el-pagination background layout="prev, pager, next, total" :page-size="10" :total="total"
          style="justify-content: flex-end;margin-right: 50px;"
          :current-page="page"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <!-- 修改商品状态的dialog -->
       <el-dialog v-model="visible" :title="!read ? '修改商品状态' :'详情'" @close="editClose">
        <el-form>
          <el-form-item label="门店名称：">
                <p>{{ state2.store }}</p>
            </el-form-item>
            <el-form-item label="商品名称：">
               <p>{{ state2.name }}</p>
            </el-form-item>
            <el-form-item label="下单用户：">
               <p>{{ state2.user }}</p>
            </el-form-item>
            <el-form-item label="收货人：">
               <p>{{ state2.realName }}</p>
            </el-form-item>
            <el-form-item label="收货号码：">
               <p>{{ state2.tel }}</p>
            </el-form-item>
            <el-form-item label="目的地址：">
               <p>{{ state2.address }}</p>
            </el-form-item>
            
            <el-form-item label="商品状态：">
               <!-- 商品状态（待发货，待收货，已完成，已取消） -->
               <el-select style="width: 200px;" placeholder="请选择商品状态" v-model="state2.state2" :disabled="read">
                <el-option v-for="item in state" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
            <template #footer>
                <!-- 修改 -->
                <el-button type="default" @click="editClose">取消</el-button>
                <!-- 修改状态 -->
              <el-button type="primary" @click="handleOk" v-show="!read">修改</el-button>
                 <!-- 取消 -->
            </template>
       </el-dialog>
    </div>
  </template>
  
  <script setup>
  import {GetStoreNames, buyGoodsAll, buyGoodsAllToExcel, buyGoodsToExcelById, editBuyGoodsState2 } from '@/util/api';
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
import storage from '@/storage/storage';
  
  const total = ref(0);
  const search = reactive({
    store_id: "",
    uuid:"",
    name: "",
    state2:"",
    date:null
  })
  const data = JSON.parse(storage.ls.get("user"))
  const userData = ref({
    role:data.role
  })
  const state2 = reactive({
    state2:'',
    uuid:'',
    name:'',
    store:'',
    user:'',
    realName:'',
    tel:'',
    address:''
  })
  const visible = ref(false)
  
  const state = reactive([
    '待发货',
    '待收货', // 用户在待收货的界面时可以点击已到达，发起已完成请求
    '已完成', 
    '已取消'
  ])

  // exposeAll
  const exposeAll = () => {
    console.log('all');
    buyGoodsAllToExcel().then((res) => {
    }).catch((err) => {
      console.log(err) 
    })
  }
  // exposeSelected
  const exposeSelected = () => {
    let ids = ''
    selected.forEach(item => {
      ids += item.id + ','
    })
    ids = ids.substring(0,ids.length -1)
    console.log(ids);
    // buyGoodsToExcelById
    buyGoodsToExcelById({
      ids:ids
    }).then((res) => {
    }).catch((err) => {
      console.log(err) 
    })
  }

  const selected = reactive([])

  const selectChange = (val) => {
    selected.splice(0, selected.length, ...val)
    console.log(selected,'selected');
  }
  
  const stores = reactive([])
  
  // reset
  const reset = () => {
    search.store_id = ""
    search.name = ""
    search.state2 = ""
    search.uuid = ""
    search.date = null
    loadData()
  }
  // searchStoreInfo
  const searchStoreInfo = () => {
    page.value = 1
    loadData()
  }
const state2Color = (state) => {
    // 待发货，待收货，已完成，已取消
  switch (state) {
    case '待发货':
      return 'primary';
    case '待收货':
        return 'warning';
    case '已完成':
        return 'success';
    case '已取消':
        return 'info';
      
  }
}

const handleOk = () => {
    if(state2.state2.length <= 0){
        ElMessage.warning("请选择状态")
        return
    }
    // 根据uuid来修改
    editBuyGoodsState2({
        uuid:state2.uuid,
        state2:state2.state2 
    }).then(() => {
        ElMessage.success("修改成功")
        loadData()
        editClose()
    }).catch((err) => {
        console.log(err)
    })
}
  const getStoreNames = () => {
    if(userData.value.role != "超级管理员"){
    return
  }
    GetStoreNames().then((res) => {
      stores.splice(0, stores.length, ...res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  getStoreNames()
  
  const page = ref(1);
  const storeList = reactive([])
  const loadData = () => {
    buyGoodsAll({
      page: page.value,
      pageSize: 10,
      store_id:search.store_id,
      name:search.name,
      state2:search.state2,
      uuid:search.uuid,
      start:search.date != null ? search.date[0] : '',
      end:search.date != null ? search.date[1] : '',
    }).then((res) => {
      console.log(res)
      storeList.splice(0, storeList.length)
      storeList.push(...res.data.list)
      total.value = res.data.total
      page.value = res.data.pageNum
    }).catch((err) => {
      console.log(err)
    })
  }
  loadData()
  let read = ref(false)
  const edit = (row,state) => {
      read.value = state
    // storeItemModal.value.show(row,'编辑商品')
    buyGoodsAll({
      uuid:row.uuid,
      page:1,
      pageSize:1,
    }).then((res) => {
      console.log(res)
      state2.state2 = res.data.list[0].state2
      state2.uuid = res.data.list[0].uuid 
      state2.name = res.data.list[0].name
      state2.store = res.data.list[0].store
      state2.user = res.data.list[0].user
      state2.realName = res.data.list[0].realName
      state2.tel = res.data.list[0].tel
      state2.address = res.data.list[0].address
      visible.value = true
    })
    return
    visible.value = true
    state2.state2 = row.state2
    state2.uuid = row.uuid
    state2.name = row.name
    state2.store = row.store
    state2.user = row.user
    state2.realName = row.realName
    state2.tel = row.tel
    state2.address = row.address
    console.log(row)
  }
  const handleCurrentChange = (val) => {
    console.log(val,'val');
    page.value = val
    loadData()
  }

  const editClose = () => {
    visible.value = false
    state2.state2 = ''
    state2.uuid = '' 
    state2.name = ''
    state2.store = ''
    state2.user = ''
    state2.realName = ''
    state2.tel = ''
    state2.address = ''
  }
  </script>
  
  <style scoped lang="less">
  @import "../../general/page.css";
  
  .page {
    background: rgba(0, 0, 0, .1);
    padding: 10px;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 100px;
    max-height: 100%;
    height: 100%;
  }
  .el-input {
    width: 200px;
  }
  
  ::-webkit-scrollbar {
    display: none;
  }
  .el-form-item{
    margin-right: 20px;
  }
  </style>