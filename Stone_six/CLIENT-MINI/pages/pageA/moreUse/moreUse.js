import http from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 0,
    isUserlist: [], //最近使用
    params: {
      pageNum: 1,
      pageSize: 10,
      userId:wx.getStorageInfoSync("useInfo").id
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isuserFN()
  },
  async isuserFN() {
    //最近使用
    let ob = {
      isUser: 1
    }
    let res = await http.get("v1.0/redt_b_material/material/getMaterialList", {
      ...ob,
      ...this.data.params
    })
    if (res.code == 200) {
      this.setData({
        size: res.data.records.length,
        isUserlist: [...res.data.records, ...this.data.isUserlist]
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
    if (this.data.size < this.data.params.pageSize) {
      wx.showToast({
        title: '已经到底了'
      })
      return
    }
    this.data.params.pageNum++
    this.isuserFN()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})