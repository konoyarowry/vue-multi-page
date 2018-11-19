import {$path} from "plugins/util"
import wePay from 'shared/wechatPay'

// const qs = require('qs')

export const wechatPay = wePay

export const stopShare = () => {
  document.addEventListener('WeixinJSBridgeReady', function () {
    WeixinJSBridge.call('hideOptionMenu');
  })
}

export const getConfig = () => {
  return axios.get($path.wechatPath + 'mmt-wallet-wechat/wallet/wechat/api/getJsApiConfig.do', {
    params:{
      url:window.location.href
    }
  }).then(({data}) => {
    if (+data.status === 0) {
      wx.config({
        debug: false,
        appId: data.data.appId,
        timestamp: "" + data.data.timestamp,
        nonceStr: data.data.nonceStr,
        signature: data.data.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      });
    }
  })
}
/**
 * 
 * @param {{title,desc,link,imgUrl,success,cancel,spm,shareIndex}} option 
 */
export const setShare = option => {
  getConfig()
  const shareId = {
    pyq: 1,
    py: 2,
    qq: 3,
    txwb: 4,
    zone: 5
  }
  const share = function (option) {
    // 微信分享配置
    const title = option.title || '', // 分享标题
      desc = option.desc || '', // 分享描述
      link = option.link, // 分享链接
      imgUrl = option.imgUrl || '', // 图片URL
      success = option.success || function () {
      }, // 成功回调
      cancel = option.cancel || function () {
      } // 取消回调
    const spm = option.spm ? option.spm : ''
    const createSpm = function (shareId) {
      let spmStart = '',
        spmEnd = '',
        linkUrl = '';
      if (spm) {
        const index = option.shareIndex;
        const strArr = option.spm.split(',');
        for (let i = 0; i < strArr.length; i++) {
          if (i < index - 1) {
            spmStart += strArr[i] + ',';
          } else if (i >= index) {
            if (i === 8) {
              spmEnd += '1501,';
            } else {
              spmEnd += strArr[i] + ',';
            }
          }
        }
      }
      if (spmStart && spmEnd) {
        if (linkUrl.indexOf('?') !== -1) {
          linkUrl =
            link + '&spm=' + spmStart + shareId + ',' + spmEnd;
        } else {
          linkUrl =
            link + '?spm=' + spmStart + shareId + ',' + spmEnd;
        }
      } else {
        linkUrl = link;
      }
      return linkUrl;
    }
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: '【买买商城】' + desc,
      desc: desc,
      link: createSpm(shareId.pyq),
      imgUrl: imgUrl,
      success: success,
      cancel: cancel,
    })

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: createSpm(shareId.py),
      imgUrl: imgUrl,
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: success,
      cancel: cancel,
    })

    // 分享到QQ
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: createSpm(shareId.qq),
      imgUrl: imgUrl,
      success: success,
      cancel: cancel,
    })

    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: createSpm(shareId.txwb),
      imgUrl: imgUrl,
      success: success,
      cancel: cancel,
    })

    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: createSpm(shareId.zone),
      imgUrl: imgUrl,
      success: success,
      cancel: cancel,
    })
  }

  return new Promise(resolve=>{
    wx.ready(function () {
      share(option)
      resolve()
    })
  })

}
