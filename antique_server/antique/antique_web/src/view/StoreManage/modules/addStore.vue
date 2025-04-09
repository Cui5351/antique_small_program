<template>
    <!-- 商铺名，描述 -->
    <el-dialog :title="title" v-model="visible" @close="cancel" align-center>
        <el-form :model="model" label-width="100px" :rules="rules" ref="form">
            <el-form-item label="商铺名" prop="name">
                <el-input v-model="model.name" placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <!-- 账户密码 -->
            <el-form-item label="账户" prop="account">
                <el-input v-model="model.account" placeholder="请输入账户"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="model.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <!-- 手机号码 -->
            <el-form-item label="手机号码" prop="tel">
                <el-input v-model="model.tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-mention type="textarea" :rows="4" v-model="model.description" placeholder="请输入店铺描述"></el-mention>
            </el-form-item>
            <el-form-item label="头像" prop="src">
                <el-upload class="avatar-uploader" :action="baseUrl + '/admin/upload'" name="storeAvatar"
                    auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="model.src" :src="model.src" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图" prop="carousel">
                <!-- :action="'https://www.mengzhiyuan.email:5002' + '/admin/upload'" name="storeAvatar" -->
        <el-upload
          v-model:file-list="fileList"
          :action="baseUrl + '/admin/upload'" name="storeAvatar"
          list-type="picture-card"
          :on-remove="handleRemove"
          limit="5"
          :on-success="handleAvatarSuccess2"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
      </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="handleOk">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { AddStore, getStoreById, editStoreById, DeleteStoreCarouselPic} from '@/util/api'
import { baseUrl } from '@/util/baseConfig'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref, defineExpose } from 'vue'
const form = ref(null)
const visible = ref(false)
const emits = defineEmits(['LoadData'])
let data = ref({})
const handleRemove = (file,) => {
  // 发送删除的请求
  if(file.uid != null){
    // 发送删除的请求(轮播图)
    DeleteStoreCarouselPic({id:file.uid}).then((res) => {
      model.carousel = model.carousel.filter(item => item.src != res.data) 
    })
  }
}
const model = reactive({
    id: "",
    name: "",
    src: "",
    description: "",
    account: "",
    password: "",
    tel:"",
    carousel:[]
})
const fileList = ref([])

const title = ref("")
const cancel = () => {
    visible.value = false
    model.name = ""
    model.description = ""
    model.id = ""
    model.src = ""
    model.account = ""
    model.password = ""
    model.tel = ""
    model.carousel = []
    fileList.value.splice(0,fileList.value.length)

}
const handleAvatarSuccess = (
    res,
) => {
    model.src = res.data
}
const handleAvatarSuccess2 = (
    res,
) => {
    console.log(res, 'file carousel');
    model.carousel.push({src:res.data})
}
const beforeAvatarUpload = (rawFile) => {
    if (!(rawFile.type == 'image/jpeg' || rawFile.type == 'image/png')) {
        ElMessage.error('Avatar picture must be JPG | PNG format!')
        return false
    }
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
// handleOk
const handleOk = () => {
    console.log(model)
    form.value.validate((valid) => {
        if (valid) {
            // 发送请求
            if (model.id == null || model.id == '') {
                // 账户密码不能低于6位
                if (model.password.length < 6) {
                    ElMessage.error('密码不能低于6位')
                    return 
                }
                if (model.account.length < 6) {
                    ElMessage.error('账号不能低于6位')
                    return 
                }

                AddStore(model).then((res) => {
                    console.log(res)
                    visible.value = false
                    emits('LoadData')
                    cancel()
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                let d = {}
                Object.keys(model).forEach((key) => {
                    if (model[key] != data.value[key]) {
                        d[key] = model[key]
                    } 
                })
                if(Object.keys(d).length == 0) {
                    visible.value = false
                    // emits('LoadData') 
                    cancel()
                    return 
                }
                // 修改
                editStoreById({
                    ...d,
                    id:model.id
                }).then((res) => {
                    console.log(res)
                    visible.value = false
                    emits('LoadData') 
                    cancel()
                })
            }

        }
    })
}
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
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    tel: [
        { required: true, message: '请输入手机号码', trigger: 'blur',
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
const edit = (row) => {
    Object.keys(model).forEach(key => {
        if(key == 'carousel'){
            model[key] = row[key]?.map(item => ({src:item.src,id:item.id})) || []
            return
        }
        model[key] = row[key]
    })
    // Object.assign(model, row)
}
const show = (row, tit) => {
    visible.value = true
    title.value = tit
    console.log(row,'row');
    if (row?.id) {
        // 根据请求拿数据
        model.id = row.id
        getStoreById({
            id: row.id 
        }).then((res) => {
            data.value = {...res.data}
            console.log(data,'data');
            rules.password[0].required = false
            fileList.value.splice(0,fileList.value.length)
            fileList.value.push(...res.data.carousel.map(item =>({
                uid:item.id,
                url:item.src,
            })))
            edit(res.data)
        }).catch((err) => {
            console.log(err) 
        })
    } else {
        rules.password[0].required = true
        edit({})
    }
}
defineExpose({ show })
</script>

<style scoped>
.el-input {
    width: 200px;
}

.el-mention {
    width: 400px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader {
    border: 1px dashed var(--el-border-color);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar {
    width: 178px;
    height: 178px;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>