import * as utils from './util/index'
import {simpleExtend} from 'shared/util'

export default {
  install(Vue){
    simpleExtend(Vue.prototype, utils)
  }
}
