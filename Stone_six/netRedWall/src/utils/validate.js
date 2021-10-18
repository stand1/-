/**
 * Created by huaki on 16/12/18.
 */

 
/* 删除对象中空的参数 */
export function deleteEmptyParams(obj) {
  let newObj = JSON.parse(JSON.stringify(obj));
  for(var key in newObj){
    if(newObj[key] === ''){
      delete newObj[key]
    }
  }
  return newObj;
}

/* 手机号 */
export function isMobile(num) {
  var mobileReg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return  mobileReg.test(num)
}

export function isvalidUsername(str) {
  const reg =  /^[a-zA-Z0-9_-]{5,20}$/
  return reg.test(str.trim())
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
