<template>
  <div v-if="list">
    <div class="row-title" v-if="title">
      {{title}}
    </div>
    <div class="container">
      <div class="left">
        <a :href="list[0].relationUrl">
          <img :src="$path.imgsPath+list[0].activityImageUrl+suffix" alt="">
        </a>
      </div>
      <div class="right">
        <a :href="list[1].relationUrl">
          <img :src="$path.imgsPath+list[1].activityImageUrl+suffix" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BannerTwo",
    props: ['order', 'title', 'list'],
    data(){
      return {
        suffix:'?x-oss-process=image/resize,w_320'
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    > div {
      flex: 1;
    }
    img {
      width: 100%;
    }
  }
</style>
