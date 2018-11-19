import Vue from 'vue'
import '@/main'
import './hot.scss'
import util from './util'
const leftId = mmlg.getQueryString('leftId')
import loginPromise from 'shared/login'
loginPromise()

const enterPageTime = mmlg.formatDate()

window.addEventListener('pagehide', () => {
  mmlg.reportEvent('浏览商城', '02GW_LLSCY', {
    enterPageTime,
    leavePageTime: mmlg.formatDate()
  })
})

const components = util.getComponents();
const api = util.getApi();

(async function () {
  let layout = await util.getLayout()
  let vmData = (function () {// 需要请求数据的组件
    let componentSet = new Set(layout.map(i => {
      return i.component
    }))
    let vmData = {}
    for (let i in api) {
      if (componentSet.has(i)) {
        vmData[i] = undefined
      }
    }
    return vmData
  })()

  new Vue({
    data() {
      return vmData
    },
    mounted() {
      util.bindLazyLoad()
      if(!leftId){//首页leftId为0
        util.insertWalletEntry()
        util.popScreen()
      }
    },
    created() {
      for (let i in vmData) {
        axios.get(api[i].url, {
          params: api[i].params
        }).then(({data}) => {
          if (data.status === 'success') {
            if (i === 'Categories') {//Categories数据结构与其他不同
              this[i] = [{
                mallPageSubjectRelationResponse: data.data
              }]
            } else {
              this[i] = data.data[0] && data.data[0].mallPageSubjectResponse
            }
          }
        })
      }
    },
    render(h) {
      const order = {//单种组件内的顺序,如第一个Banner,第二个Banner...用来匹配数据数组的索引

      }, childComponents = [];
      layout.forEach(item => {
        const {style, component, notLazy} = item
        if (typeof order[component] === 'undefined') {
          order[component] = 0
        } else {
          order[component]++
        }

        childComponents.push(h(components[component], {
          style, props: {
            list: this[component] && this[component][order[component]] && this[component][order[component]].mallPageSubjectRelationResponse,
            title: this[component] && this[component][order[component]] && this[component][order[component]].subjectName,
            order: order[component],
            notLazy, enterPageTime
          }
        }))

      })
      return h('div', {
        staticClass: 'hot'
      }, childComponents);
    },
    el: '#app'
  })

})()
