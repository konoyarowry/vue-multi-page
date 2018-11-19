<template>
  <div class="goods-two" v-if="list">
    <div class="row-title" v-if="title">
      {{title}}
    </div>
    <div class="wrapper">
      <div class="item" v-for="(item,index) in list" :key="index" :class="{'no-bb':goodsTwoIsLast(list,index)}">
        <a :href="getUrlLink(item)">
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
    name: "GoodsTwo",
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

  .no-bb{
    &::after{
      display: none;
    }
  }

  .goods-two {
    background: #fff;
  }
  .wrapper{
    display: flex;
    flex-wrap: wrap;
  }
  .item{

    @extend %bb-1px;
    a{
      padding: 40px;
      display: inline-block;
      width: 100%;
      height: 100%;
      @extend %br-1px;
      .top{
        margin-bottom: 40px;
        @extend .flex-aj-center;
        position: relative;
      }
    }
    p{
      font-size: 26px;
      @extend %line-clamp-2
    }
    width: 50%;
    img{
      width: 200px;
      height: 200px;
    }
  }
</style>
