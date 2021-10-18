const app = getApp()
import http from "../../api/index"
Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },

  data: {
    navHeight: wx.getStorageSync('navHeight'),
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    phoneNum: null,
    hasPhoneNum: false,
    avatarUrl: null,
    userName:null,
    nickName: null,
    introduce: null,
    isLogin: false,
    titles: '个人中心',
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
       isShow:false
      })
    }
  },

  // 获取手机号信息
  getPhoneNum: function (e) {
    var self = this
    console.log(e)

    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let encryptedData = e.detail.encryptedData
      let iv = e.detail.iv
      //重新登录
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code)
            //发起网络请求
            http.post("v1.0/redt_b_user/salesUser/loginForWechat", {
              code: res.code,
              encryptedData: encryptedData,
              iv: iv
            }).then(res => {
              console.log(res)
              if (res.code == 200) {
                console.log('登录成功！')
                wx.setStorageSync('token', res.data.wxToken)
                wx.setStorageSync("useInfo",res.data)
                // wx.setStorageSync('iv', e.detail.iv)
                app.globalData.phoneNum = "用户手机号：" + res.data.userMobile
                self.setData({
                  phoneNum: "用户手机号：" + res.data.userMobile,
                  hasPhoneNum: true,
                  nickName: res.data.nickName,
                  avatarUrl: res.data.userAvatar,
                  introduce: res.data.introducation,
                  isLogin: true
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   encryptedData: e.detail.encryptedData,
    //   iv: e.detail.iv
    // })

    // },
  },
  // 更改设置点击事件
  setting(event) {
    console.log(event.currentTarget.dataset.methodtype)
    var methodtype = event.currentTarget.dataset.methodtype
    if (methodtype == 5) {
      // 我的创作
      wx.navigateTo({
        url: '/pages/mycreat/mycreat',
      })
    } else if (methodtype == 6) {
      // 我的素材
      wx.navigateTo({
        url: '/pages/mysource/mysource',
      })
    } else if (methodtype == 8) {
      // 资料卡片
      wx.navigateTo({
        url: '/pages/infocard/infocard',
      })
    }
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('useInfo')
    console.log(userInfo)
    if (userInfo) {
      // 获取个人信息
      let res = http.get("v1.0/redt_b_user/salesUser/getSaleUserInfo", {
        userId:userInfo.id || 'sale_1260030565533921282',
      })
      console.log(res)
      if (res.code == 200) {
        this.setData({
          isLogin: true
          // noramalData:res.data.records,
        })
      }else{
        console.log('获取用户信息失败 ' + res.errMsg + res.code)
        console.log(res.code)
        isLogin: false
      }
    }
  },
})