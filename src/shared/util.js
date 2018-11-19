import {isWXDEV, isSIT, isDEV} from 'public/mmlg'

export const simpleExtend = (tar, src) => {
  for (let i in src) {
    if (tar[i]) throw `'${i}' already existed`
    tar[i] = src[i]
  }
}

export const isArray = (params) => {
  return Object.prototype.toString.call(params) === "[object Array]"
}

export const print = (txt)=>{
  if(isDEV || isSIT || isWXDEV){
    console.error(txt)
  }
}
