import Vue from 'vue'
import {currency} from './currency'
import {mobile,formatDate} from './func'

Vue.filter('currency', currency)
Vue.filter('mobile', mobile)
Vue.filter('formatDate', formatDate)
