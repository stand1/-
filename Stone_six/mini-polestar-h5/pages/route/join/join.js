// pages/route/join/join.js
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keys: '',
    teamId: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: info,
      teamId: options.id
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
  changeKeys (e) {
    this.setData({keys: e.detail.value})
  },
  jionApply () {
    let pamer = {
      teamId: this.data.teamId,
      userId: this.data.userInfo.id,
      content: this.data.keys,
      status: 0
    }
    if (this.data.keys == '') {
      wx.showToast({
        title: '请输入申请宣言',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.post('v1.0/jx/teamParticipant/joinOrQuit', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
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
    })
  }
})