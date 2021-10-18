// pages/route/myTeam/myTeam.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCaptain: true,
    showCaptain: false,
    userId: '',
    teamId: '',
    datas: {},
    userInfo: {},
    navNum: 1,
    imgList: [],
    userImgList: [],
    worksImgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: info,
      userId: options.userId,
      teamId: options.teamId
    })
    this.getUserData()
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
  changeCaptain () {
    Dialog.confirm({
      message: '请将队长转移后再退出团队，此操作无法撤销',
      confirmButtonText: '转移队长'
    }).then(() => {
      this.setData({showCaptain: true})
    }).catch(()=>{})
  },
  kickTeam () {
    Dialog.confirm({
      message: '确认将其踢出团队',
    }).then(() => {
      this.kickTeamFuc()
    }).catch(()=>{})
  },
  onClickHide () {(
    this.setData({showCaptain: false})
  )},
  changeTeam () {
    console.log(1111111)
  },
  getUserData () {
    let pamer = {
      userId: this.data.userId,
      yourId: this.data.userInfo.id,
      teamId: this.data.teamId
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/resume/getByUserId', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        let str = res.data.mobile.substr(0,3)+'****'+res.data.mobile.substr(7)
        let email = res.data.resume.email.substr(0,2)+'****'+res.data.resume.email.substr(6)
        res.data.resume.email = email
        res.data.mobile = str
        this.setData({
          datas: res.data || {},
          userImgList: res.data.resume.imgResumeUrls,
          worksImgList: res.data.userWorks[0].imgUrls,
          imgList: res.data.resume.imgResumeUrls
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
  },
  changeNum (e) {
    let that = this
    let num = e.currentTarget.dataset.num
    this.setData({navNum: num})
    if (num == 1) {
      that.setData({imgList: that.data.userImgList})
    } else {
      that.setData({imgList: that.data.worksImgList})
    }
  },
  kickTeamFuc () {
    let pamer = {
      yourId: this.data.userInfo.id,
      userId: this.data.datas.id,
      status: 5,
      teamId:this.data.teamId
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.post('v1.0/jx/teamParticipant/audit', pamer).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '踢出成功',
          icon: 'none',
          duration: 2000,
          mask: true
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
  }
})