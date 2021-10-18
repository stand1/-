// pages/Home/imgWatch/imgWatch.js
import http from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size:'',
    params:{
      pageNum:1,
      pageSize:10,
      templateId:''
    },
    Morelist:[],
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)
if(options.templateId){
  this.data.params.templateId=options.templateId
  this.setData({
    params:this.data.params,
    title:options.title
  })
  this.list()
}
  },
 async list(){
   let res = await http.get("v1.0/redt_b_material/material/getMaterialDetail",this.data.params)
   if(res.code==200){
     this.setData({
      size:res.data.records.length,
      Morelist:[...this.data.Morelist,...res.data.records]
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
    this.list()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})