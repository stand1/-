// pages/detail/activityDetail/activityDetails.js
const app = getApp();
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.getDetails()
    }else{
      this.setData({
        id: 1
      })
      this.getDetails()
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
    return {
      path: '/pages/detail/activityDetail/activityDetails?id='+this.data.id
    }
  },
  getDetails () {
    let pamer = {
      id: this.data.id
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/activity/getById', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({datas: res.data || {}})
      }
    })
  }
})