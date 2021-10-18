// pages/activity/activity.js
const app = getApp();
import API from '../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navNum: -1,
    navList: [
      {id: -1, name: '全部活动'},
      {id: 0, name: '预告中'},
      {id: 1, name: '进行中'},
      {id: 2, name: '已结束'}
    ],
    dataList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList()
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
  changeActivityNum (e) {
    this.setData({
      navNum: e.currentTarget.dataset.num
    })
    this.getDataList()
  },
  getDataList () {
    let pamer = {
      pageSize: 100,
      pageNum: 1,
      status: this.data.navNum
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/activity/page', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({dataList: res.data.records || []})
      }
    })
  }
})