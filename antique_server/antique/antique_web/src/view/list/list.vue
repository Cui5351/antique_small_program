<template>
  <GlobalHead @CollapseToggle="CollapseToggle" :isCollapse="isCollapse" :user="userData.name"></GlobalHead>
  <div class="container">
    <div class="menu">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" router
      close-on-click-outside="true"
        @close="handleClose">
        <el-menu-item index="/homePage">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu  index="/control" v-if="userData.role == '商铺' || userData.role == '超级管理员'">
          <template #title>
            <el-icon><Place /></el-icon>
            <span>控制台</span>
          </template>
          <el-menu-item index="/myStoreInfo">
            <el-icon><Shop /></el-icon>
            <!-- <el-icon><Notebook /></el-icon> -->
            店铺信息
          </el-menu-item>
          <el-menu-item index="/GoodsManage" >
            <el-icon><Notebook /></el-icon>
            商品管理
          </el-menu-item>
          <el-menu-item index="/Delivery">
          <el-icon><Tickets /></el-icon>
            购买记录
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu  index="/myMuseum" v-if="userData.role == '博物馆'">
          <template #title>
            <el-icon><Place /></el-icon>
            <span>博物馆</span>
          </template>
          <el-menu-item index="/MuseumBaseInfo">
            <el-icon><Notebook /></el-icon>
            基本信息
          </el-menu-item>
          <el-menu-item index="/myMuseum">
          <el-icon><Tickets /></el-icon>
            文物管理
          </el-menu-item>
        </el-sub-menu>
        <!-- <el-menu-item index="/myMuseum">
          <el-icon><House /></el-icon>
          <template #title>博物馆</template>
        </el-menu-item> -->
        <el-menu-item index="/home" v-if="userData.role == '超级管理员'">
          <!-- <el-icon><House /></el-icon> -->
          <el-icon><OfficeBuilding /></el-icon>
          <template #title>门店管理</template>
        </el-menu-item>
        <el-menu-item index="/museum" v-if="userData.role == '超级管理员'">
          <el-icon><School /></el-icon>
          <template #title>博物馆管理</template>
        </el-menu-item>
        <!-- 财务管理 -->
        <el-menu-item index="/finance" v-if="userData.role == '超级管理员'">
          <el-icon><Coin /></el-icon>
          <template #title>财务统计</template>
        </el-menu-item>
        <!-- 社区管理 -->
        <el-menu-item index="/communityManage" v-if="userData.role == '超级管理员'">
          <el-icon><Ship /></el-icon>
          <template #title>社区管理</template>
        </el-menu-item>
        <!-- <el-menu-item index="/resource" v-if="userData.role == '超级管理员'">
          <el-icon><Picture /></el-icon>
          <template #title>资源管理</template>
        </el-menu-item> -->
        <!-- <el-sub-menu index="/SignRecord">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>考勤记录</span>
          </template>
          <el-menu-item index="/SignRecord">
            <el-icon>
              <location />
            </el-icon>
            考勤记录
          </el-menu-item>
        </el-sub-menu> -->
        <!-- <el-menu-item index="/DataStatistics">
          <el-icon><PieChart /></el-icon>
          <template #title>数据统计</template>
        </el-menu-item> -->
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { Place, Location, Position,House,Notebook,OfficeBuilding,School,Picture,Ship,Shop,Coin, Tickets, PieChart } from '@element-plus/icons-vue'
import GlobalHead from '@/components/GlobalHead.vue';
import { reactive, ref } from 'vue';
import storage from '@/storage/storage';
import { useRouter } from 'vue-router'
const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const logout = () => {
  storage.ls.clear()
  router.replace({
    path:"/login"
  })
}
// 用户分类
// 博物馆0，商铺1，管理员2

const router = reactive(useRouter())
// 查看当前登录状态
// storage.ls.set("userId",data.id)
const data = JSON.parse(storage.ls.get("user"))
if(data == null){
  logout()
}
const userData = ref({
  name:data.name,
  role:data.role,
  id:data.id,
  account:data.account
})


const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const CollapseToggle = (state) => {
  isCollapse.value = state
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height:400px;
}
.menu{
  max-width: 250px;
  width: 190px;
  margin-right:10px;
}

.container{
  height: 100%;
  display: flex;
}

</style>