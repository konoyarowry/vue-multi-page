export const getOffsetTop = (p) => {//获取元素距离页面顶部的距离
  return p.getBoundingClientRect().top + window.pageYOffset
}
