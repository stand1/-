// pages/route/myQuestion/myQuestion.js
import API from '../../../api/base'
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: 0,
    dataList: []
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
  goQuestions () {
    wx.navigateTo({
      url: '/pages/route/questions/questions',
    })
  },
  getDataList () {
    let userInfo = wx.getStorageSync('userInfo') || []
    
    let pamer = {
      userId: userInfo.id
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/question/my', pamer).then(res => {
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
        let num = null;
        if (res.data.length == 0) {
          num = 2
        } else {
          num = 1
        }
        this.setData({
          dataList: res.data,
          isShow: num
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
  goAnswerDetails (e) {
    let str = e.currentTarget.dataset.str
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/detail/answerDetails/answerDetails?str='+ str +'&title=' + title,
    })
  }
})