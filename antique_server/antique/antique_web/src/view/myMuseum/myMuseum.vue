<template>
    <div class="page">
        <div style="background-color: white;padding: 20px;box-sizing: border-box;text-align: start;">
            <el-form :model="queryParams" class="query-form" inline>
                <el-form-item label="文物名称">
                    <el-input v-model="queryParams.name" placeholder="请输入文物名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="fetchData">查询</el-button>
                    <el-button @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button type="primary" @click="addAntique">新增文物</el-button>
            </el-row>
            <el-table :data="dataList" stripe border style="width: 100%;margin-top: 20px;">
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" show-overflow-tooltip align="center"
                    width="150"></el-table-column>
                    <el-table-column prop="find_date" label="出土时间" width="120" show-overflow-tooltip
                    align="center"></el-table-column>
                    <el-table-column prop="product_date" label="源自" width="120" show-overflow-tooltip
                    align="center"></el-table-column>
                <el-table-column prop="src" label="图片" align="center" width="150">
                    <template #default="{ row }">
                        <!-- <img :src="row.src" alt="图片" width="100" height="100"> -->
                         <el-image :src="row.src" :preview-src-list="[row.src]" width="100" height="100" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="description" show-overflow-tooltip width="300" label="描述"
                    align="center"></el-table-column>
                <el-table-column prop="create_time" align="center" width="170" label="创建时间"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="250">
                    <template #default="{ row }">
                        <!-- <el-button type="default" @click="handleViewDetail(row)">详情</el-button> -->
                         <!-- 是否删除 -->
                         <el-popconfirm title="确定要删除该文物吗?" width="200" @confirm="handleDelete(row)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :total="total" style="justify-content: flex-end;margin-right: 50px;" :page-size="pageSize"
                :current-page="currentPage" layout="total, prev, pager, next"
                @current-change="handleCurrentChange"></el-pagination>
            <museumModal ref="museumModalRef" @fetchData="fetchData"></museumModal>
        </div>
    </div>
    <!-- <div v-else
        style="width: 500px;
   border:1px solid #409EFF;height: 300px;border-radius: 20px;margin: 0 auto;transform: translateY(50%);display: flex;flex-direction: column;align-items: center;justify-content: center;gap: 20px;">
        <h1>登录博物馆</h1>
        <el-form :model="user" @submit.prevent="handleLogin" label-width="80px" ref="loginRef" :rules="rules">
            <el-form-item label="账号">
                <el-input v-model="user.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>
                <el-button type="default" native-type="submit">重置</el-button>
            </el-form-item>
        </el-form>
    </div> -->
</template>

<script setup>
import { reactive, ref } from 'vue';
// 引入 ElementPlus 组件
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { AntiqueLogin, DelAntiqueCollect, GetAntiqueCollect } from '@/util/api';
import museumModal from './modules/myMuseumModal.vue';
import storage from '@/storage/storage';

// 获取antique_id
const data = JSON.parse(storage.ls.get("user"))

const antique_id = ref(data.id);
const museumModalRef = ref(null);
const user = reactive({
    account: '',
    password: ''
});
const queryParams = ref({
    name: ''
});
const dataList = ref([]);
const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const loginRef = ref(null);
const rules = {
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const handleEdit = (row) => {
    museumModalRef.value.show(row, antique_id.value) 
}
const handleDelete = (row) => {
    // DelAntiqueCollect 
    DelAntiqueCollect({
        id: row.id 
    }).then((res) => {
        ElMessage.success('删除成功')
        fetchData() 
    }).catch((err) => {
        console.log(err) 
    })
}

//   GetAntiqueCollect
const fetchData = async () => {
    GetAntiqueCollect({
        ...queryParams.value,
        antique_id: antique_id.value,
        page: currentPage.value,
        pageSize: pageSize.value
    }).then((res) => {
        console.log(res)
        dataList.value = res.data.list
        total.value = res.data.total
    }).catch((err) => {
        console.log(err)
    })
};
fetchData()
const addAntique = () => {
    console.log(antique_id.value,'value');
    museumModalRef.value.show(null, antique_id.value) 
}
const handleLogin = () => {
    // 这里可以添加登录验证逻辑
    // 例如，检查账号和密码是否正确
    // 密码不能小于6
    if (user.password.length < 6) {
        ElMessage.error('密码不能小于6位')
        return
    }
    // 账号不能小于6
    if (user.account.length < 6) {
        ElMessage.error('账号不能小于6位')
        return
    }
    loginRef.value.validate((valid) => {
        if (valid) {
            // AntiqueLogin
            AntiqueLogin(user).then((res) => {
                antique_id.value = res.data
                ElMessage.success('登录成功')
            }).catch((err) => {
                console.log(err)
            })
        }
    })

};
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