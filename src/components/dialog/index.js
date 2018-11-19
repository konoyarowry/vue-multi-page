import Vue from 'vue'
import Dialog from './Dialog'

const payLoad = {};
let instance,constructor = Vue.extend(Dialog);
['alert', 'confirm'].forEach(mode => {
  payLoad[mode] = ({title, content, okLabel, cancelLabel, noWrap}) => {
    return new Promise(resolve => {
      if(instance){
        instance.remove()
      }
      instance = new constructor({
        propsData:{
          title, content, okLabel, cancelLabel,mode,noWrap
        }
      })
      instance.$on('ok',()=>{
        resolve(true)
      })
      instance.$on('cancel',()=>{
        resolve(false)
      })
      instance.$mount()
      document.body.appendChild(instance.$el)
    })
  }
})
/**
 * @typedef  {{title:string, content:string, okLabel:string, cancelLabel:string,noWrap:boolean}} options 
 * @typedef {Promise.<boolean>} result 
 */

 /**
  * 
  * @param {options} options 
  * @returns {result}
  */
export const alert = (options)=>{
  return payLoad.alert(options)
}
 /**
  * 
  * @param {options} options 
  * @returns {result}
  */
export const confirm = (options)=>{
  return payLoad.confirm(options)
}
