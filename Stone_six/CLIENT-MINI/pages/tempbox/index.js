// pages/temp/index.js
import API from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getStorageSync('statusBarHeight'),
    list: ['最新', '推荐', '新车上市', '往期活动', '服务政策'],
    i: 1,
    navTempList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTempList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
  // 切换导航
  changeNav (e) {
    this.setData({
      i: e.currentTarget.dataset.index
    })
  },
  goSearch () {
    wx.navigateTo({
      url: '/pages/search/index/searchList',
    })
  },
  goUrls () {
    wx.navigateTo({
      // url: '/pages/list/list',
      url: '/pages/templateDetail/addTemp/addTemp',
    })
  },
  // 获取模板
  getTempList () {
    API.get('v1.0/redt_b_material/template/templateTypes').then((res) => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          navTempList: res.data
        })
      }
    }).catch((e) => {
      wx.showToast({
        title: e.msg,
        icon: none,
        duration: 2000
      })
    })
  },
})