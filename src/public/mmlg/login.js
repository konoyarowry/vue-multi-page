import loginPromise from 'shared/login'
import {isApp} from './env'
import {$path} from "plugins/util"

let loginPms;
export const autoLogin = ()=>{
  if(!loginPms){
    loginPms = loginPromise()
  }
  return loginPms
}

// 调起登录
export const invokeLogin = function (url) {
  if (isApp) {
    location.href = 'wallet://gotoView?viewName=3';
  } else {
    location.href = $path.projectPath+'login/main.html?params=' + encodeURIComponent(JSON.stringify({
      redirectUrl: url || location.href
    }))
  }
}

export const loginMixin = {
  data(){
    return {
      token:'',
      userId:'',
      mobile:''
    }
  },
  methods:{
    $setLoginInfo(){
      this.userId = Cookie.get('userId')
      this.mobile = Cookie.get('mobile')
    }
  }
}

