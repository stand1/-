// pages/detail/teamDetail/teamDetail.js
const app = getApp();
import API from '../../../api/base'
import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    isDetail: true,
    isFooter: 1,
    datas: {},
    userInfo: {},
    teamId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: info,
      teamId: options.id
    })
    this.getDatas()
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
  changeShow () {
    let isShows = this.data.isShow
    this.setData({
      isShow: !isShows
    })
  },
  join (e) {
    let teamId = e.currentTarget.dataset.teamid
    console.log(e)
    wx.navigateTo({
      url: '/pages/route/join/join?id='+teamId,
    })
  },
  goMyTeam (e) {
    let userId = e.currentTarget.dataset.userid
    let teamId = e.currentTarget.dataset.teamid
    wx.navigateTo({
      url: '/pages/route/myTeam/myTeam?userId='+userId+'&teamId='+teamId,
    })
  },
  getDatas (id) {
    let pamer = {
      teamId: this.data.teamId,
      userId: this.data.userInfo.id
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/team/getById', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({datas: res.data || {}})
      }
    })
  },
  changeOut () {
    Dialog.confirm({
      message: '确认退出团队， 此操作无法撤销',
    }).then(() => {
      this.out()
    }).catch(()=>{})
  },
  out () {
    let pamer = {
      teamId: this.data.teamId,
      userId: this.data.userInfo.id,
      content: '',
      status: 3
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.post('v1.0/jx/teamParticipant/joinOrQuit', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  }
})