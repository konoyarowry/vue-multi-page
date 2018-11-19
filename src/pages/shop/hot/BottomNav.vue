<template>
  <div class="bottom-nav" v-if="$env.isWX">
    <div class="box">
      <a href="javascript:" :class="{active:active==='hot'}" @click="jump($path.vuePath+'shop/hot.html')">
        <img src="~img/hot/nav-icon1-c.png" alt="">
        <span>
            首页
          </span>
      </a>
      <a href="javascript:" :class="{active:active==='coupon'}" @click="jump($path.projectPath+'coupon/index.html')">
        <img src="~img/hot/nav-icon2.png" alt="">
        <span>
            优惠券
          </span>
      </a>
      <a href="javascript:" :class="{active:active==='mine'}"
         @click="jump($path.projectPath+'mine/personalCenter.html')">
        <img src="~img/hot/nav-icon3.png" alt="">
        <span>
            我的
          </span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BottomNav",
    props: {
      active: {
        default: 'hot'
      }
    },
    methods: {
      jump(loc) {
        if (loc !== location.href) {
          location.href = loc
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~css/commons";

  .bottom-nav {
    height: 120px;
    font-size: 24px;
    img {
      width: 44px;
      height: 44px;
      margin-bottom: 6px;
    }
    a {
      padding-top: 10px;
      @extend .flex-aj-center;
      flex-direction: column;
    }
    .box {
      height: 120px;
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 10;
      @extend %bt-1px;
      background: #fafafa;
      display: flex;
      a {
        flex: 1;
      }
    }
    color: #5b5c65;
    .active{
      color: $primary;
    }
  }
</style>
