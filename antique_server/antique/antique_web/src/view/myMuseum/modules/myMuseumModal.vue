<template>
    <el-dialog v-model="addDialogVisible" :title="antique_id != -1 ? '修改文物信息':'添加文物信息'" @close="close">
      <el-form :model="addForm" ref="addFormRef" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input maxlength="40" v-model="addForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-mention maxlength="450" type="textarea" :rows="5" v-model="addForm.description"
            placeholder="请输入描述"></el-mention>
        </el-form-item>
        <el-form-item maxlength="40" label="出土时间" prop="find_date">
          <el-input v-model="addForm.find_date" placeholder="请输入出土时间"></el-input>
        </el-form-item>
        <el-form-item maxlength="40" label="生产时间" prop="product_date">
          <el-input v-model="addForm.product_date" placeholder="请输入生产时间"></el-input>
        </el-form-item>
  
        <el-form-item label="图片" prop="src">
          <el-upload class="avatar-uploader" :action="baseUrl + '/admin/upload'" name="storeAvatar" auto-upload="false"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="addForm.src" :src="addForm.src" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitAddForm">保存</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { AddAntiqueCollect, EditCollectById, GetCollectById } from '@/util/api';
  import { baseUrl } from '@/util/baseConfig';
  import { Plus } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { ref } from 'vue';
  // const antiques = ref([]);
  const addDialogVisible = ref(false);
  const addForm = ref({
    id: '',
    name: '',
    description: '暂无简介',
    find_date: '',
    product_date: '',
    src: ''
  });
  let data = ref({
    id: '',
    name: '',
    description: '暂无简介',
    find_date: '',
    product_date: '',
    src: ''
  })
  const antique_id = ref(-1);
  const rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    description: [
      { required: true, message: '请输入描述', trigger: 'blur' }
    ],
    find_date: [
      { required: true, message: '请输入出土时间', trigger: 'blur' }
    ],
    product_date: [
      { required: true, message: '请输入生产时间', trigger: 'blur' }
    ],
    src: [
      { required: true, message: '请上传图片', trigger: 'blur' }
    ]
  }
  const close = () => {
    addDialogVisible.value = false;
    addForm.value = {
      id: '',
      name: '',
      description: '暂无简介',
      find_date: '',
      product_date: '',
      src: ''
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
    addForm.value.src = res.data
  }
  const addFormRef = ref(null);
  
  const show = (rows,id) => {
    if(id == null || id == -1 || id == ''){
        ElMessage.error('请先登录')
        return
    }
    console.log(rows,'rows');
    antique_id.value = id
    if (rows?.id != null) {
      // 编辑
      GetCollectById({
        id: rows.id 
      }).then((res) => {
        console.log(res,'res')
        Object.keys(addForm.value).forEach(key => {
            addForm.value[key] = res.data[key]
        })
        Object.keys(data.value).forEach(key => {
          data.value[key] = res.data[key]
        })
        addDialogVisible.value = true;
        console.log(addForm.value,'addForm');
      }).catch((err) => {
        console.log(err)
      })
      return
    }
    addDialogVisible.value = true;
    addForm.value = {
      id: '',
      name: '',
      description: '暂无简介',
      find_date: '',
      product_date: '',
      src: ''
    };
  };
  
  defineExpose({ show })
  const emits = defineEmits(['fetchData'])
  
  const submitAddForm = async () => {
    if(antique_id.value == -1){
        ElMessage.error('请先登录')
        return 
    }
    if(addForm.value.id == null || addForm.value.id == ''){
    addFormRef.value.validate((valid) => {
      if (valid) {
        // AddAntique
        console.log(addForm.value, 'addForm.value');
        AddAntiqueCollect({
            ...addForm.value,
          antique_id: antique_id.value,
        }).then((res) => {
          console.log(res)
          ElMessage.success('添加成功');
          close()
          emits('fetchData')
        }).catch((err) => {
          console.log(err)
        })
      }
    })
    }else{
      // 编辑
      let d = {}
      for(let key in addForm.value){
        if(addForm.value[key] != data.value[key]){
          d[key] = addForm.value[key]
        }
      }
      console.log(d,addForm.value.id ,'d');
      if(Object.keys(d).length == 0){
        close()
        emits('fetchData') 
      }else{
        // 编辑
        // EditCollectById
        EditCollectById({
          ...d,
          id: addForm.value.id 
        }).then((res) => {
          ElMessage.success('修改成功');
          close()
          emits('fetchData') 
        }).catch((err) => {
          console.log(err) 
        })
      }
    }

  };
  </script>
  
  <style scoped>
  .query-form {
    margin-bottom: 20px;
  }
  
  .el-input,
  .el-select {
    width: 300px;
  }
  
  .el-mention {
    width: 400px;
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
  </style>