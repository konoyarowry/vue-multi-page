<template>
  <div class="entry" v-show="show">
    <img src="~img/hot/banner02.png" alt="" v-if="show===2">
    <img src="~img/hot/banner.gif" alt="" v-else>
  </div>
</template>

<script>
  export default {
    name: "Entry",
    data:()=>({show:0})
  }
</script>

<style scoped lang="scss">
  .entry{
    background: #fff;
    padding: 0 20px;
    img {
      width: 100%;
    }
  }
</style>
