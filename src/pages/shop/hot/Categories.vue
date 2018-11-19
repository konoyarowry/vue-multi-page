<template>
  <div class="swiper-container categories" :class="['categories'+order]" :style="{'margin-bottom':isHomePage?0:mb20}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in localList" :key="index" :class="{'pb-50':localList.length>1}">
        <a href="javascript:" @click="jump(aItem)" class="item" v-for="(aItem,aIndex) in item" :key="aIndex">
          <img :src="$path.imgsPath+aItem.leftImgUrl+suffix">
          <p>{{aItem.leftMenuName}}</p>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  export default {
    name: "Categories",
    props: ['order', 'list', 'enterPageTime'],
    data() {
      return {
        localList: [],
        suffix: '?x-oss-process=image/resize,w_98',
        isHomePage:!mmlg.getQueryString('leftId'),
        mb20:mmlg.pxToVmin(20)
      }
    },
    methods: {
      jump(item) {
        switch (item.leftId) {
          case 14:
            mmlg.reportEvent('手机类目频道页', '02GW_SC_DJSJ', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 15:
            mmlg.reportEvent('电脑类目频道页', '02GW_SC_DJDN', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 16:
            mmlg.reportEvent('家电类目频道页', '02GW_SC_DJJD', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 17:
            mmlg.reportEvent('数码类目频道页', '02GW_SC_DJSM', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 18:
            mmlg.reportEvent('手表类目频道页', '02GW_SC_DJSB', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 19:
            mmlg.reportEvent('美妆类目频道页', '02GW_SC_DJMZ', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 20:
            mmlg.reportEvent('箱包类目频道页', '02GW_SC_DJXB', {
              enterPageTime: this.enterPageTime
            })
            break;
          case 21:
            mmlg.reportEvent('网易严选类目频道页', '02GW_SC_DJWYYX', {
              enterPageTime: this.enterPageTime
            })
            break;
        }
        location.href = item.url
      }
    },
    watch: {
      list() {
        this.localList = mmlg.divideGroup(this.list,8,(item)=>{
          if (mmlg.getQueryString('leftId')) {
            item.url = this.$path.projectPath + 'shop/searchlist.html?rightId=' + item.rightId
            item.leftImgUrl = item.imgUrl
            item.leftMenuName = item.rightMenuName
          } else {
            item.url = './hot.html?leftId=' + item.leftId + '&img=' + item.leftImgUrl;
          }
        })
        if (this.localList.length > 1) {
          this.$nextTick(() => {
            this.swiper = new Swiper('.categories' + this.order, {
              pagination: {
                el: '.categories' + this.order + ' .swiper-pagination',
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

  .categories {
    &.mb-20{
      margin-bottom: 20px;
    }
    background: #fff;
    .item {
      @extend .flex-aj-center;
      flex-direction: column;
      p {
        color: $fontColor2;
        margin-top: $rowPad;
      }
      width: 25%;
      padding: 26px;
      img {
        width: 96px;
        height: 96px;
      }
    }
    .swiper-wrapper {
      display: flex;
    }
    .swiper-slide {
      display: flex;
      flex-wrap: wrap;
    }
    .pb-50 {
      padding-bottom: 50px;
    }
    .swiper-pagination-bullets {
      bottom: 26px
    }
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      margin: 0 10px !important;
      background: #808080;
      opacity: .2;
    }
    .my-bullet-active {
      opacity: .4;
      background: #333;
    }
  }
</style>
