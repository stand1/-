// pages/index/index.js
const app = getApp();
import API from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    userList: [],
    teamList: [],
    showAgreement: false,
    showTeam: false,
    userInfo: {},
    isShow: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: info
    })
    this.getUserList()
    this.getBannerList()
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
  toAnswer () {
    wx.navigateTo({
      // url: '/pages/route/answer/answer',
      url: '/pages/route/newAnswer/newAnswer',
    })
  },
  drive () {
    wx.navigateToMiniProgram({
      appId: 'wx1731d1d47587e5ce',
      path: 'pages/testdrive/pages/index/index',
      success: res => {
        console.log(res)
      }
    })
  },
  goJoin () {
    let userInfo = wx.getStorageSync('userInfo') || {}
    if(userInfo.id!=null){
      if (userInfo.mobile!=null) {
        this.setData({
          showAgreement: true
        })
      } else {
        this.setData({
          isShow: true
        })
      }
    }else{
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    return
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        let imgFile  = res.tempFilePaths[0]
        let a = await API.uploadFile(imgFile)
        console.log(a)
      }
    })
  },
  getPhoneNumber (e) {
    let that = this
    let obj = {}
    wx.login({
      success: r => {
        obj.codePhone = r.code
        obj.encryptedDataPhone = e.detail.encryptedData
        obj.ivPhone = e.detail.iv
        obj.userId = that.data.userInfo.id
        API.post('newuser/user/phoneCode', obj).then(res => {
           if (res.code == 200) {
            let userData = that.data.userInfo
            userData.mobile = res.data.mobile
            wx.setStorageSync('userInfo', userData)
            this.setData({
              isShow: false,
              showAgreement: true
            })
           }
        })
      }
    })
  },
  onClickHide () {
    this.setData({showAgreement: false})
  },
  onTeamClickHide () {
    this.setData({showTeam: false})
  },
  changeTeam () {
    this.setData({
      showAgreement: false,
      showTeam: true
    })
  },
  goJoinUrl (e) {
    let type = e.currentTarget.dataset.type
    this.setData({showTeam: false})
    wx.navigateTo({
      url: '/pages/route/joinInfo/joinInfo?type='+type,
    })
  },
  getUserList () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/tutor/list').then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({userList: res.data || []})
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
  getBannerList () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    API.get('v1.0/jx/banner/list').then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({swiperList: res.data || []})
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
  goTests (e) {
    let i = e.currentTarget.dataset.index
    switch (i) {
      case 0:
        wx.navigateTo({
          url: '/pages/route/imgDetail/imgDetail?i='+i,
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/route/test/test',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/route/imgDetail/imgDetail?i='+i,
        })
        break;
    }
  },
  changeEvents (e) {
    if (e.detail) {
      this.setData({
        isShow: false,
        showAgreement: true
      })
    }
  }
})