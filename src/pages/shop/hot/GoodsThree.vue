<template>
  <div class="goods-three" v-if="list">
    <div class="row-title" v-if="title">
      {{title}}
    </div>
    <div class="wrapper">

      <div class="item" v-for="(item,index) in list.slice(0,3)" :key="index">
        <a :href="getUrlLink(item,'relationUrl')">
          <div class="top">
            <img v-if="notLazy" :src="item.goodsImageUrl&&($path.imgsPath+item.goodsImageUrl+suffix)" alt="">
            <img v-else src="~img/hot/placeholder.png" :data-src="item.goodsImageUrl&&($path.imgsPath+item.goodsImageUrl+suffix)" alt="">
            <span class="tag" v-if="item.tagName" :class="['style'+item.styleId]">{{item.tagName}}</span>
          </div>
          <p>{{item.skuName}}</p>
          <div class="price">¥<span>{{item.couponPrice||item.marketPrice}}</span></div>
          <div class="monthPay">月供¥{{item.monthPay>= 10 ? item.monthPay.toFixed(2):(+'0').toFixed(2)}}起</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import mixins from './mixins'
  export default {
    name: "GoodsThree",
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
  .goods-three {
    background: #fff;
  }
  .wrapper{
    display: flex;
  }
  .item{
    flex: 1;
    .top{
      align-self: center;
      position: relative;
      .tag{
        left: -$rowPad;
        bottom: 40px;
      }
      width: 176px;
      height: 176px;
    }
    &:not(:last-of-type) {
      @extend %br-1px
    }
    p{
      @extend %line-clamp-1;
      margin-top: 30px;
    }
    .price{
      margin-top: 30px;
    }
    width: 33%;
    padding: 34px;
    img{
      width: 100%;
      height: 100%;
    }
    a{
      display: flex;
      flex-direction: column;
    }
  }
</style>
