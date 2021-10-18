// pages/route/mySign/mySign.js
const app = getApp();
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamList: [],
    ismyShow: 2,
    navNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({userInfo: info})
    this.getMySign(info.id)
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
  changeNum (e) {
    this.setData({
      navNum: e.target.dataset.num
    })
    this.getMySign()
  },
  getMySign () {
    let pamer = {
      userId: this.data.userInfo.id,
      personalType: this.data.navNum
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/teamParticipant/mySign', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({teamList: res.data || []})
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },
  goBaoming(){
    wx.redirectTo({
      url: '/pages/route/joinInfo/joinInfo',
    })
  }
})