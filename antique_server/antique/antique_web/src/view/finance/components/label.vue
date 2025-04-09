<template>
  <!-- <div class="label">
      <div>
        <span>{{ title }}</span>
      </div>
      <div style="display: flex;align-items: center;">
        <p style="font-size: 30px;">
            {{ money }}
        </p>
        <span> 元</span>
      </div>
      <div>
        <span>
            完成：
        </span>
        {{ num }} <span>单</span>
      </div>
  </div> -->
  <el-card style="width: 480px;cursor: pointer;" shadow="hover">
    <div>
        <span>{{ title }}</span>
      </div>
      <div style="display: flex;align-items: flex-end;gap: 5px;">
        <p style="font-size: 30px;">
            {{ money }}
        </p>
        <span> 元</span>
      </div>
      <div>
        <span>
            完成：
        </span>
          {{ num }}
         <span>单</span>
      </div>
      <div>
        <span>
            取消：
        </span>
        {{ cancel }} <span>单</span>
      </div>
  </el-card>
</template>

<script>
export default{
  name:'label',
  props:["title","money","num","cancel"],
  setup(){

    return{}
  }
}
</script>

<style scoped>
span{
    color: gray;
    font-size: 13px;
}
div{
  margin: 2px 0;
}
.label{
    box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    width: 300px;
    /* height: 300px; */
    padding: 20px 10px;
    border-radius: 5px; 
}
</style>