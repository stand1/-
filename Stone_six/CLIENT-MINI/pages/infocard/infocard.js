const LABEL_SOURCE = require("../infocard/label_flow_source.js");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      // mark图标，店铺经纬度
      iconPath: "/icons/usercenter/right@2x.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    labels:LABEL_SOURCE.labels,
    edit: false,
    region: ["选择省份城市"],
    // region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    // startBarHeight: wx.getStorageSync('statusBarHeight') || app.globalData.StatusBar,
    // navHeight:  wx.getStorageSync('navHeight')|| app.globalData.CustomBar,
    // wxMargin:0
    navHeight:0
  },
  nav(){
    wx.openLocation({
      latitude:36.0812917700,	//维度
      longitude: 114.4562530500, //经度
      name: "广丰",	//目的地定位名称
      scale: 14,	//缩放比例
      address: "xx省xy街道"	//导航详细地址
    })
  },
  edit: function(){
    this.setData({
      edit : true
    })
  },
  save: function(){
    this.cancel()
  },
  cancel: function(){
    this.setData({
      edit : false
    })
  },
  businesscard: function(){
    console.log(wx.getStorageSync('statusBarHeight') || app.globalData.StatusBar)
    console.log(wx.getStorageSync('navHeight')|| app.globalData.CustomBar)
    wx.navigateTo({
      url: '/pages/businesscard/businesscard',
    })
  },
  personalPhoto: function(){
    wx.navigateTo({
      url: '/pages/personnalPhotoLib/personnalPhotoLib',
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 标签点击监听
   */
  labelTap: function (e) {
    wx.showToast({
      icon: 'none',
      title: e.detail.dataset.item.name,
      duration: 1200
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      menuButtonInfo: wx.getMenuButtonBoundingClientRect()
    })
    console.log(this.data.menuButtonInfo)
    const { top, width, height, right } = this.data.menuButtonInfo
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res
        const margin = top - statusBarHeight
        
        this.setData({
          navHeight: (height + statusBarHeight + (margin * 2))*2,
          // searchMarginTop: statusBarHeight + margin,
          // searchHeight: height,
          // searchWidth: right - width
        })
      },
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

  }
})