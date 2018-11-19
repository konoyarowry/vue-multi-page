import {formatDate as format} from 'public/mmlg';

export function mobile(value) {
  return value.slice(0, 3) + '****' + value.slice(-4)
}

export const formatDate = (value,fmt = 'yyyy-MM-dd hh:mm:ss')=>{
  if(!value)return value
  return format(value,fmt)
}
