<template>
  <div class="search-input">
    <a href="../shop/category.html" class="cate-tag">
      <img src="~img/hot/classify.png" alt="">
    </a>
    <div class="input" @click="$loc('../shop/searchInput.html')">
      <img src="~img/hot/search.png" alt="">
      <span>请输入你感兴趣的商品</span>
    </div>
    <a href="wallet://gotoView?viewName=9" class="msg" v-if="$env.isApp">
      <img src="~img/hot/message.png" alt="">
      <span v-if="messageNum">{{messageNum}}</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "SearchInput",
    data(){
      return {
        messageNum:0
      }
    },
    created(){
      if(mmlg.isApp){
        // axios.get(this.$path.basePath + 'msg/getNotReadMessage.do').then(({data})=>{
        //   if(+data.status===0){
        //     this.messageNum = data.dataCount;
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~css/commons";
  .search-input {
    background: #fff;
    display: flex;
    padding: 20px 0;
  }
  .input{
    @extend .flex-aj-center;
    justify-content: flex-start;
    background: #e8e8e8;
    flex: 1;
    border-radius: 100px;
    margin-right: 20px;
    display: flex;
    span{
      color: #999;
    }
  }
  img{
    height: 70px;
  }
  .msg{
    position: relative;
    padding-right: 20px;
    @extend .flex-aj-center;
    img{
      height: 42px;
    }
    span{
      position: absolute;
      width: 30px;
      height: 30px;
      @extend .flex-aj-center;
      top: 0;
      right: 4px;
      background: $primary;
      color: #fff;
      border-radius: 50%;
    }
  }
</style>
