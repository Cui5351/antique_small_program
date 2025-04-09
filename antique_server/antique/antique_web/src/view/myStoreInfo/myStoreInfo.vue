<template>
    <div class="page">
        <el-container class="main-container">
            <el-main class="main-content">
                <el-row class="info-row">
                    <el-col :span="8">
                        <el-image :src="model.src" class="museum-avatar" fit="cover"></el-image>
                        <p style="margin: 10px 0;">账号：{{ model.account }}</p>
                        <el-button type="primary" @click="openEditDialog">编辑信息</el-button>
                    </el-col>
                    <el-col :span="16">
                        <el-carousel :interval="4000" type="card" height="230px" style="margin-bottom: 20px;" loop>
                            <el-carousel-item v-for="item in model.carousel" :key="item.id">
                                <el-image :src="item.src"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                        <el-card class="museum-info-card">
                            <h2>{{ model.name }}</h2>
                            <p style="margin: 10px 0 20px 0">联系电话：{{ model.tel }}</p>
                            <p style="margin: 10px 0 20px 0">商铺简介：{{ model.description }}</p>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-dialog title="编辑商铺" v-model="isEditDialogVisible" @close="cancel">
                <el-form :model="editForm" label-width="100px" :rules="rules" ref="form">
                    <el-form-item label="商铺名" prop="name">
                        <el-input v-model="editForm.name" placeholder="请输入店铺名称"></el-input>
                    </el-form-item>
                    <!-- 账户密码 -->
                    <el-form-item label="账户" prop="account">
                        <el-input v-model="editForm.account" placeholder="请输入账户"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="editForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 手机号码 -->
                    <el-form-item label="手机号码" prop="tel">
                        <el-input v-model="editForm.tel" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-mention type="textarea" :rows="4" v-model="editForm.description"
                            placeholder="请输入店铺描述"></el-mention>
                    </el-form-item>
                    <el-form-item label="头像" prop="src">
                        <el-upload class="avatar-uploader" :action="baseUrl + '/admin/upload'" name="storeAvatar"
                            auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="editForm.src" :src="editForm.src" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="轮播图" prop="carousel">
                        <el-upload v-model:file-list="fileList"
                            :action="baseUrl + '/admin/upload'" name="storeAvatar"
                            list-type="picture-card" :on-remove="handleRemove" limit="5"
                            :on-success="handleAvatarSuccess2">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="handleOk">确 定</el-button>
                </template>
            </el-dialog>
        </el-container>
    </div>
</template>

<script setup>
import storage from '@/storage/storage';
import { editStoreById, getStoreById, DeleteStoreCarouselPic } from '@/util/api';
import { baseUrl } from '@/util/baseConfig';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const rules = reactive({
    name: [
        { required: true, message: '请输入商铺名', trigger: 'blur' }
    ],
    src: [
        { required: true, message: '请上传图片', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入描述', trigger: 'blur' }
    ],
    account: [
        { required: true, message: '请输入账户', trigger: 'blur' }
    ],
    password: [
        { required: false, message: '请输入密码', trigger: 'blur' }
    ],
    tel: [
        {
            required: true, message: '请输入手机号码', trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入手机号码'))
                } else {
                    if (!/^1[3456789]\d{9}$/.test(value)) {
                        callback(new Error('请输入正确的手机号码'))
                    } else {
                        callback()
                    }
                }
            }
        }
    ],
    carousel: [
        { required: true, message: '请上传轮播图', trigger: 'blur' }
    ]
})
const data = JSON.parse(storage.ls.get("user"))
const form = ref(null)
const model = reactive({
    id: "",
    name: "",
    src: "",
    description: "",
    account: "",
    password: "",
    tel: "",
    carousel: []
})
const handleRemove = (file,) => {
    // 发送删除的请求
    if (file.uid != null) {
        // 发送删除的请求(轮播图)
        DeleteStoreCarouselPic({ id: file.uid }).then((res) => {
            editForm.value.carousel = editForm.value.carousel.filter(item => item.src != res.data)
        })
    }
}
const handleAvatarSuccess2 = (
    res,
) => {
    console.log(res, 'file carousel');
    editForm.value.carousel.push({ src: res.data })
}
const fileList = ref([])

const loadData = () => {
    // 调用接口获取数据
    getStoreById({
        id: data.id
    }).then((res) => {
        Object.keys(model).forEach(key => {
            model[key] = res.data[key]
        })
    }).catch((err) => {
        console.log(err)
    })
}
const loadData2 = () => {
    // 调用接口获取数据
    getStoreById({
        id: data.id
    }).then((res) => {
        // model.value = res.data
        Object.keys(model).forEach(key => {
            if (key == 'carousel') {
                model[key] = res.data[key]?.map(item => ({ src: item.src, id: item.id })) || []
                editForm.value.carousel = res.data[key]?.map(item => ({ src: item.src, id: item.id })) || []
                return
            }
            model[key] = res.data[key]
            editForm.value[key] = res.data[key]
        })
        fileList.value.splice(0, fileList.value.length)
        fileList.value.push(...res.data.carousel.map(item => ({
            uid: item.id,
            url: item.src,
        })))
        isEditDialogVisible.value = true
        console.log(editForm, 'form');

    }).catch((err) => {
        console.log(err)
    })
}
// 控制Dialog显示隐藏
const isEditDialogVisible = ref(false)
const cancel = () => {
    isEditDialogVisible.value = false

    editForm.value.name = ""
    editForm.value.src = ""
    editForm.value.description = ""
    editForm.value.account = ""
    editForm.value.password = ""
    editForm.value.tel = ""
    fileList.value.splice(0, fileList.value.length)
}

// 编辑表单数据，初始值为当前展示的博物馆信息
const editForm = ref({
    name: "",
    src: "",
    description: "",
    account: "",
    password: "",
    tel: ""
})
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
    editForm.value.src = res.data
}

// 打开编辑Dialog的方法
const openEditDialog = () => {
    loadData2()
}

// 保存编辑的方法
const handleOk = () => {
    form.value.validate((valid) => {
        if (valid) {
            // 发送请求
            if (model.id == null || model.id == '') {
                ElMessage.warning("请重新登录")
            } else {
                let d = {}
                Object.keys(editForm.value).forEach((key) => {
                    if (model[key] != editForm.value[key]) {
                        d[key] = editForm.value[key]
                    }
                })
                if (Object.keys(d).length == 0) {
                    isEditDialogVisible.value = false
                    cancel()
                    return
                }
                // 修改
                editStoreById({
                    ...d,
                    id: model.id
                }).then((res) => {
                    console.log(res)
                    isEditDialogVisible.value = false
                    loadData()
                    cancel()
                })
            }

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
    width: 200px;
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
    height: 300px;
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
    width: 200px;
    height: 200px;

    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader {
    width: 200px;
    height: 200px;
    border: 1px dashed var(--el-border-color);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar {
    width: 200px;
    height: 200px;
}

.el-icon,
.avatar-uploader-icon {
    width: 200px;
    height: 200px;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
}

.el-scrollbar__wrap--hidden-default {
    text-align: start;
}


.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>