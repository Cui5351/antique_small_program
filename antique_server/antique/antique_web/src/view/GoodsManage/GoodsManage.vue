<template>
  <div class="page">
    <div style="background-color: white;padding: 20px;box-sizing: border-box;text-align: start;">
      <el-form>
        <el-row>
          <!-- <el-input style="width: 200px;" placeholder="请输入门店名称" v-model="search.store"></el-input> -->
          <el-form-item label="门店名称" prop="store" v-if="userData.role == '超级管理员'">
             <el-select style="width: 200px;" placeholder="请选择门店名称" v-model="search.store_id" filterable>
              <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input style="width: 200px;" placeholder="请输入商品名称" v-model="search.name"></el-input>
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item>
            <!-- 重置 -->
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="searchStoreInfo">搜索</el-button>
          </el-form-item>
        </el-row>

      </el-form>
      <div>
        <el-button type="primary" @click="addStoreItem">新增商品</el-button>
      </div>
      <el-table :data="storeList" style="width: 100%;margin-top: 20px;" border>
        <!-- store,name,description,money,transport_money,sale,depository -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column type="index" label="id" width="80" align="center"></el-table-column> -->
        <el-table-column prop="id" label="id" width="80" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="store" label="门店名称" width="150" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip width="150" align="center">
        </el-table-column>
        <el-table-column prop="url" label="商品图片" width="170" show-overflow-tooltip align="center">
          <template #default="scope">
            <img :src="scope.row.url" alt="" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column prop="description" label="商品描述" show-overflow-tooltip width="240" align="center">
        </el-table-column>
        <el-table-column prop="money" label="商品价格" width="120" align="center">
          <template #default="scope">
            {{scope.row.money.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="transport_money" label="运费" width="120" align="center">
          <template #default="scope">
            {{scope.row.transport_money.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="sale" label="销量" width="100" align="center">
        </el-table-column>
        <el-table-column prop="depository" label="库存" width="100" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除该商品吗?" width="200" @confirm="del(scope.row)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
          </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;">
        <el-pagination background layout="total, prev, pager, next" :page-size="10" :total="total"
        style="justify-content: flex-end;margin-right: 50px;"
        :current-page="page"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <StoreItemModal @LoadData="loadData" ref="storeItemModal"></StoreItemModal>
  </div>
</template>

<script setup>
import { DeleteStoreItem, GetStoreNames, loadStoreInfo } from '@/util/api';
import { reactive, ref } from 'vue';
import StoreItemModal from './modules/StoreItemModal.vue'
import { ElMessage } from 'element-plus';
import storage from '@/storage/storage';

const total = ref(0);
const search = reactive({
  store_id: "",
  name: ""
})
const data = JSON.parse(storage.ls.get("user"))
const userData = ref({
  role:data.role
})


const stores = reactive([])

// reset
const reset = () => {
  search.store_id = ""
  search.name = ""
  loadData()
}
const loadData2 = () => {
  loadData()
  getStoreNames()
}

// searchStoreInfo
const searchStoreInfo = () => {
  page.value = 1
  loadData()
}

const getStoreNames = () => {
  if(userData.value.role != "超级管理员"){
    return
  }
  console.log('load',userData.value.role);
  GetStoreNames().then((res) => {
    stores.splice(0, stores.length, ...res.data)
  }).catch((err) => {
    console.log(err)
  })
}
getStoreNames()

const storeItemModal = ref(null);
const storeModal = ref(null);
const page = ref(1);
const storeList = reactive([])
const addStoreItem = () => {
  storeItemModal.value.show(null,'新增商品')
}
const AddStore = () => {
  storeModal.value.show({},'新增店铺')
}
const loadData = () => {
  loadStoreInfo({
    page: page.value,
    pageSize: 10,
    ...search
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
const edit = (row) => {
  storeItemModal.value.show(row,'编辑商品')
  console.log(row)
}
const del = (row) => {
  console.log(row,'del')
  DeleteStoreItem({
    id:row.id
  }).then((res) => {
    ElMessage.success("删除成功")
    loadData()
  }).catch((err) => {
    console.log(err)
  })
}
const handleCurrentChange = (val) => {
  page.value = val
  loadData()
}
</script>

<style scoped lang="less">
@import "../../general/page.css";

.page {
  background: rgba(0, 0, 0, .1);
  padding: 10px;
  overflow-y: auto;
  box-sizing: border-box;
  max-height: 100%;
  height: 100%;
  padding-bottom: 100px;

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