<template>
  <div class="swiper-banner" :class="['swiper-banner'+order]">
    <div class="row-title" v-if="title">
      {{title}}
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in list" :key="index">
          <a :href="item.relationUrl" class="img-wrap">
            <img :src="$path.imgsPath+item.activityImageUrl+suffix">
          </a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SwiperBanner",
    props: ['list', 'title','order'],
    data() {
      return {
        suffix: '?x-oss-process=image/resize,w_640'
      }
    },
    watch:{
      list(){
        if (this.list&&this.list.length > 1) {
          this.$nextTick(() => {
            new Swiper('.swiper-banner'+this.order+' .swiper-container', {
              autoplay: {
                delay: 5000
              },
              loop: true,
              pagination: {
                el: '.swiper-banner'+this.order+' .swiper-pagination',
                bulletActiveClass: 'my-bullet-active',
              }
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~css/commons";

  .swiper-banner .swiper-container{
    overflow: hidden;
    img {
      width: 100%;
    }

    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      margin: 0 10px!important;
      background: #fff;
      opacity: .6;
    }
    .my-bullet-active {
      opacity: 1;
    }
  }
</style>
