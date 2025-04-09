<template>
    <div class="blog-review-page">
      <div class="search-section">
        <h2 style="margin-bottom:20px">博客审核</h2>
        <el-form class="elForm">
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
                <el-option label="正常" :value="0" />
                <el-option label="异常" :value="1" />
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
      <div class="blog-list" style="margin-top:30px">
        <div v-for="blog in blogs" :key="blog.id" class="blog-item">
          <div class="user-info">
            <img :src="blog.avatar" alt="用户头像" class="avatar" />
            <span class="username">{{ blog.username }}</span>
          </div>
          <div class="blog-content">
            <p class="text">{{ blog.content }}</p>
            <div v-if="blog.images?.length > 0" class="media-container">
              <img
                v-for="(image, index) in blog.images"
                :key="index"
                :src="image"
                alt="博客图片"
                class="media"
              />
            </div>
            <div v-if="blog.videos?.length > 0" class="media-container">
              <video
                v-for="(video, index) in blog.videos"
                :key="index"
                :src="video"
                controls
                class="media"
              ></video>
            </div>
          </div>
          <div class="actions">
            <el-button type="success" v-if="!blog.status" @click="approveBlog(blog)">通过</el-button>
            <el-button type="danger" v-else @click="rejectBlog(blog)">拒绝</el-button>
          </div>
        </div>
      </div>
      <div class="pagination-container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
          :total="total" background layout="prev, pager, next, sizes" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import { checkboxGroupEmits, ElMessage } from 'element-plus'
import { GetAllCommunity } from '@/util/api'
  
  // 模拟博客数据
  const blogs = ref([
    {
      id: 1,
      avatar: 'https://www.mengzhiyuan.email/image/%E8%A5%BF%E6%B8%B8%E8%AE%B0.jpg',
      username: '用户1',
      content: '这是一条测试博客内容，包含图片和视频。',
      state:false,
      images: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
      ],
      communityId:3,
      status: 0
    //   videos: ['https://www.w3schools.com/html/mov_bbb.mp4'],
    },
    {
      id: 2,
      avatar: 'https://www.mengzhiyuan.email/image/%E8%A5%BF%E6%B8%B8%E8%AE%B0.jpg',
      username: '用户2',
      content: '这是另一条测试博客内容，仅包含图片。',
      images: ['https://via.placeholder.com/300'],
      communityId:3,
      status: 0
    },
    {
      id: 3,
      avatar: 'https://www.mengzhiyuan.email/image/%E8%A5%BF%E6%B8%B8%E8%AE%B0.jpg',
      username: '用户3',
      content: '这是第三条测试博客内容，仅包含视频。',
      videos: ['https://www.w3schools.com/html/mov_bbb.mp4'],
      communityId:3,
      status: 0
    },
  ])
      // adminGetAllCommunity

    //   content page pageSize status userName
    const query = ref({
        content: '',
        status: 0,
        userName: ''
    })
    // page: 1,
    // pageSize: 10, 

    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(100)

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


  // 加载数据
  const loadData = () => {
    // 模拟从后端获取博客数据的请求
    // 根据这些条件查询 content page pageSize status userName
          // adminGetAllCommunity
    GetAllCommunity({
        page: currentPage.value,
        pageSize: pageSize.value,
        ...query.value
    }).then(res=>{
        console.log(res,'res')
    }).catch(err=>{
        console.log(err,'err') 
    })
  }
  loadData()
  
  // 审核通过
  const approveBlog = (blog) => {
      // adminUpdateCommunityStatus
      let status = blog.status == 1 ? 0 : 1
      adminUpdateCommunityStatus({communityId:blog.communityId,status:status}).then(res=>{
          ElMessage.success('操作成功') 
    })
    console.log(blog,'通过');
  }
  
  // 审核拒绝
  const rejectBlog = (blog) => {
    // blog.status = blog.status == 1 ? 0 : 1
    console.log(blog,'拒绝');
    let status = blog.status == 1 ? 0 : 1
      adminUpdateCommunityStatus({communityId:blog.communityId,status:status}).then(res=>{
          ElMessage.success('操作成功') 
    })
  }

  </script>
  <style scoped>
  .elForm{
    display:sticky;
  }
  .blog-review-page {
    padding: 20px;
    /* max-width: 800px; */
    background-color: #fff;
    /* margin: 0 auto; */
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
  .search-section{
    background: white;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 10px;
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
  }
  
  .media-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .media {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  video.media {
    max-width: 300px;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
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