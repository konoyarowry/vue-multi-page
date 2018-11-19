<template>
  <div class="goods-one" v-if="list">
    <div class="row-title" v-if="title">
      {{title}}
    </div>
    <div class="item" v-for="(item,index) in list" :key="index">
      <a :href="getUrlLink(item)">
        <div class="left">
          <img v-if="notLazy" :src="item.goodsImageUrl&&($path.imgsPath+item.goodsImageUrl+suffix)" alt="">
          <img v-else src="~img/hot/placeholder.png" :data-src="item.goodsImageUrl&&($path.imgsPath+item.goodsImageUrl+suffix)" alt="">
          <span class="tag" v-if="item.tagName" :class="['style'+item.styleId]">{{item.tagName}}</span>
        </div>
        <div class="right">

          <p>{{item.skuName}}</p>
          <div class="price">¥<span>{{item.couponPrice||item.marketPrice}}</span></div>
          <div class="monthPay">月供¥{{item.monthPay>= 10 ? item.monthPay.toFixed(2):(+'0').toFixed(2)}}起</div>
        </div>
      </a>

    </div>
  </div>
</template>

<script>
  import mixins from './mixins'
  export default {
    name: "GoodsOne",
    mixins:[mixins],
    props: ['list', 'title','notLazy'],
    data(){
      return {
        suffix:'?x-oss-process=image/resize,w_200'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~css/commons";
  @import "./goods";

  .goods-one {
    background: #fff;
  }

  .item {
    .left {
      margin-right: $rowPad;
      position: relative;
      .tag{
        left: -$rowPad;
      }
    }
    .right {
      div {
        font-size: 24px;
      }
      .monthPay {
        margin-top: 10px;
      }
    }
    a{
      display: flex;
      padding: 36px;
    }
    &:not(:last-of-type) {
      @extend %bb-1px
    }
    img {
      width: 200px;
      height: 200px;
    }
    p {
      font-size: 26px;
      @extend %line-clamp-2
    }
  }
</style>
