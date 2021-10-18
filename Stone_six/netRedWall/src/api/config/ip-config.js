'use strict'

let apiURL = 'https://test.thewe.fun/'; // 通用接口

let loc = ''
if (typeof window != "undefined") {
  loc = window.location.hostname || window.location.protocol
}
if (process.env.NODE_ENV === 'development' || loc == "file:" || loc == "localhost") {
  // 开发服务器
  apiURL = ""
} else {
  //正式
  apiURL = `${window.location.protocol}//${window.location.hostname}`;
}

module.exports = {
  apiURL: apiURL,
}
