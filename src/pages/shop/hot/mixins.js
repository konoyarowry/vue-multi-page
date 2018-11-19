export default {
  methods: {
    getUrlLink: function (item,field = 'imgLink') {
      let url = '';
      if(item[field]){
        url = item[field]
      }else {
        if (item.goodsId) {
          switch (item.goodsType) {
            case 0: {
              // 普通商品
              url = 'goodsDetails.html?spuId=' + item.spuId + '&skuId=' + item.goodsId;
              break;
            }

            case 1:
            case 2:
              var supplyNum;
              if (item.skuName.indexOf("联通") > -1) {
                supplyNum = 1
              } else if (item.skuName.indexOf("移动") > -1) {
                supplyNum = 2
              } else if (item.skuName.indexOf("电信") > -1) {
                supplyNum = 3
              }
            {
              // 话费充值 流量充值
              url = '../virtualGoods/phone.html?spuId=' + item.spuId + '&skuId=' + item.goodsId + '&supplyNum=' + supplyNum;
              break;
            }

            case 3: {
              // Q币充值
              url = '../virtualGoods/qq.html?spuId=' + item.spuId + '&skuId=' + item.goodsId;
              break;
            }

            case 4: {
              // Q币充值
              url = '../virtualGoods/member.html?spuId=' + item.spuId + '&skuId=' + item.goodsId;
              break;
            }

            default: {
              // 普通商品
              url = 'goodsDetails.html?spuId=' + item.spuId + '&skuId=' + item.goodsId;
              break;
            }
          }
        } else {
          url = 'javascript:;';
        }
      }

      return url;
    },
    goodsTwoIsLast(list, index) {
      const length = list.length
      if(length%2===0){
        if (index === length - 1 || index === length - 2) {
          return true
        }
      }else{
        if (index === length - 1) {
          return true
        }
      }
      return false
    }
  }
}
