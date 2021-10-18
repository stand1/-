// pages/phonebind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  getPhoneNumber (e) {
    let obj = app.globalData.pamer
    if(!obj.codePhone){
      wx.showModal({
        title: '请先授权登录',
      })
      return ;
    }
    wx.login({
      success: r => {
        obj.codePhone = r.code
        obj.encryptedDataPhone = e.detail.encryptedData
        obj.ivPhone = e.detail.iv
        app.globalData.pamer = obj
        API.post('newuser/user/loginForWechat', obj).then(res => {
           if (res.code == 200) {
            wx.setStorageSync('userInfo', res.data)
            wx.switchTab({
              url: '/pages/index/index',
            })
           }
        })
      }
    })
  }
})