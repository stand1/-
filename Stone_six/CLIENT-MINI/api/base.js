let jumbtn = false //防止多次跳转
// const API_HOST = "https://test.rhealane.com/api/";
// const API_HOST = "https://redtb.sixeco.com/api/"; //正式
const API_HOST = "https://redtb-test.sixeco.com/api/";//测试
let carName ='material/'+ new Date().getTime() + ".png"; //图片
// const API_HOST = "http://192.168.31.34:9001/api/"; //刘月本地
const API = {}
let times;
API.getHost = function () {
  return API_HOST;
}
API.request = function (url, data = {}, method = "GET", args = {
  token: true,
  isPull: false
}, header) {

  return new Promise(function (resolve, reject) {
    wx.showNavigationBarLoading();
    wx.request({
      url: API_HOST + url,
      data: data,
      method: method,
      header: {
        'content-type': header || 'application/x-www-form-urlencoded',
        "Cookie": 'token=' + wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else if (res.data.code == 401) {
          //跳到登录

          if (times) {
            clearTimeout(times)
            times = null
          }
          times = setTimeout(() => {
            wx.switchTab({
              url: '/pages/usercenter/usercenter',
            })
            
          }, 500)



        } else {
          wx.showToast({
            title: "请求数据失败",
            duration: 1500
          });
          console.log(res.data.message);
          reject(res.data);
        }
        wx.hideNavigationBarLoading()
      },
      fail: function (err) {
        wx.hideNavigationBarLoading();
        console.log(err);
        wx.showToast({
          title: err ? err.errMsg : '服务错误',
        })
        reject(err);
      }
    })
  });
}

API.get = function (url, data = {}, args = {
  token: false
}) {
  return API.request(url, data, "GET", args);
}

API.post = function (url, data, args = {
  token: true
}) {
  return API.request(url, data, "POST", args);
}

API.getUser = function () {
  if (Auth.check()) {
    return Auth.user();
  } else {
    return false;
  }
}

API.logout = function () {
  getApp().globalData.userInfo = null;
  wx.removeStorageSync('user');
  wx.removeStorageSync('token');
}

API.getUserInfo = function () {
  return new Promise(function (resolve, reject) {
    API.get('v1.0/newuser/user/getUser').then(res => {
      console.log('res', res);
      // API.storageUser(res);
      // resolve(res.user);
    }, err => {
      reject(err);
    });
  })
}

API.getUploadKey = async function () {
    let option = await API.get('v1.0/newarticle/common/sign');
    if (option.code == 200) {
      return option.data;
    } else {
      return null
    }
  },
  API.getMinioKey=async function(){
 
    let option = await API.get('v1.0/redt_b_user/file/stsSignForpPost?key='+carName);
    if (option.code == 200) {
      return option.data;
    } else {
      return null
    }
  }
  API.uploadFile = async function (file) {
    var OSSOption = await API.getMinioKey();
    if (!OSSOption) {
      console.log('获取签名失败');
      return
    }
   console.log('OSSOption', OSSOption);
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        url: "http://oss.sixeco.com/redt-b",
        filePath: file,
        name: 'file',
        formData:{
          ...OSSOption
        },
        success: function (result) {
          //  console.log("返回路径：" + result.data)
          // let res = JSON.parse(result.data)
          console.log(result,"上传成功")
          // if (res.code == 200) {
            let imgsrc = "https://oss.sixeco.com/redt-b/" +carName
          //   //    let arr =[]
          //   let abc = imgsrc + res.data.fileName[0]
              console.log(imgsrc)
            resolve(imgsrc);
          // }
        }
      })
    })

  }
API.uploadService = async function (type, file, Fun) {
  var OSSOption = await API.getUploadKey();
  if (!OSSOption) {
    console.log('获取签名失败');
    return
  }
  console.log('OSSOption', OSSOption);
  let fileName = "";
  if (type * 1 == 1) { //1=img;   2=str;   3=video
    fileName = new Date().getTime() + ".png";
  } else if (type * 1 == 2) {
    // if(this.$route.query&&this.$route.query.contentUrl){   //编辑
    //   filename = this.$route.query.contentUrl.split(OSSOption.dir + "/")[1];
    // }
    fileName = new Date().getTime() + ".html";
    // _file = new Buffer(file);
  } else {
    fileName = new Date().getTime() + ".mp4";
  }
  if (type * 1 == 2) {
    return new Promise(function (resolve, reject) {
      let param = {
        content: file,
        url: OSSOption.host,
        key: OSSOption.dir + "/" + fileName,
        OSSAccessKeyId: OSSOption.accessid,
        policy: OSSOption.policy,
        Signature: OSSOption.signature,
        success_action_status: 200
      }
      API.uploadStr(param).then(res => {
          // console.log('res',res);
          resolve(res.data);
        })
        .catch(e => {
          console.log('err', e);
          reject(null);
        })
    })
  } else {
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        url: OSSOption.host,
        filePath: file,
        name: 'file',
        formData: {
          key: OSSOption.dir + "/" + fileName, //存储在oss的文件路径
          policy: OSSOption.policy,
          OSSAccessKeyId: OSSOption.accessid,
          Signature: OSSOption.signature,
          // callback: OSSOption.callback,
          // success_action_status: '200'
        },
        success: function (res) {
          if (res.statusCode == 204) {
            var fileUrl = OSSOption.host + "/" + OSSOption.dir + "/" + fileName;
            console.log('图片地址：', fileUrl);
            if (Fun) {
              Fun(fileUrl);
            }
            resolve(fileUrl);
          } else {
            console.log("上传失败！");
            reject(null);
          }
        },
        fail: function (err) {
          console.log(err)
          reject(null);
        }
      })
    })
  }
}

API.getOSSStr = function (url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        'content-type': "multipart/form-data",
        "Cookie": 'token=' + wx.getStorageSync('token')
      },
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
},
module.exports = API