<template>
  <el-dialog v-model="addDialogVisible" title="添加博物馆" @close="close">
    <el-form :model="addForm" ref="addFormRef" :rules="rules">
      <el-form-item label="地区" prop="location">
        <el-select v-model="addForm.location" placeholder="请选择地区" filterable>
          <el-option v-for="location in locations" :key="location" :label="location" :value="location"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input maxlength="28" :rows="3" v-model="addForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <!-- 电话tel -->
      <el-form-item label="电话" prop="tel">
        <el-input maxlength="28" :rows="3" v-model="addForm.tel" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-mention maxlength="1000" type="textarea" :rows="5" v-model="addForm.description"
          placeholder="请输入描述"></el-mention>
      </el-form-item>
      <el-form-item maxlength="28" label="账户" prop="account">
        <el-input v-model="addForm.account" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item maxlength="28" label="密码" prop="password">
        <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="入馆预约网址" prop="book_url">
        <el-mention maxlength="300" type="textarea" :rows="2" v-model="addForm.book_url"
        placeholder="请输入入馆预约网址"></el-mention>
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-upload class="avatar-uploader" :action="baseUrl + '/admin/upload'" name="storeAvatar" auto-upload="false"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="addForm.avatar" :src="addForm.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitAddForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { AddAntique,EditAntiqueById, FindAntiqueById } from '@/util/api';
import { baseUrl } from '@/util/baseConfig';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
const addDialogVisible = ref(false);
let id = ref(-1);
const addForm = ref({
  id: '',
  location: '',
  name: '',
  description: '',
  account: '',
  password: '',
  avatar: '',
  book_url:'',
  tel:''
});
const editForm = ref({
  id: '',
  location: '',
  name: '',
  description: '',
  account: '',
  password: '',
  avatar: '',
  book_url:'',
  tel:''
})
const rules = ({
  location: [
    { required: true, message: '请选择地区', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  description: [
    { required: false, message: '请输入描述', trigger: 'blur' }
  ],
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' }
  ],
  book_url:[
    { required: false, message: '请输入入馆预约网址', trigger: 'blur' }
  ],
  tel:[
    { required: false, message: '请输入电话', trigger: 'blur'} 
  ]
})
const emits = defineEmits(['fetchData'])
const close = () => {
  id.value = -1
  addDialogVisible.value = false;
  addForm.value = {
    id: '',
    location: '',
    name: '',
    description: '',
    account: '',
    password: '',
    avatar: '',
    book_url:'',
    tel:''
  };
  editForm.value = {
    id: '',
    location: '',
    name: '',
    description: '',
    account: '',
    password: '',
    avatar: '',
    book_url:'',
    tel:''
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
  addForm.value.avatar = res.data
}
const addFormRef = ref(null);
const locations = ref([
  '北京市', '天津市', '上海市', '重庆市', '湖北省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖南省', '广东省', '湖南省', '海南省', '四川省', '贵州省', '陕西省', '甘肃省', '青海省', '台湾省', '广西壮族自治区', '内蒙古自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'
]);

const show = (rows) => {
  if (rows?.id != null) {
    // 编辑
    FindAntiqueById({
        id: rows.id
    }).then((res) => {
      id.value = rows.id
        Object.keys(addForm.value).forEach(key => {
          addForm.value[key] = res.data[key]
        })
        // 
        rules.password[0].required = false;
        editForm.value = {
            name: addForm.value.name,
            location: addForm.value.location,
            description: addForm.value.description,
            avatar: addForm.value.avatar,
            account: addForm.value.account,
            book_url: addForm.value.book_url,
            tel: addForm.value.tel
        }
        addDialogVisible.value = true;
    }).catch((err) => {
        console.log(err)
    })
    return
  }
  rules.password[0].required = true
  addDialogVisible.value = true;
  addForm.value = {
    id: '',
    location: '',
    name: '',
    description: '',
    account: '',
    password: '',
    avatar: '',
    book_url:'',
    tel:''
  };
};

defineExpose({ show })

const submitAddForm = async () => {
  // 密码不能低于6位
  // 账户不能低于4位
  addFormRef.value.validate((valid) => {
    if (valid) {
  if (addForm.value.account.length < 4) {
    ElMessage.error('账户不能小于4位')
    return 
  }
  if(id.value == -1){
  if (addForm.value.password.length < 6) {
    ElMessage.error('密码不能小于6位')
    return
  }
      // AddAntique
      console.log(addForm.value, 'addForm.value');
      AddAntique(addForm.value).then((res) => {
        ElMessage.success('添加成功');
        close();
        emits('fetchData')
      }).catch((err) => {
        console.log(err)
      })
}else {
  let d = {}
  console.log(addForm.value.password,'addForm.value.password');
  if(addForm.value.hasOwnProperty("password") && addForm.value.password != null && addForm.value.password.trim().length <= 6 && addForm.value.password.trim().length > 0){
                ElMessage.error("密码不能小于6位")
                return 
            }
  Object.keys(addForm.value).forEach(key => {
    if(key == 'password' && addForm.value.password != null && addForm.value[key].trim() == '')
                  return
   if(editForm.value[key] != addForm.value[key]){
      d[key] = addForm.value[key]
   } 
  })
  if(Object.keys(d).length == 0){
                close()
                return 
            }
  console.log(d,'d');
  // 编辑
  EditAntiqueById({
    ...d,
    id:id.value
  }).then((res) => {
    ElMessage.success('编辑成功');
    close(); 
    emits('fetchData')
  }).catch((err) => {
    console.log(err)
  })
}
}
})

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