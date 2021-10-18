// pages/templateDetail/addTemp/addTemp.js
import API from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      {url:"https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602468869068redt_e300.png",name:"活动海报",types:1},
      {url:"https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602468858524redt_e300.png",name:"营销 H5",types:4},
      {url:"https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602468839051redt_e300.png",name:"个人名片",types:2},
      {url:"https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602468818526redt_e300.png",name:"门店名片",types:3},
      {url:"https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602468777105redt_e300.png",name:"优惠劵",types:5}
    ]
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
  goUrl (e) {
    let str = this.data.imgList[e.currentTarget.dataset.i].name;
    let i = this.data.imgList[e.currentTarget.dataset.i].types;
    if (i == 1 || i == 2) {
      wx.navigateTo({
        url: '/pages/templateDetail/tempType/tempType?str=' + str + "&types=" + i,
     })
    } else {
      wx.showToast({
        title: '暂未开放，敬请期待',
        icon: 'none',
        duration: 2000
      })
    }
    // switch (e.currentTarget.dataset.i) {
    //   case 0:
    //     wx.navigateTo({
    //       url: '/pages/templateDetail/tempType/tempType?str=' + str,
    //     })
    //     break;
    // }
  },
  backs () {
    wx.navigateBack({
      delta: 1,
    })
  }
})