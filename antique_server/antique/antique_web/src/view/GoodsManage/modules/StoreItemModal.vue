<template>
  <el-dialog :title=title center v-model="visible" width="700px" :before-close="handleClose">
    <el-form :model="model" label-width="80px" :rules="rules" ref="form">
      <!-- <el-input v-model="model.store" placeholder="请输入门店名称"></el-input> -->
      <el-form-item label="门店" prop="store" v-if="userData.role == '超级管理员'">
        <el-select v-model="model.store_id" placeholder="请选择门店" filterable>
          <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="model.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="money">
        <el-input v-model="model.money" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="运费" prop="transport_money">
        <el-input v-model="model.transport_money" placeholder="请输入运输费用"></el-input>
      </el-form-item>
      <!-- <el-form-item label="库存" prop="sale">
        <el-input v-model="model.sale"  placeholder="请输入商品销量"></el-input>
      </el-form-item> -->
      <el-form-item label="库存" prop="depository">
        <el-input v-model="model.depository" placeholder="请输入商品库存"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <!-- <el-textarea :rows="4" v-model="model.description"  placeholder="请输入商品描述"></el-textarea> -->
        <el-mention style="max-width:250px" :rows="4" v-model="model.description" type="textarea"
          placeholder="请输入商品描述" />
      </el-form-item>
      <el-form-item label="商品图片" prop="src">
        <el-upload
          v-model:file-list="fileList"
          :action="baseUrl + '/admin/upload'" name="storeAvatar"
          list-type="picture-card"
          :on-remove="handleRemove"
          limit="5"
          :on-success="handleAvatarSuccess"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button @click="handleOk" type="primary">确 定</el-button>
      <!-- 确定 -->
    </template>
  </el-dialog>
</template>

<script setup>
import { AddStoreItem, DeleteGoodsPic, EditStoreItem, GetStoreNames, loadStoreInfoById } from '@/util/api'
import { reactive, defineExpose, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { baseUrl } from '@/util/baseConfig'
import { ElMessage } from 'element-plus'
import storage from '@/storage/storage'
const visible = ref(false)
const fileList = ref([])
const model = reactive({
  store: "",
  name: "",
  description: "",
  store_id: "",
  money: "",
  transport_money: "",
  depository: "",
  src: [],
  id: null
})

const data = JSON.parse(storage.ls.get("user"))
const userData = ref({
  role:data.role
})
model.store_id = data.id
const stores = reactive([])
// LoadData
const emits = defineEmits(['LoadData'])
const getStoreNames = () => {
  if(data.role != '超级管理员'){
    return
  }
  GetStoreNames().then((res) => {
    stores.splice(0, stores.length, ...res.data)
  })
}
getStoreNames()
const beforeAvatarUpload = (rawFile) => {
  if (!(rawFile.type == 'image/jpeg' || rawFile.type== 'image/png')) {
    ElMessage.error('Avatar picture must be JPG | PNG format!')
    return false
  }
   if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleClose = () => {
  visible.value = false
  fileList.value.splice(0,fileList.value.length)
    edit({
      // store_id: "",
      name: "",
      description: "",
      money: "",
      transport_money: "",
      depository: "",
      src: [],
      id:null
    })
}

const handleAvatarSuccess = (
  res,
) => {
  console.log(res, 'file');
  console.log(fileList,'fileList');
  model.src.push({src:res.data})
}
const handleRemove = (file,) => {
  console.log(file.uid, 'file remove'); 
  // 发送删除的请求
  if(file.uid != null){
    // 发送删除的请求
    DeleteGoodsPic(
      {
        id:file.uid
      }
    ).then((res) => {
      console.log(res,'res'); 
      model.src.splice(model.src.indexOf(file.url), 1)
    })
  }
}

const form = ref(null)
const rules = reactive({
  store_id: [
    { required: true, message: '请选择门店名称', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
  ],
  money: [
    { required: true, message: '请输入正确的商品价格', trigger: 'blur', type: 'number',
    transform(val){
        if((/\d/g).test(val)){
          return Number(val)
        }else
          return false 
      }
     },
  ],
  transport_money: [
    {
      required: true, message: '请输入正确的运费', trigger: 'blur',
      type: 'number',
      transform(val){
        if((/\d/g).test(val)){
          return Number(val)
        }else
          return false 
      }
    },
  ],
  depository: [
    { required: true, message: '请输入正确的库存', trigger: 'blur', type: 'number',
    transform(val){
        if((/\d/g).test(val)){
          return Number(val)
        }else
          return false 
      }
     },
  ],
  description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' },
  ],
  src: [
    { required: true, message: '请上传商品图片', trigger: 'blur' },
  ]
})
const title = ref("")
const edit = (row) => {
  Object.assign(model, row)
}
const handleOk = async () => {
  await form.value.validate((valid, fields) => {
    if (valid) {
      if(model.id == null){
      AddStoreItem(model).then((res) => {
        console.log(res,'res');
        ElMessage.success('添加成功') 
        visible.value = false
          handleClose()
          emits('LoadData')
      }).catch((err) => {
        ElMessage.error('添加失败')
      })
    }else{
      // 编辑
      EditStoreItem(model).then((res) => {
        console.log(res,'res');
        ElMessage.success('编辑成功')
        visible.value = false
        handleClose()
          emits('LoadData')
      }).catch((err) => {
        ElMessage.error('编辑失败') 
      })
    }

    } else {
      console.log(fields, 'fields');
      return false
    }
  })
}
const show = (row, tit) => {
  visible.value = true
  title.value = tit
  if (row?.id) {
    model.id = row.id
    // 根据请求拿数据
    loadStoreInfoById({ id: row.id }).then((res) => {
      fileList.value.splice(0,fileList.value.length)
      console.log(res.data, 'data');
      if(res.data.src.length > 0)
      fileList.value.push(...res.data.src.map(item =>({
        uid:item.id,
        url:item.src
      })))
      console.log(fileList.value,'filelist');
      edit(res.data)
    })
    // edit(row)
  } else {
    // form.value.resetFields()

  }
}
defineExpose({
  show
})
</script>

<style scoped>
.el-input,
.el-select {
  max-width: 250px
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
