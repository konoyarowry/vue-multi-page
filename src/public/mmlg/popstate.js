// 是否可滚动
function canScroll(element) {
  let currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
    const overflowY = window.getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {//循环寻找有scroll属性的父级元素
      return currentNode
    }
    currentNode = currentNode.parentNode;
  }
  return false;
}

let startY, scrollDom;
/** .mu-overlay点击时浏览器返回
 *  禁止.mu-bottom-sheet滚动,内有可滚动元素时则允许滚动
 */
export const popstate = () => {
  return {
    open(vm, options = {isOpen: true}) {
      for (let i in options) {
        vm[i] = options[i]
      }
      vm.$nextTick(() => {
        const overlay = document.querySelector('.mu-overlay')
        const sheet = document.querySelector('.mu-bottom-sheet')
        overlay && overlay.addEventListener('click', () => {
          history.back()
        })
        sheet && sheet.addEventListener('touchstart', e => {//放行可以点击和可以滚动的元素,其余阻止touchstart事件
          scrollDom = canScroll(e.target)
          if (!scrollDom) {
            return
          }
          startY = e.touches[0].clientY
        })
        sheet && sheet.addEventListener('touchmove', e => {
          if (!scrollDom) return e.preventDefault()
          let endY = e.touches[0].clientY, down = endY >= startY
          if (down && scrollDom.scrollTop === 0) {
            e.preventDefault()
          }else if (!down && scrollDom.scrollTop >= scrollDom.scrollHeight - scrollDom.clientHeight) {
            e.preventDefault()
          }
        })

      })
      history.pushState({
        isOpen:true
      }, 'isOpen')
    },
    onHistoryBack(vm, options = {isOpen: false}) {
      window.addEventListener('popstate', e => {
        if (!e.state || !e.state['isOpen']) {
          for (let i in options) {
            vm[i] = options[i]
          }
        }
      })
    },
    back(vm, options = {isOpen: false}) {
      for (let i in options) {
        vm[i] = options[i]
      }
      history.back()
    }
  }
}
