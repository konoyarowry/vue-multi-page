import Hot from './hot'
import Vue from 'vue'

new Vue({
  el: '#app',
  render(h) {
    return h(Hot)
  }
})
