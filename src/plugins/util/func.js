import {isArray} from "shared/util"
import {$path} from "./env";

// 遍历vm对象的data,避免重复写 {xxx:this.xxx}
export const $mapData = function (params) {
  if (!isArray(params)) {
    params = [params]
  }
  const obj = {}
  params.forEach(v => {
    obj[v] = this[v]
  })
  return obj
}

// 用于事件代理,如选择ul元素下的所有li
export const $select = function (e, tag, cb) {
  let target = e.target;
  while (target.nodeName.toLowerCase() !== tag && target.nodeName.toLowerCase() !== 'body') {
    target = target.parentNode
  }
  if (target.nodeName.toLowerCase() === tag) {
    cb && cb(target)
  }
}

export const $loc = function (url) {
  location.href = url
}

export const $back = function () {
  if(document.referrer){
    history.back()
  }else{
    location.href = $path.homePage
  }
}
