// pages/teams/teams.js
import API from '../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navNum: 1,
    userInfo: {},
    teamList: [],
    myTeamList: [],
    myTeams: [],
    isData: false,
    competitionList: [],
    pageNum: 1,
    pageSize: 20,
    isGetCompetiList: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({userInfo: info})
    this.getTeamList(info.id)
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
    if (this.data.navNum != 3) return
    if (!this.data.isGetCompetiList) return
    let pageNum = this.data.pageNum
    pageNum+=1
    this.setData({pageNum: pageNum})
    this.getCompetitionList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeNum (e) {
    this.setData({
      navNum: e.target.dataset.num
    })
    if (e.target.dataset.num == 1) {
      this.getTeamList(this.data.userInfo.id)
    } else if (e.target.dataset.num == 2) {
      this.getMyTeamList()
    } else {
      this.setData({
        pageNum: 1,
        competitionList: []
      })
      this.getCompetitionList()
    }
  },
  getTeamList (id) {
    let pamer = {
      userId: id
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/team/allTeamPage', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({teamList: res.data.records || []})
        if (res.data.records.length == 0) {
          this.setData({isData: true})
        } else {
          this.setData({isData: false})
        }
      }
    })
  },
  getMyTeamList () {
    let pamer = {
      userId: this.data.userInfo.id
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/team/my', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        if (!res.data.isCaptain) {
          this.setData({
            myTeams: res.data.applyingTeams || [],
            teamList: []
          })
          if (res.data.applyingTeams.length == 0) {
            this.setData({isData: true})
          } else {
            this.setData({isData: false})
          }
        } else {
          this.setData({
            teamList: res.data.applyingUsers || [],
            myTeams: res.data.applyingTeams || []
          })
          if (res.data.applyingTeams.length == 0 && res.data.applyingUsers.length == 0) {
            this.setData({isData: true})
          } else {
            this.setData({isData: false})
          }
        }
      }
    })
  },
  changeJoin (e) {
    if (e.detail) {
      this.getMyTeamList()
    }
  },
  getCompetitionList () {
    let that = this
    let pamer = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/resume/player', pamer).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        if (res.data.records.length < 20) {
          this.setData({isGetCompetiList: false, isData: false})
        } else {
          this.setData({isGetCompetiList: true, isData: false})
        }
        res.data.records.forEach((item) => {
          item.isShow = false
          item.createTime = that.formaDeta(item.createdTime)
          item.nickName = item.nickName.substring(0,8)
        })
        let arr = []
        if (this.data.pageNum == 1) {
          arr = []
        } else {
          arr = this.data.competitionList
        }
        arr.push(...res.data.records)
        this.setData({competitionList: arr})
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
  formaDeta (timers) {
    let t = new Date(timers.replace(/-/g, '/'))
    let m = t.getMonth() + 1,
        d = t.getDate(),
        hour = t.getHours(),
        minute = t.getMinutes(),
        second = t.getSeconds();
        m > 9 ? m : (m = ('0' + m.toString()))
        d > 9 ? d : (d = ('0' + d.toString()))
        hour > 9 ? hour : (hour = ('0' + hour.toString()))
        minute > 9 ? minute : (minute = ('0' + minute.toString()))
        second > 9 ? second : (second = ('0' + second.toString()))
    return m + '月' + d + '日' + ' ' + hour + ':' + minute
  },
  changeShow (e) {
    let i = e.currentTarget.dataset.num
    let show = !this.data.competitionList[i].isShow
    let dataList = this.data.competitionList
    dataList[i].isShow = show
    this.setData({competitionList: dataList})
  },
  goUser (e) {
    let userId = e.currentTarget.dataset.id
    let teamId = e.currentTarget.dataset.teamid
    wx.navigateTo({
      url: '/pages/route/myTeam/myTeam?userId='+userId+'&teamId='+teamId,
    })
  }
})