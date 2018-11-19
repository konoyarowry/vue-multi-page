import {isSIT} from "public/mmlg/env"

import * as env from "public/mmlg/env"

let somePath;

if (process.env.NODE_ENV === 'development' || isSIT) {
  somePath = {
    basePath: 'null',
    newBasePath: 'null',
    newInterface: 'null',
    promotionPath: 'null',
    imgsPath: 'null',
    base: 'null',
    loginPath: 'null',
    goodsPath: 'null',
    newPath: 'null',
    userPath: 'null',
    oldPath: 'null',
    walletPath: 'null',
    homePage: 'null',
    projectPath: 'null',
    vuePath: 'null',
    wechatPath: 'null'
  }
} else {
  somePath = {
    basePath: 'null',
    newBasePath: 'null',
    newInterface: 'null',
    promotionPath: 'null',
    imgsPath: 'null',
    base: 'null',
    loginPath: 'null',
    goodsPath: 'null',
    newPath: 'null',
    userPath: 'null',
    oldPath: 'null',
    walletPath: 'null',
    homePage: 'null',
    projectPath: 'null',
    vuePath: 'null',
    wechatPath: 'null'
  }
}

export const $path = somePath;

export const $env = env
