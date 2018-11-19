<template>
  <div class="seckill" v-if="list">
    <div class="left">
      <div class="seckill-header">
        <p>特惠秒杀</p>
        <div class="countdown">
          <span>{{countdown[0]}}</span>：<span>{{countdown[1]}}</span>：<span>{{countdown[2]}}</span>
        </div>
      </div>
      <a href="javascript:" @click="jump(0,$path.projectPath+'shop/msList.html')">
        <img :src="$path.imgsPath+list[0].goodsImageUrl+suffix" alt="">
        <div class="price">
          <div class="current">¥<span>{{list[0].expenses.seckillPrice}}</span></div>
          <div class="origin">¥<span>{{list[0].expenses.activityPrice}}</span></div>
        </div>
        <span class="monthPay">
          月供¥{{list[0].monthPay.toFixed(2)}}起
        </span>
      </a>
    </div>
    <div class="right">
      <div class="top">
        <a href="javascript:" @click="jump(1,list[1].relationUrl)">
          <img :src="$path.imgsPath+list[1].activityImageUrl+suffix" alt="">
        </a>
      </div>
      <div class="bottom">
        <a href="javascript:" @click="jump(2,list[2].relationUrl)">
          <img :src="$path.imgsPath+list[2].activityImageUrl+suffix" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import createTimer from 'shared/tools/timer'

  export default {
    name: "Seckill",
    data() {
      return {
        countdown: ['00', '00', '00'],
        suffix:'?x-oss-process=image/resize,w_200'
      }
    },
    props: ['list', 'title','enterPageTime'],
    methods:{
      jump(index,url){
        if(index===0){
          mmlg.reportEvent('点击特惠秒杀','02GW_SC_THMSZQ',{
            enterPageTime:this.enterPageTime
          })
          location.href = url
        }else if(index===1){
          mmlg.reportEvent('点击新人专区','02GW_SC_XRZQ',{
            enterPageTime:this.enterPageTime
          })
          location.href = url
        }else{
          mmlg.reportEvent('点击特定商品专区','02GW_SC_TDSPZQ',{
            enterPageTime:this.enterPageTime
          })
          location.href = url
        }
      }
    },
    watch:{
      list(){
        const {timer, first} = createTimer(+new Date(this.list[0].todayEndTime[0]))
        this.countdown = first
        timer.$on('update', e => {
          this.countdown = e
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~css/commons";

  .seckill {
    background: #fff;
    display: flex;
    margin-bottom: 20px;
  }

  .right {
    display: flex;
    flex-direction: column;
    img{
      width: 100%;
    }
    .top{
      @extend %bb-1px
    }
  }

  .left {
    width: 46.7%;
    padding-bottom: $rowPad;
    .seckill-header {
      padding: $rowPad 0;
      @extend .flex-aj-center;
      p {
        font-size: 32px;
        font-weight: bold;
        font-style: italic;
      }
    }
    .countdown {
      display: flex;
      margin-left: $rowPad;
      span {
        background: #212121;
        color: #fefefe;
        padding: 2px;
        border-radius: 4px;
      }
    }
    @extend %br-1px;
    img {
      width: 210px;
      height: 210px;
    }
    a {
      @extend .flex-aj-center;
      flex-direction: column;
    }
    .price {
      margin: $rowPad 0 10px 0;
      @extend .flex-aj-center;
      .current {
        color: $primary;
        span {
          font-size: 28px;
        }
      }
      .origin {
        font-size: 24px;
        margin-left: 10px;
        color: $lightFont;
        text-decoration: line-through;
      }
    }
  }

  .right {
    flex: 1;
  }
</style>
