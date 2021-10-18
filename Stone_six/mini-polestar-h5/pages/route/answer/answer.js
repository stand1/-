// pages/route/answer/answer.js
const app = getApp();
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    num: 1,
    answerList: [],
    types: 0,
    askedList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnswerType()
    this.getAnswerList()
    this.getAnswers()
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
  goAnswerDetails (e) {
    let str = e.currentTarget.dataset.str
    wx.navigateTo({
      url: '/pages/detail/answerDetails/answerDetails?str='+ str,
    })
  },
  goAnswer () {
    wx.navigateTo({
      url: '/pages/route/myQuestion/myQuestion',
    })
  },
  changeType (e) {
    let id = e.target.dataset.id
    this.setData({
      types: id
    })
    this.getAnswerList()
  },
  // 获取问题类型
  getAnswerType () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/question/type').then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({dataList: res.data})
      }
    })
  },
  // 获取问题列表
  getAnswerList () {
    let pamer = {
      type: this.data.types
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/question/list', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({answerList: res.data})
      }
    })
  },
  // 获取大家都在问
  getAnswers () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/question/asked').then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        res.data.forEach((item) => {
          item.createTime = this.formaDeta(item.createTime)
          switch (item.questionType) {
            case 0:
              item.typeName = '活动规则'
            break;
            case 1:
              item.typeName = '奖品及报销'
            break;
            case 2:
              item.typeName = '关于极星'
            break;
            case 3:
              item.typeName = '参赛协议'
            break;
          }
        })
        this.setData({
          askedList: res.data
        })
      }
    })
  },
  formaDeta (timers) {
    let t = new Date(timers.replace(/-/g, '/'))
    let m = t.getMonth() + 1,
        d = t.getDate();
        m > 10 ? m : (m = ('0' + m.toString())) 
        d > 10 ? d : (d = ('0' + d.toString()))  
    return m + '月' + d + '日'
  },
  getToken () {
    console.log(1111)
    API.get('newuser/user/getAccessToken').then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          accessToken: res.data
        })
      }
    })
  }
})