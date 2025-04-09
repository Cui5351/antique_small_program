<template>
  <div class="GlobalHead">
      <div class="center">
        <img class="logo" src="../assets/basicprofile.png" alt="">
        <div style="margin-left:10px; margin-right: 10px; color: white;" v-show="!isCollapse">
          非遗数字典藏
        </div>
        <!-- <div class="center" style="cursor: pointer;" @click="CollapseToggleEmits"> -->
          <!-- <el-icon color="white" size="30" v-show="isCollapse"><Expand /></el-icon> -->
          <!-- <el-icon color="white" size="30" v-show="!isCollapse"><Fold /></el-icon> -->
        <!-- </div> -->
      </div>
      <div style="display: flex">
        <div class="center" style="margin-right: 15px;color: white;">{{ props.user }}</div>
        <div @click="logout" class="quit">
          <el-icon size="30" color="white"><SwitchButton /></el-icon>
        </div>
      </div>
  </div>
</template>

<script setup>
import storage from '@/storage/storage';
import {SwitchButton, Expand, Fold}  from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps(["isCollapse","user"])
const emits = defineEmits(["CollapseToggle"])
const router = useRouter()
// const CollapseToggleEmits = () => {
  // emits("CollapseToggle",!props.isCollapse)
// }
const logout = () => {
  ElMessageBox.confirm(
    '确定要退出吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    storage.ls.clear()
    router.replace({
      path:"/login"
    })
  }).catch(() => {
  })
}
onMounted(()=>{
  // 监视页面变化
  window.onresize = (event)=>{
    if(event.target.innerWidth <= 500 && props.isCollapse == false){
      emits("CollapseToggle",true)
    }
  }
})
</script>

<style scoped lang="less">
.GlobalHead{
    height:60px;
    width:100%;
    background: rgb(#409EFF);
    // background: rgb( #7979f5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 50px;
    box-sizing: border-box;
    .quit{
      padding:5px 7px;
      cursor: pointer
    }
    .quit:hover{
      background: rgba(255,255,255,0.2);
    }
    .quit:active{
      transform: scale(1.1);
    }
    .logo{
      height:40px;
      widows:40px;
      border-radius:50%;
    }
}
.center{
  display: flex;justify-content: center;align-items: center;
}
</style>