<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  height: 100%;
  width:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,html{
  height:100%;
  width:100%;
  overflow: hidden;
}
*{
  padding: 0 0;
  margin:0 0;
}
</style>
