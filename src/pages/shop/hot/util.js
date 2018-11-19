import SearchInput from './SearchInput'
import SwiperBanner from './SwiperBanner'
import Categories from './Categories'
import Banner from './Banner'
import BannerTwo from './BannerTwo'
import Seckill from './Seckill'
import GoodsOne from './GoodsOne'
import GoodsTwo from './GoodsTwo'
import GoodsThree from './GoodsThree'
import NoMore from './NoMore'
import BottomNav from './BottomNav'

const leftId = mmlg.getQueryString('leftId')
import {$path} from "plugins/util"

const getComponents = () => {
  return {
    SearchInput, SwiperBanner, Categories, Banner, BannerTwo,
    Seckill, GoodsOne, GoodsTwo, GoodsThree, NoMore, BottomNav
  }
}

const createOpt = subjectType => {
  return {
    url: $path.newBasePath + 'page/getPageByleftIdAndSubjectType.do',
    params: {
      subjectType,
      leftId: leftId || 0
    }
  }
}

const getApi = () => {
  const api = {//组件对应的请求
    'SwiperBanner': createOpt('FIXED_BANNER'),
    'Categories': {
      url: $path.newBasePath + 'page/getMenuList.do'
    },
    'Seckill': createOpt('ACTIVITY_SECKILL'),
    'Banner': createOpt('BANNER'),
    'BannerTwo': createOpt('BANNER_TWO'),
    'GoodsOne': createOpt('GOODS_ONE'),
    'GoodsTwo': createOpt('GOODS_TWO'),
    'GoodsThree': createOpt('GOODS_TREEE'),
  };

  if (leftId) {
    api['Categories'] = {
      url: $path.goodsPath + 'shopping/getMenuRightList.do',
      params: {
        leftId
      }
    }
  }
  return api
}

const getLayout = () => {//前5个组件不用懒加载
  return axios.get($path.newBasePath + 'page/getSubject', {
    params: {
      leftId: leftId || 0
    }
  }).then(({data}) => {
    if (data.status !== 'success') return Promise.reject('系统繁忙')
    let layout = data.data
    layout = layout.map((item, i) => {
      item = item.replace('TREEE', 'THREE')
      item = item.replace('ACTIVITY_SECKILL', 'Seckill')
      item = item.toLowerCase()
      item = item.replace(/_[A-z]/, (str => {
        return str[1].toUpperCase()
      }))
      item = item[0].toUpperCase() + item.slice(1)
      let obj = {
        component: item
      }
      if (item.toLowerCase().startsWith('goods')) {
        obj.style = {
          'margin-bottom': mmlg.pxToVmin(20)
        }
      }
      if (i === layout.length - 1) {
        obj.style = {
          'margin-bottom': '0'
        }
      }
      return obj
    })
    layout = [{component: 'SearchInput'}, {component: 'SwiperBanner'}, {component: 'Categories'}]
      .concat(layout)
      .concat([{component: 'NoMore'}, {component: 'BottomNav'}])
    layout.forEach((item, i) => {
      if (i < 5) {
        item.notLazy = true
      }
    })
    return layout
  })
}

const bindLazyLoad = () => {
  function getOffsetTop(p) {//获取元素距离页面顶部的距离
    return p.getBoundingClientRect().top + window.pageYOffset
  }

  let timer;
  window.addEventListener('scroll', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      let lazyImg = document.querySelectorAll('[data-src]')
      lazyImg.forEach(item => {
        let dataSrc = item.getAttribute('data-src')
        if (!dataSrc) {
          item.removeAttribute('data-src')
        } else {
          if (getOffsetTop(item) < window.innerHeight + window.scrollY) {
            item.setAttribute('src', dataSrc)
            item.removeAttribute('data-src')
          }
        }
      })
    }, 300)
  })
}

const insertAfter = (newEl, targetEl) => {
  var parentEl = targetEl.parentNode;

  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl);
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling);
  }
}

import Entry from './Entry'
import Vue from 'vue'

const insertWalletEntry = () => {
  let cate = document.querySelector('.categories0'),
    entry = new Vue({
      render(h) {
        return h(Entry)
      }
    }).$mount().$el
  insertAfter(entry, cate)
}

import PopScreen from './PopScreen'
const popScreen = () => {
  document.body.appendChild(new Vue({
    render: h => h(PopScreen)
  }).$mount().$el)
}

export default {
  getComponents, getApi, getLayout, bindLazyLoad,
  insertWalletEntry, popScreen
}
