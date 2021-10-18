// pages/login/login.js
import API from '../../api/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pamer: {
      code: '',
      encryptedData: '',
      iv: '',
      encryptedDataPhone: '',
      ivPhone: ''
    },
    userInfo: {},
    isShow: 1,
    windowHeight: 0,
    screenHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        windowHeight: app.globalData.windowHeight,
        screenHeight: app.globalData.screenHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton({
      success: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  shangchuang () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        console.log(res)
        let _img
        _img = await API.uploadService(1, res.tempFilePaths[0], (res) => {
          console.log('res',res);
        })
      }
    })
  },
  go () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    let obj = this.data.pamer
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.login({
          success: r => {
            obj.code = r.code
            obj.encryptedData = res.encryptedData
            obj.iv = res.iv
            this.setData({
              userInfo: res.userInfo,
              pamer: obj
            })
            app.globalData.userInfo = res.userInfo
            app.globalData.pamer = obj
            API.post('newuser/user/loginForWechat', this.data.pamer).then(res => {
              if (res.code == 200) {
               wx.setStorageSync('userInfo', res.data)
               wx.switchTab({
                 url: '/pages/index/index',
               })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
           }).catch(err => {
            wx.showToast({
              title: err.msg,
              icon: 'none',
              duration: 2000,
              mask: true
            })
           })
          }
        })
      }
    })
  },
})