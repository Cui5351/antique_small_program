<template>
    <div class="page">
        <el-container class="main-container">
            <el-header class="header">
                <h1>{{museumInfo.name}}主页</h1>
            </el-header>
            <el-main class="main-content">
                <el-row class="info-row">
                    <el-col :span="8" >
                        <el-image :src="museumInfo.avatar" class="museum-avatar" fit="cover"></el-image>
                        <p style="margin: 10px 0;">账号：{{ museumInfo.account }}</p>                        
                        <p style="margin: 10px 0;">联系电话：{{ museumInfo.tel }}</p>                        
                        <el-button type="primary" @click="openEditDialog">编辑信息</el-button>
                    </el-col>
                    <el-col :span="16">
                        <el-card class="museum-info-card">
                            <h2>{{ museumInfo.name }}</h2>
                            <p style="margin: 10px 0 20px 0">所在地：{{ museumInfo.location }}</p>
                            <p>描述：{{ museumInfo.description }}
                            <el-link :href="museumInfo.book_url" type="primary" target="_blank">预约入口</el-link>
                            </p>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 我绑定的商铺 -->
                <el-row class="shop-row" style="margin-top: 50px;">
                    <el-col :span="24">
                        <div style="text-align: start;margin: 20px 0;display: flex;gap: 20px;align-items: center;">
                            <h2 style="text-align: start;">我绑定的商铺</h2>
                            <el-button type="primary" @click="openAddDialog">添加商铺</el-button>
                        </div>
                            <el-table :data="shops" border style="text-align: start;">
                        
                                <el-table-column prop="name" label="商铺名称" width="140" align="center" show-overflow-tooltip>
                                </el-table-column>
                                
                                <el-table-column prop="src" label="商铺头像" width="180" align="center">
                                    <template #default="scope">
                                        <el-image :src="scope.row.src" fit="cover" style="width: 80px;height: 80px;">
                                        </el-image>
                                    </template>
                                </el-table-column>
                                <!-- 联系电话 -->
                                <el-table-column prop="tel" label="联系电话" width="130" align="center">
                                </el-table-column>
                                <el-table-column prop="account" label="商铺账号" width="130" align="center">
                                </el-table-column>
                                <el-table-column prop="description" label="商铺描述" width="350" show-overflow-tooltip align="center">
                                </el-table-column>
                                <el-table-column label="操作" width="150" align="center">
                                    <template #default="scope">
                                        <el-popconfirm title="确定要删除该商铺吗?" placement="top" width="180" @confirm="delStore(scope.row)">
                                            <template #reference>
                                                <el-button type="danger">删除</el-button>
                                            </template>
                                        </el-popconfirm>
                                    </template>
                                </el-table-column>
                            </el-table>
                    </el-col>
                </el-row>
            </el-main>
            <!-- 添加商铺 -->
            <el-dialog v-model="isAddDialogVisible" align-center title="添加商铺" @close="closeAdd">
                <div style="display: flex;flex-wrap: wrap;gap: 20px;">
                    <el-card v-for="item in stores" :key="item.id" style="width: 45%;">
                        <template #header>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-image :src="item.src" style="width: 100px;height: 100px;" width="100" height="100"></el-image>
                        <template #footer>
                            <!-- 添加按钮 -->
                            <el-button type="primary" v-if="item.bindAntique == null" @click="add(item.id)">添加</el-button>
                            <!-- 已添加 -->
                             <el-tag type="success" v-else>
                                 已添加({{ item.bindAntique }})
                             </el-tag>
                        </template>
                    </el-card>
                </div>
                <el-pagination :total="page.total" :page-size="page.pageSize"
                style="justify-content: flex-end;margin-right: 50px;margin-top: 20px;" 
                layout="total, prev, pager, next"
                    :current-page="page.page" @current-change="handleCurrentChange">
                </el-pagination> 
                    <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="closeAdd">取消</el-button>
                    </span>
                </template>
            </el-dialog>
               
            <!-- 编辑信息的Dialog -->
            <el-dialog v-model="isEditDialogVisible" align-center title="编辑博物馆信息" @close="close">
                <el-form :rules="rules" :model="editForm" label-width="100px" ref="museumRef">
                    <el-form-item label="头像" prop="avatar">
                        <el-upload class="avatar-uploader" :action="baseUrl + '/admin/upload'" name="storeAvatar"
                            auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="editForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地" prop="location">
                        <!-- <el-input v-model="editForm.location"></el-input> -->
                        <el-select v-model="editForm.location" placeholder="请选择地区" filterable>
                            <el-option v-for="location in locations" :key="location" :label="location"
                                :value="location"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 账户，密码 -->
                    <el-form-item label="账户" prop="account">
                        <el-input v-model="editForm.account" placeholder="请输入账户"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="editForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="tel">
                        <el-input v-model="editForm.tel" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="预约网址" prop="book_url">
                        <el-mention maxlength="300" type="textarea" :rows="1" v-model="editForm.book_url"
                        placeholder="请输入入馆预约网址"></el-mention>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-mention maxlength="1000" type="textarea" :rows="5" v-model="editForm.description"
                            placeholder="请输入描述"></el-mention>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" @click="saveEdit">保存</el-button>
                    </span>
                </template>
            </el-dialog>
        </el-container>
    </div>
