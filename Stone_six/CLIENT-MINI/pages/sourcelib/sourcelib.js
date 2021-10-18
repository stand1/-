// pages/moban/moban.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://hbimg.huabanimg.com/9abd8e7d768e6bb070de86c09671b73c81de118d43df2-xahAjO_fw658',
      'https://hbimg.huabanimg.com/9abd8e7d768e6bb070de86c09671b73c81de118d43df2-xahAjO_fw658',
      'https://hbimg.huabanimg.com/9abd8e7d768e6bb070de86c09671b73c81de118d43df2-xahAjO_fw658'
    ],
    swiperIdx: 0,

    searchValue:""
  },
  bindchange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  customMethod: function ()  {
    console.log("自定义组件按钮事件")
    // wx.navigateTo({
    //   url: '../sourcelib/sourcelib',
    // })
  }
})