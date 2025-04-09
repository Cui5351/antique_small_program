<template>
  <div class="visualization">
    <div class="left" style="width: 630px; height: 630px;">
            <div id="main" style="width: 300px;height:300px; border: 1px solid black;"></div>
            <div id="main1" style="width: 300px;height:300px; border: 1px solid black"></div>
            <div id="main2" style="width: 300px;height:300px; border: 1px solid black"></div>
            <div id="main3" style="width: 300px;height:300px; border: 1px solid black"></div>
    </div>
    <div class="right" style="width: 630px; height: 630px;">
            <div id="rightMain" style="width: 300px;height:300px; border: 1px solid black"></div>
            <div id="rightMain1" style="width: 300px;height:300px;border: 1px solid black "></div>
            <div id="rightMain2" style="width: 300px;height:300px;border: 1px solid black "></div>
            <div id="rightMain3" style="width: 300px;height:300px;border: 1px solid black"></div>
    </div>
  </div>
</template>

<script>
export default{
  name:'',
  setup(){

    return{}
  }
}
</script>

<style scoped>
.visualization {
  display: flex;
  justify-content: space-between;
  }
  .left,.right {
        width: 630px;
        height: 630px;
        border: 1px solid #ccc;
        /* 可选，添加边框方便查看容器范围 */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* 均匀分布每行元素 */
  }
</style>