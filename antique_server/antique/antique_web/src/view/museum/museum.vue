<template>
<div class="page">
    <div style="background-color: white;padding: 20px;box-sizing: border-box;text-align: start;">
        <el-form :model="queryParams" class="query-form" inline>
      <el-form-item label="博物馆名称">
        <el-input v-model="queryParams.name" placeholder="请输入博物馆名称"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <!-- <el-input v-model="queryParams.location" placeholder="请输入地区"></el-input> -->
        <el-select v-model="queryParams.location" placeholder="请选择地区" filterable>
          <el-option v-for="location in locations" :key="location" :label="location" :value="location"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户">
        <el-input v-model="queryParams.account" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
        <el-button type="primary" @click="addAntique">新增</el-button>
    </el-row>
    <el-table :data="antiques" stripe border style="width: 100%;margin-top: 20px;">
        <el-table-column prop="id" label="ID" align="center" ></el-table-column>
        <el-table-column prop="location" label="地区" width="120" show-overflow-tooltip  align="center" ></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip align="center" width="150" ></el-table-column>
      <!-- <el-table-column prop="avatar" label="图片" show-overflow-tooltip align="center" width="150" ></el-table-column> -->
      <!-- 图片 -->
      <el-table-column prop="avatar" label="图片" align="center" width="150" >
        <template #default="{ row }">
          <img :src="row.avatar" alt="图片" width="150" height="100">
        </template>
      </el-table-column>
      <el-table-column prop="description" show-overflow-tooltip width="300" label="描述" align="center" ></el-table-column>
      <el-table-column prop="role" label="权限" width="130" align="center"></el-table-column>
      <el-table-column prop="account" show-overflow-tooltip label="账户" width="150"  align="center" ></el-table-column>
      <el-table-column prop="password" show-overflow-tooltip label="密码(加密)" width="150"  align="center" ></el-table-column>
      <el-table-column prop="book_url" show-overflow-tooltip label="预约网址" width="250"  align="center" >
        <template #default="{ row }">
          <el-link :type="row.book_url == null ? 'default' :'primary'" :disabled="row.book_url == null" :href="row.book_url" target="_blank">{{ row.book_url == null ? "暂未填写" :row.book_url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" align="center"  width="170"  label="创建时间"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="250" >
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm title="确定要删除该博物馆吗?" width="200" @confirm="handleDelete(row)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      style="justify-content: flex-end;margin-right: 50px;"
      :page-size="pageSize"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <museumModal ref="museumModalRef" @fetchData="fetchData"></museumModal>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import museumModal from './modules/museumModal.vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElMessage } from 'element-plus';
import { DelAntique, GetAntiqueAll } from '@/util/api';
const locations = ref(['北京市', '天津市', '上海市', '重庆市', '湖北省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖南省', '广东省', '湖南省', '海南省', '四川省', '贵州省', '陕西省', '甘肃省', '青海省', '台湾省', '广西壮族自治区', '内蒙古自治区', '西藏自治区', '宁夏族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'])

const museumModalRef = ref(null);
const queryParams = ref({
  name: '',
  location: '',
  account: ''
});
const antiques = ref([]);

const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);

const addAntique = () => {
  museumModalRef.value.show();
};

const fetchData = async () => {
    GetAntiqueAll({
        ...queryParams.value,
        page: currentPage.value,
        pageSize: pageSize.value
    }).then((res) => {
        console.log(res)
        antiques.value = res.data.list
        total.value = res.data.total
        // antiques.value = res.data 
    }).catch((err) => {
        console.log(err)
     })
};

const resetQuery = () => {
  queryParams.value = {
    name: '',
    location: '',
    account: ''
  };
  fetchData();
};
const handleViewDetail = (row) => {
  // 处理查看详情逻辑
  console.log('查看详情:', row);
};

const handleDelete = (row) => {
  // 处理删除逻辑
  DelAntique({
    id: row.id
  }).then((res) => {
    console.log(res)
    ElMessage.success("删除成功")
    fetchData() 
  }).catch((err) => {
    console.log(err)
  })
};

const handleEdit = (row) => {
  // 处理编辑逻辑
  console.log('编辑:', row);
  museumModalRef.value.show(row);
};
// 页面加载时初始化数据
fetchData();
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
.el-input ,.el-select{
    width: 200px;
}
</style>