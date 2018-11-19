<template>
  <div class="banner">
    <div class="row-title" v-if="title">
      {{title}}
    </div>
    <div class="item">
      <div class="swiper-container banner-large-swiper" :class="['banner-large-swiper-'+order]">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in list" :key="index">
            <a :href="item.relationUrl">
              <img v-if="notLazy" :src="$path.imgsPath+item.activityImageUrl+suffix" alt="">
              <img v-else src="~img/hot/banner-ph.png" :data-src="$path.imgsPath+item.activityImageUrl+suffix" alt="">
            </a>
          </div>
        </div>
        <div class="banner-large-pagination swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Banner",
    props: ['list', 'title', 'order', 'notLazy'],
    data() {
      return {
        suffix: '?x-oss-process=image/resize,w_640'
      }
    },
    watch: {
      list() {
        if (this.list.length > 1) {
          this.$nextTick(()=>{
            new Swiper('.banner-large-swiper-'+this.order, {
              loop: true,
              pagination: {
                el: '.banner-large-swiper-'+this.order+' .swiper-pagination',
              },
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .banner-large-pagination {
    width: 100%;
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      margin: 0 10px !important;
      background: #fff;
      opacity: .6;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
</style>
<style scoped lang="scss">
  @import "~css/commons";

  .banner {
    background: #fff;
  }

  img {
    width: 100%;
    min-height: 90px;
  }
</style>
