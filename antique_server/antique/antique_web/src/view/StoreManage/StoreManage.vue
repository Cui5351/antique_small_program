<template>
  <div class="page">
    <div style="background-color: white;padding: 20px;box-sizing: border-box;text-align: start;">
      <el-form>
        <el-row>
          <el-form-item label="门店名称" prop="store">
             <!-- <el-input style="width: 200px;" placeholder="请输入门店名称" v-model="search.store"></el-input> -->
             <el-select style="width: 200px;" placeholder="请选择门店名称" v-model="search.id" filterable>
              <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
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
        <el-button type="primary" @click="AddStore">新建店铺</el-button>
      </div>
      <el-table :data="storeList" style="width: 100%;margin-top: 20px;" border>
        <!-- store,name,description,money,transport_money,sale,depository -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column type="index" label="id" width="80" align="center"></el-table-column> -->
        <el-table-column prop="id" label="id" width="80" show-overflow-tooltip align="center">
        </el-table-column>
        <!-- 门店头像 -->
        <el-table-column prop="src" label="门店头像" width="150" show-overflow-tooltip align="center">
          <template #default="scope">
            <img :src="scope.row.src" alt="" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="门店名称" width="150" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="description" label="门店描述" show-overflow-tooltip width="300" align="center">
        </el-table-column>
        <el-table-column prop="role" label="权限" width="130" align="center">
        </el-table-column>
        <el-table-column prop="account" label="账户" width="130" align="center">
        </el-table-column>
        <el-table-column prop="password" label="密码(加密)" width="200" align="center" show-overflow-tooltip>
        </el-table-column>
        <!-- create_date -->
        <el-table-column prop="create_date" label="创建时间" width="160" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除该店铺吗?" width="200" @confirm="del(scope.row)">
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
    <addStore  @LoadData="loadData2" ref="storeModal"></addStore>
  </div>
</template>

<script setup>
import addStore from './modules/addStore.vue';
import { DelStore, GetStoreNames, getAllStoreAccount } from '@/util/api';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import storage from '@/storage/storage';

const total = ref(0);
const search = reactive({
  id: "",
  name: ""
})

console.log(storage.ls.get('userId'),'pro__');


const stores = reactive([])

// reset
const reset = () => {
  search.id = ""
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
  GetStoreNames().then((res) => {
    stores.splice(0, stores.length, ...res.data)
  }).catch((err) => {
    console.log(err)
  })
}
getStoreNames()
const storeModal = ref(null);
const page = ref(1);
const storeList = reactive([])
const AddStore = () => {
  storeModal.value.show({},'新增店铺')
}
const loadData = () => {
  getAllStoreAccount({
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
  // getAllStoreAccount
  // storeItemModal.value.show(row,'编辑商品')
  console.log(row)
  storeModal.value.show(row,'编辑店铺')
}
const del = (row) => {
  console.log(row,'del')
  DelStore({
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
  padding-bottom: 100px;
  box-sizing: border-box;
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