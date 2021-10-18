// pages/my/my.js
import API from '../../api/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      {id: 1, name: '我的报名', icon: 'https://redt.sixeco.com/polestar/jion.png'},
      {id: 2, name: '我的团队', icon: 'https://redt.sixeco.com/polestar/teamB.png'},
      {id: 3, name: '我要试驾', icon: 'https://redt.sixeco.com/polestar/car.png'},
    ],
    userInfo:{},
    ismyShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({userInfo:userInfo})
    if(userInfo.id!=null){
      if (userInfo.mobile!=null) {
        
      } else {
        this.setData({
          ismyShow: true
        })
      }
    }else{
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
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
  changeNav (e) {
    let num = e.currentTarget.dataset.id
    switch (num) {
      case 1:
        wx.navigateTo({
          url: '/pages/route/mySign/mySign',
        })
        break;
      case 2:
        wx.switchTab({
          url: '/pages/teams/teams'
        })
        break;
      case 3:
        wx.navigateToMiniProgram({
          appId: 'wx1731d1d47587e5ce',
          path: 'pages/testdrive/pages/index/index',
          success: res => {
            console.log(res)
          }
        })
        break;    
    }
  },
  getPhoneNumber (e) {
    let that = this
    let obj = {}
    wx.login({
      success: r => {
        obj.codePhone = r.code
        obj.encryptedDataPhone = e.detail.encryptedData
        obj.ivPhone = e.detail.iv
        obj.userId = that.data.userInfo.id
        API.post('newuser/user/phoneCode', obj).then(res => {
           if (res.code == 200) {
            let userData = that.data.userInfo
            userData.mobile = res.data.mobile
            wx.setStorageSync('userInfo', userData)
            this.setData({
              ismyShow: false
            })
           }
        })
      }
    })
  },
  changeEvents (e) {
    if (e.detail) {
      this.setData({
        ismyShow: false
      })
    }
  }
})