</template>

<script setup>
import storage from '@/storage/storage';
import { AddAntiqueBindStore, DelAntiqueBindStore, EditAntiqueById, FindAntiqueById, GetMyBindStoreById, GetStoreForAntique } from '@/util/api';
import { baseUrl } from '@/util/baseConfig';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const museumRef = ref(null);
const rules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    location: [
        { required: true, message: '请输入所在地', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入描述', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' }
    ],
    account: [
        { required: true, message: '请输入账户', trigger: 'blur' }
    ],
    password: [
        { required: false, message: '请输入密码', trigger: 'blur' }
    ],
    book_url: [
        { required: false, message: '请输入入馆预约网址', trigger: 'blur' }
    ],
    tel: [
        { required: false, message: '请输入联系电话', trigger: 'blur' } 
    ]
}
const locations = ref([
    '北京市', '天津市', '上海市', '重庆市', '湖北省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖南省', '广东省', '湖南省', '海南省', '四川省', '贵州省', '陕西省', '甘肃省', '青海省', '台湾省', '广西壮族自治区', '内蒙古自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'
]);
const data = JSON.parse(storage.ls.get("user"))
const isAddDialogVisible = ref(false)
const page = reactive({
    page: 1,
    pageSize: 2,
    total: 0, 
})
const handleCurrentChange = (val) => {
    page.page = val
    loadStores() 
}
const shops = ref([])
const stores = ref([])
const LoadBindStore = () => {
    GetMyBindStoreById().then((res) => {
        console.log(res,'res');
        shops.value.splice(0, shops.value.length,...res.data) 
    }).catch((err) => {
        console.log(err) 
    })
}
LoadBindStore()
const add = (id) => {
    // AddStoreToAntique
    AddAntiqueBindStore({
        id:id
    }).then((res) => {
        ElMessage.success('添加成功')
        LoadBindStore() 
        loadStores()
    }).catch((err) => {
        console.log(err) 
    })
}
const delStore = (row) => {
    DelAntiqueBindStore({
        id: row.id
    }).then((res) => {
        ElMessage.success('删除成功')
        LoadBindStore()
    }).catch((err) => {
        console.log(err)
    })
}
const loadStores = () => {
    GetStoreForAntique({
        page: page.page,
        pageSize: page.pageSize,
    }).then((res) => {
        page.total = res.data.total
        stores.value.splice(0, stores.value.length, ...res.data.list)
    }).catch((err) => {
        console.log(err) 
    })
}

const openAddDialog = () => {
    // 打开添加Dialog
    isAddDialogVisible.value = true
    page.page = 1
    page.total = 0 
    stores.value.splice(0, stores.value.length)
    loadStores()
}

const closeAdd = () => {
    // 关闭添加Dialog
    isAddDialogVisible.value = false 
    stores.value.splice(0, stores.value.length)
}

