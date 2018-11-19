import Vue from 'vue'
import Meta from 'vue-meta'
import '@/filters'
import commons from '@/plugins/commons'
import '@/public'
import axios from 'axios'

mmlg.setUtmFields()

axios.defaults.withCredentials = true

Promise.prototype.finally = function (callback) {
  return this.then(
    value => this.constructor.resolve(callback()).then(() => value),
    reason => this.constructor.resolve(callback()).then(() => {
      throw reason
    })
  )
}

Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(commons)

//样式和ui库
import 'css/reset.scss'
import 'muse-ui/lib/styles/base.less'
import {
  Button,
  Icon,
  Snackbar,
  Dialog,
  BottomSheet,
  TextField,
  Helpers,
  LoadMore,
  BottomNav
} from 'muse-ui'
import theme from 'muse-ui/lib/theme';

theme.add('mmt', {
  primary: '#fe6900'
}, 'light');
theme.use('mmt')
import 'css/commons.scss'


//全局变量声明在webpack.base.conf.js的ProvidePlugin里
Vue.use(Button)
Vue.use(Icon)
Vue.use(Snackbar)
Vue.use(Dialog)
Vue.use(BottomSheet)
Vue.use(TextField)
Vue.use(Helpers)
Vue.use(LoadMore)
Vue.use(BottomNav)

import 'muse-ui-message/dist/muse-ui-message.css'
import Toast from 'muse-ui-toast'
import Message from 'muse-ui-message'

Vue.use(Toast)
Vue.use(Message)
