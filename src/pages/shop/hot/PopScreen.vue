<template>
  <transition name="opacity">
    <div class="mask pop-screen" v-if="isOpen&&list" @touchmove.prevent>
      <div class="wrapper">
        <div class="swiper-container pop-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">
              <a :href="item.jumpUrl">
                <img :src="$path.imgsPath+item.imgUrl" alt="">
              </a>
            </div>
          </div>
          <div class="pop-pagination swiper-pagination"></div>
        </div>
        <i class="iconfont icon-cha" @click="isOpen=false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import loginInfo from 'mixins/loginInfo'

  export default {
    name: "PopScreen",
    mixins: [loginInfo],
    data() {
      return {
        isOpen: false,
        list: undefined
      }
    },
    mounted() {
      axios.get(this.$path.goodsPath + 'window/popupWindow', {
        headers: this.$mapData(['token', 'userId'])
      }).then(({data}) => {
        if (data.status === 'success') {
          if(Object.prototype.toString.call(data.data)!=='[object Array]'){
            data.data = [data.data]
          }
          let list = data.data
          if (list && list.length) {
            this.list = list.filter(item => item.status === 1)
            this.isOpen = true
            if (list.length > 1) {
              this.$nextTick(() => {
                new Swiper('.pop-swiper', {
                  pagination: {
                    el: '.pop-pagination',
                  },
                })
              })
            }
          }
        }
      })
    }
  }
</script>

<style lang="scss">
  .pop-pagination {
    width: 100%;
    margin-top: 20px;
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
  .pop-screen {
    .wrapper {
      position: relative;
      width: 80%;
      margin-top: 20px;
    }
    a {
      img {
        width: 100%;
      }
    }
    i {
      color: #fff;
      font-size: 54px;
      position: absolute;
      right: -28px;
      top: -28px;
      z-index: 99;
    }
  }
</style>