const antique_id = ref(data.id);
const museumInfo = ref({
    account: "",
    avatar: "",
    create_time: null,
    description: "",
    id: null,
    location: "",
    name: "",
    password:"",
    tel:"",
    book_url: ''
})
const del = (row) => {
    // DelAntiqueCollect 
    console.log(row,'row');
}
const loadData = () => {
    // 调用接口获取数据
    FindAntiqueById({
        id: antique_id.value
    }).then((res) => {
        console.log(res, 'res')
        // museumInfo.value = res.data
        Object.keys(museumInfo.value).forEach(key => {
            museumInfo.value[key] = res.data[key]
        })
    }).catch((err) => {
        console.log(err)
    })
}
const loadData2 = () => {
    // 调用接口获取数据
    FindAntiqueById({
        id: antique_id.value
    }).then((res) => {
        // museumInfo.value = res.data
        Object.keys(museumInfo.value).forEach(key => {
            museumInfo.value[key] = res.data[key]
        })
        editForm.value = {
            name: museumInfo.value.name,
            location: museumInfo.value.location,
            description: museumInfo.value.description,
            avatar: museumInfo.value.avatar,
            account: museumInfo.value.account,
            book_url: museumInfo.value.book_url,
            tel: museumInfo.value.tel,
        }
        isEditDialogVisible.value = true

    }).catch((err) => {
        console.log(err)
    })
}
// 控制Dialog显示隐藏
const isEditDialogVisible = ref(false)
const router = useRouter()

// 编辑表单数据，初始值为当前展示的博物馆信息
const editForm = ref({
    name: '',
    location: '',
    description: '',
    avatar: '',
    book_url: '',
    account: '',
    tel: '',
    password: ''
})
const close = () => {
    isEditDialogVisible.value = false;
    editForm.value = {
        name: '',
        location: '',
        description: '',
        avatar: '',
        book_url: '',
        tel: '',
        account: '',
        password: ''
    }; 
}
const beforeAvatarUpload = (rawFile) => {
    if (!(rawFile.type == 'image/jpeg' || rawFile.type == 'image/png')) {
        ElMessage.error('Avatar picture must be JPG | PNG format!')
        return false
    }
    if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('Avatar picture size can not exceed 4MB!')
        return false
    }
    return true
}
const handleAvatarSuccess = (
    res,
) => {
    editForm.value.avatar = res.data
}

// 打开编辑Dialog的方法
const openEditDialog = () => {
    loadData2()
}

// 保存编辑的方法
const saveEdit = () => {
    museumRef.value.validate((valid) => {
        if (valid) {
            if(editForm.value.hasOwnProperty("password") && editForm.value.password.trim().length <= 6 && editForm.value.password.trim().length > 0){
                ElMessage.error("密码不能小于6位")
                return 
            }
            if(editForm.value.account.trim().length <= 4){
                ElMessage.error("账户不能小于4位")
                return 
            }
            let d = {}
            for (let key in editForm.value) {
                if (editForm.value[key] != museumInfo.value[key]) {
                    if(key == 'password' && editForm.value[key].trim() == '')
                        continue
                    d[key] = editForm.value[key]
                }
            }
            if(Object.keys(d).length == 0){
                close()
                return 
            }
            EditAntiqueById({
                id: antique_id.value,
                ...d
            }).then((res) => {
                
                if(d.hasOwnProperty("password")){
                    storage.ls.clear()
                    router.replace({
                        path:"/login"
                    })
                    ElMessage.success("修改成功，请重新登录")
                    return
                }
                console.log(res)
                ElMessage.success("修改成功")
                close() 
                loadData()
            }).catch((err) => {
                console.log(err) 
            })
        }
    })

}
loadData()
</script>

<style scoped lang="less">
// @import "../../general/page.css";

.page {
    //   background: rgba(0, 0, 0, .1);
    padding: 10px;
    overflow-y: auto;
    padding-bottom: 100px;
    width: 100%;
    box-sizing: border-box;
    max-height: 100%;
    height: 100%;
}

.el-input,
.el-select {
    width: 230px;
}

.main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    background-color: #333;
    color: white;
    text-align: center;
    line-height: 60px;
}

.main-content {
    padding: 20px;
}

.info-row {
    display: flex;
    align-items: center;
}

.museum-avatar {
    width: 300px;
    height: 200px;
    border-radius: 20px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.museum-info-card {
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    width: 300px;

    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader {
    width: 300px;
    border: 1px dashed var(--el-border-color);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar {
    width: 300px;
    height: 178px;
}

.el-icon,
.avatar-uploader-icon {
    width: 300px;

}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
.el-scrollbar__wrap--hidden-default{
    text-align: start;
}
</style>