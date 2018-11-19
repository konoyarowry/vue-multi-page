<template>
  <div class="dialog" @touchmove.prevent>
    <transition name="opacity">
      <div class="mask" v-if="isOpen"></div>
    </transition>
    <transition name="fade">
      <div class="box" v-if="isOpen">
        <div class="title">{{title}}</div>
        <div class="content" :style="{'white-space':noWrap?'nowrap':'inherit'}">{{content}}</div>
        <div class="buttons">
          <mu-button flat @click="cancel" class="cancel" v-if="mode==='confirm'">
            {{cancelLabel}}
          </mu-button>
          <mu-button flat @click="ok" class="ok">
            {{okLabel}}
          </mu-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Alert",
    data() {
      return {
        isOpen: false
      }
    },
    props: {
      title: {
        default: ''
      },
      content: {
        default: ''
      },
      okLabel: {
        default: '确认'
      },
      cancelLabel: {
        default: '取消'
      },
      mode: {
        default: 'alert'
      },
      noWrap: {
        default: false
      }
    },
    mounted() {
      this.isOpen = true
    },
    methods: {
      remove() {
        this.isOpen = false
        setTimeout(() => {
          this.$el.remove()
          this.$off()
          this.$destroy()
        }, 350)
      },
      ok() {
        this.$emit('ok')
        this.remove()
      },
      cancel() {
        this.$emit('cancel')
        this.remove()
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~css/commons";

  .mu-ripple {
    position: relative;
    width: 100%;
    height: 100%;
    @extend %br-1px;
    @extend .flex-aj-center;
  }

  .dialog {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @extend .flex-aj-center;
    z-index: 2019;
  }

  .box {
    width: 80%;
    background: #fff;
    z-index: 2020;
    border-radius: 14px;
    @extend .flex-aj-center;
    flex-direction: column;
  }

  .title {
    margin-top: 40px;
    font-size: 36px;
    font-weight: bold;
    color: #555;
  }

  .content {
    font-size: 30px;
    color: #777;
    margin-top: 30px;
    padding: 0 60px;
  }

  .buttons {
    @extend .flex-aj-center;
    height: 100px;
    width: 100%;
    margin-top: 50px;
    @extend %bt-1px;
    button {
      flex: 1;
      height: 100%;
      @extend .flex-aj-center;
      font-size: 34px;
      color: $lightFont
    }
    button:first-of-type {
      @extend %br-1px
    }
    .ok {
      color: $primary;
    }
  }
</style>
