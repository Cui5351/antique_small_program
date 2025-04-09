<template>
    <div class="blog-review-page">
      <!-- 顶部搜索栏 -->
      <div class="sticky-header">
        <div class="search-section">
          <h2 style="margin-bottom: 20px">内容审核</h2>
          <el-form>
            <el-row>
              <el-form-item label="搜索用户">
                <el-input v-model="query.userName" placeholder="搜索用户" class="search-input" clearable>
                  <template #prefix>
                    <el-icon>
                      <Search />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="搜索内容">
                <el-input v-model="query.content" placeholder="搜索内容" class="search-input" clearable>
                  <template #prefix>
                    <el-icon>
                      <Search />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="发布状态">
                <el-select v-model="query.status" class="search-input" placeholder="发布状态" clearable>
                  <el-option label="显示" value="show" />
                  <el-option label="隐藏" value="hid" />
                </el-select>
              </el-form-item>
              <el-button type="primary" @click="handleSearch">
                <el-icon>
                  <Search />
                </el-icon>搜索
              </el-button>
              <el-button @click="resetSearch">
                <el-icon>
                  <Refresh />
                </el-icon>重置
              </el-button>
            </el-row>
          </el-form>
        </div>
      </div>
  
      <!-- 博客列表 -->
      <div class="blog-list" style="margin-top: 30px">
        <div v-for="blog in blogs" :key="blog.communityId" class="blog-item">
          <div class="user-info">
            <el-image :src="blog.avatar" alt="用户头像" class="avatar" />
            <span class="username">{{ blog.name }}</span>
            <span style="margin-left: 10px;font-size: 15px;color: rgba(0,0,0,.5);">{{ blog.sendDate }}</span>
          </div>
          <div class="blog-content">
            <p class="text">{{ blog.content }}</p>
            <div v-if="(blog.src.length > 0) && (blog.type == 'p') && (blog.src?.length > 0)"
              class="media-container">
              <el-image :initial-index="index"
              :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
         :preview-src-list="blog.src"
        show-progress
              fit="cover" v-for="(image, index) in blog.src" :key="index" :src="image" alt="博客图片" class="media" />
            </div>
            <div v-if="(blog.src.length > 0) && (blog.type == 'v') && (blog.src?.length > 0)"
              class="media-container">
              <video v-for="(video, index) in blog.src" :key="index" :src="video" controls style="min-width: 300px;background-color: gray;" class="media"></video>
            </div>
          </div>
          <div class="actions">
            <div>
              <!-- 查看 -->
              <el-icon>
                <View color="gray" />
              </el-icon>
              {{ blog.browse }}
              &ensp;
              <!-- 分享 -->
              <!-- 评论 -->
              <el-icon>
                <Comment color="gray" />
              </el-icon>{{ blog.comment_count }}
            </div>
            <div>

              <el-button type="success" v-if="blog.show_moment == 'show'" @click="approveBlog(blog)">显示</el-button>
              <el-button type="info" v-else @click="rejectBlog(blog)">已隐藏</el-button>
              <el-button type="danger" @click="delBlog(blog)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
          :total="total" background layout="total, prev, pager, next, sizes" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </template>
  <script setup>
  import { reactive, ref } from 'vue'
  import { Search, Refresh, StarFilled,Comment,View } from '@element-plus/icons-vue'
  import { checkboxGroupEmits, ElMessage, ElMessageBox } from 'element-plus'
import { DeleteCommunity, GetAllCommunity, UpdateCommunityStatus } from '@/util/api'
//   import { adminGetAllCommunity, UpdateCommunityStatus } from '@/api/api'
  
  // 模拟博客数据
  const blogs = reactive([])
  // adminGetAllCommunity
  
  //   content page pageSize status userName
  const query = ref({
    content: '',
    status: '',
    userName: ''
  })
  // page: 1,
  // pageSize: 10, 
  
  const currentPage = ref(1)
  const pageSize = ref(5)
  const total = ref(10)
  
  const handleSizeChange = (val) => {
    pageSize.value = val
    // 重新加载数据
    loadData()
  }
  
  const handleCurrentChange = (val) => {
    currentPage.value = val
    // 重新加载数据
    loadData()
  }
  
  const resetSearch = () => {
    Object.assign(query.value, {
      content: '',
      status: '',
      userName: ''
    })
    loadData()
  }
  const handleSearch = () => {
    loadData()
  }
  const delBlog = (blog) => {
    ElMessageBox.confirm('确定删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning', 
    }).then(() => {
      // 执行删除操作
      // 这里可以调用后端接口进行删除操作
      DeleteCommunity({uuid:blog.uuid}).then(res => {
        ElMessage.success('删除成功') 
        loadData()
      }).catch(err => { 
        ElMessage.error('删除失败')
      })
    }).catch(err => { })
  }
  
  
  // 加载数据
  const loadData = () => {
    // 模拟从后端获取博客数据的请求
    // 根据这些条件查询 content page pageSize status userName
    // adminGetAllCommunity
    GetAllCommunity({
      page: currentPage.value,
      pageSize: pageSize.value,
      ...query.value
    }).then(res => {
        console.log(res,'res');
      blogs.splice(0, blogs.length)
      blogs.push(...res.data.list)
      console.log(blogs, 'blogs');
      total.value = res.data.total
      console.log(res, 'res')
    }).catch(err => {
      console.log(err, 'err')
    })
  }
  loadData()
  
  // 审核通过
  const approveBlog = (blog) => {
    ElMessageBox.confirm('确定设置隐藏吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      console.log(blog,'blog');
      let status = blog.show_moment == 'show' ? 'hid' : 'show'
      UpdateCommunityStatus({ uuid: blog.uuid, show_moment: status }).then(res => {
        ElMessage.success('操作成功')
        loadData()
      })
    }).catch(err => { })
  }
  
  // 审核拒绝
  const rejectBlog = (blog) => {
    // blog.status = blog.status == 1 ? 0 : 1
    ElMessageBox.confirm('确定设置显示吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      let status = blog.show_moment == 'show' ? 'hid' : 'show'
      UpdateCommunityStatus({ uuid: blog.uuid, show_moment: status }).then(res => {
        ElMessage.success('操作成功')
        loadData()
      })
    }).catch(err => { })
  }
  
  </script>
  
  <style scoped>
  .blog-review-page {
    padding: 20px;
    background-color: #fff;
    height: 75%;
    overflow-y: auto;
    width: 86%;
    padding-bottom: 100px;
    position: relative;
  }
  
  .sticky-header {
    position: sticky;
    top: 0;
    width:85%;
    z-index: 100;
    margin:0 auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .search-section {
    background: white;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  
  .blog-list {
    margin-top: 30px;
    width: 100%;
    background-color: #fff;
  }
  
  .blog-item {
    margin: 0 auto;
    max-width: 80%;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .username {
    font-size: 16px;
    font-weight: bold;
  }
  
  .blog-content {
    margin-bottom: 15px;
  }
  
  .text {
    font-size: 14px;
    color: #606266;
    margin-bottom: 15px;
    text-align: start;
  }
  
  .media-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .media {
    max-width: 100%;
    height: auto;
    max-width: 300px;
    height: 200px;
    border-radius: 8px;
  }
  
  video.media {
    max-width: 300px;
  }
  
  .actions {
    display: flex;
    /* justify-content: flex-end; */
    justify-content: space-between;
    gap: 10px;
  }
  
  .el-form-item {
    margin-right: 10px;
  }
  
  .search-input {
    width: 200px;
  }
  
  .pagination-container {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
  }
  </style>