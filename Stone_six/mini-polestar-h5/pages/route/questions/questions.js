// pages/route/questions/questions.js
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionsArr: [],
    questionsIndex: 0,
    inputKeys: '',
    txtVal: '',
    dataList: [],
    types: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnswerType()
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
  bindQuestions (e) {
    this.setData({
      questionsIndex: e.detail.value,
      types: this.data.dataList[e.detail.value].type
    })
  },
  // 获取类型
  getAnswerType () {
    wx.showLoading({
      title: '加载中...',
    })
    API.get('v1.0/jx/question/type').then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        let arr = [];
        res.data.forEach((item) => {
          arr.push(item.name)
        })
        this.setData({
          dataList: res.data,
          questionsArr: arr
        })
      }
    })
  },
  changeTitle (e) {
    this.setData({inputKeys: e.detail.value})
  },
  changeTxt (e) {
    this.setData({txtVal: e.detail.value})
  },
  // 提交
  sub () {
    let userInfo = wx.getStorageSync('userInfo') || []
    if (this.data.types == -1) {
      wx.showToast({
        title: '请选择问题类型',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return
    }
    if (this.data.inputKeys == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return
    }
    if (this.data.txtVal == '') {
      wx.showToast({
        title: '请输入问题详情',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return
    }
    let pamer = {
      userId: userInfo.id,
      title: this.data.inputKeys,
      question: this.data.txtVal,
      questionType: this.data.types
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.post('v1.0/jx/question/add', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        wx.navigateTo({
          url: '/pages/route/myQuestion/myQuestion',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err.msg,
        icon: 'none',
        duration: 2000,
        mask: true
      })
    })
  },
  async checkQuestions (keys) {
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/msg_sec_check', //仅为示例，并非真实的接口地址
      data: {
        access_token: wx.getStorageSync('accessToken') || '',
        content: keys
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: await function (res) {
        console.log(res.data)
        return(res.data)
      }
    })
  }
})