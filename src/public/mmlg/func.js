import {isWX, isApp} from './env'

export * from 'components/dialog'

export const isArray = function (p) {
  return Object.prototype.toString.call([p]) === '[object Array]'
}

// 获取url上的query参数
export const getQueryString = function (name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

// 格式化日期
export const formatDate = function (date = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
}

// px转化为vmin
export const pxToVmin = (px) => {
  const base = Math.min(window.innerWidth, window.innerHeight) * window.devicePixelRatio
  return (parseInt(px) * 100 / base).toFixed(3) + 'vmin'
}

export const divideGroup = (list, num, cb) => {
  let obj = [], res = []
  list.forEach(item => {
    cb && cb(item)
    if (obj.length < num) {
      obj.push(item)
    }
    if (obj.length >= num) {
      res.push(obj)
      obj = []
    }
  })

  if (obj.length) {
    res.push(obj)
  }
  return res
}


export const getTimer = (beginTime, endTime, cb) => {
  let diff = (endTime - beginTime) || 0
  diff = Math.floor(diff / 1000)

  const timer = setInterval(() => {
    diff -= 1
    if (diff < 0) {
      return clearInterval(timer)
    }
    cb && cb(format(diff))
  }, 1000)
  return {
    first: format(diff),
    timer: timer
  }

  function pad(num) {
    num = String(num)
    if (num.length < 2) {
      return '0' + num
    }
    return num
  }

  function format(second) {
    let hours = parseInt(second / 60 / 60)
    let minutes = parseInt((second - hours * 60 * 60) / 60)
    second = parseInt(second - hours * 60 * 60 - minutes * 60)
    return [pad(hours), pad(minutes), pad(second)]
  }
}
