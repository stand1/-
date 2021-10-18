// pages/build/choseCar/choseCar.js
import Api from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTask: false,
    carList: [],
    options: [],
    sindex: 0,
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
    this.carListFn()
  },
  async carListFn() {
    //获取所有车品牌
    let res = await Api.get("v1.0/redt_b_car/carConfig/getCarByBrandId?brandId=3-155")
    // console.log(res)
    if (res.code == 200) {
      this.setData({
        carList: res.data
      })
    }
  },
  async openTask(e) {
    console.log()
    let id = e.currentTarget.dataset.id
    this.setData({
      carName: e.currentTarget.dataset.name
    })
    let res = await Api.get("v1.0/redt_b_car/carConfig/getCarTypeByCarId?carId=" + id)
    if (res.code == 200) {
      console.log(res.data)
      this.setData({
        isTask: true,
        options: res.data
      })
    }
  },
  chosefn(e) {
    this.setData({
      sindex: e.currentTarget.dataset.index
    })
  },
  noSure() {
    //取消 重置选择
    this.setData({
      isTask: false,
      sindex: 0
    })
  },
  sure() {
    //确认跳转
    console.log(this.data.options[this.data.sindex], this.data.type)
    wx.setStorageSync("carType",this.data.options[this.data.sindex])
    let url = ""
    switch (this.data.type) {
      case "article":
        //文章
        url = "/pages/publish/article/index"
        break;
      case "video":
        //视频
        url = "/pages/publish/video/index"
        break;
      case "img":
        //图片
        url = "/pages/publish/image/index"
        break;
      default:
        break;
    }
    if(url){
      wx.navigateTo({
        url: url,
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

  }
})