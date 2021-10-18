//app.js
import API from './api/index'
App({
  onLaunch: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let pamer = {
          code: res.code
        }
        API.get('newuser/user/checkOpenId', pamer).then(data => {
          // this.globalData.logining = false;
          wx.hideLoading()
          if (data.code == 200) {
            wx.setStorageSync('userInfo', data.data)
          } else {
            // wx.reLaunch({
            //   url: '/pages/login/login',
            // })
          }
        })
        // API.get('newuser/user/getOpenId', pamer).then(res => {
        //   console.log(res)
        //   wx.hideLoading()
        //   if (res.code == 200) {
        //     wx.setStorageSync('userInfo', data.data)
        //   }
        // })
      }
    })
    
    wx.getSystemInfo({
      success: res => {
          this.globalData.systemInfo = res
          this.globalData.windowHeight = res.windowHeight /(res.windowWidth /750)
          this.globalData.screenHeight = res.screenHeight /(res.screenWidth /750)
      }
  })
  },
  globalData: {
    userInfo: null,
    phoneNum:null,
    StatusBar:null,
    CustomBar:null,
    teamsList: [],
    activityList: [],
    questions:[],
    systemInfo: null,
    windowHeight: null, // rpx换算px后的窗口高度
    screenHeight: null, // rpx换算px后的屏幕高度
    pamer:null,
    logining: true,
  },
  checkLogin(){
    let userInfo = wx.getStorageSync('userInfo')
    if(!userInfo.avatar){
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }else if(!userInfo.phone){
      wx.reLaunch({
        url: '/pages/phonebind/phonebind',
      })
    }
  }
})