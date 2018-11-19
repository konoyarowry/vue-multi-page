const UA = typeof window !== 'undefined' && navigator.userAgent.toLowerCase()

export const isDEV = process.env.NODE_ENV === 'development'
export const isWX = UA.indexOf('micromessenger') > -1 && UA.indexOf('wxwork') === -1 || isDEV
export const isWXDEV = UA.indexOf('micromessenger') > -1 && UA.indexOf('wechatdevtools') > -1
export const isAndroid = UA.indexOf('android') > -1
export const isIOS = /iphone|ipad|ipod|ios/.test(UA)
export const isSIT = location.href.indexOf('/sit/') > -1
export const isQYWX = UA.indexOf('micromessenger') > -1 && UA.indexOf('wxwork') > -1
export const isAndroidApp = UA.indexOf('wallet_android') > -1
export const isiOSApp = UA.indexOf('wallet_ios') > -1
export const isApp = typeof mobile !== 'undefined' || isiOSApp || isAndroidApp

let theOrigin;
if (isWX) {
  if (isAndroid) {
    theOrigin = 2
  } else if (isIOS) {
    theOrigin = 8
  }
} else {
  if (isAndroidApp) {
    theOrigin = 3
  } else if (isiOSApp) {
    theOrigin = 4
  } else if (isIOS) {
    theOrigin = 7
  } else if (isAndroid) {
    theOrigin = 6
  } else {
    theOrigin = 5
  }
}

export const origin = theOrigin
