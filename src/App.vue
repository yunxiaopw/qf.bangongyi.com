<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >
  
html, body, #app{
      width: 100%;
      height: 100%;
}
#app {
  /* 必须注释不能放全局 */
  /* overflow-y: auto; */
}
#app::-webkit-scrollbar {
  display: none;
}
body, #app {
  font-size: 14px;
}
</style>
