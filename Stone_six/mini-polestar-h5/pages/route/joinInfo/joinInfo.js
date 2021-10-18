// pages/route/joinInfo/joinInfo.js
import API from '../../../api/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    types: 1,
    isNav: 1,
    infoName: '',
    infoPhone: '',
    infoEmail: '',
    infoWeChat: '',
    InfoImg: '',
    InfoImgList: [],
    infoResume: '',
    infoCity: '',
    worksName: '',
    worksDetails: '',
    worksImg: '',
    worksImgList: [],
    typeIndex: 0,
    typeArr: ['HMI','智能出行','智能座舱'],
    typeArrObj: [
      {id: 0, name: 'HMI'},
      {id: 1, name: '智能出行'},
      {id: 2, name: '智能座舱'}
    ],
    workType: null,
    teamName: '',
    teamInfoImg: '',
    teamIntroduce: '',
    projectIntroduce: '',
    teamImg: '',
    teamImgList: [
      //'https://redt.sixeco.com/polestar/202106/964j6rtF.png'
    ],
    showExamine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({types: options.type || 1})
    }
    let info = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: info,
      infoName: info.nickName,
      infoPhone: info.mobile
    })
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
  changeNav (e) {
    this.setData({isNav:e.target.dataset.nav})
  },
  changeTypes (e) {
    let id = this.data.typeArrObj[e.detail.value].id
    this.setData({
      typeIndex: e.detail.value,
      workType: id
    })
  },
  uploadUser () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        let imgFile  = res.tempFilePaths[0]
        let imgurl = await API.uploadFile(imgFile)
        that.setData({teamInfoImg: imgurl})
      }
    })
  },
  uploadInfoImg () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        let imgFile  = res.tempFilePaths[0]
        let imgurl = await API.uploadFile(imgFile)
        let arr = that.data.InfoImgList
        arr.push(imgurl)
        that.setData({
          InfoImg: imgurl,
          InfoImgList: arr
        })
      }
    })
  },
  uploadTeamImg () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        let imgFile  = res.tempFilePaths[0]
        let imgurl = await API.uploadFile(imgFile)
        let arr = that.data.teamImgList
        arr.push(imgurl)
        that.setData({
          teamImg: imgurl,
          teamImgList: arr
        })
      }
    })
  },
  uploadWorksImg () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        let imgFile  = res.tempFilePaths[0]
        let imgurl = await API.uploadFile(imgFile)
        let arr = that.data.worksImgList
        arr.push(imgurl)
        that.setData({
          worksImg: imgurl,
          worksImgList: arr
        })
      }
    })
  },
  changeInfoName (e) {
    this.setData({infoName: e.detail.value})
  },
  changeInfoPhone (e) {
    this.setData({infoPhone: e.detail.value})
  },
  changeInfoEmail (e) {
    this.setData({infoEmail: e.detail.value})
  },
  changeInfoWx (e) {
    this.setData({infoWeChat: e.detail.value})
  },
  changeInfoCity (e) {
    this.setData({infoCity: e.detail.value})
  },
  changeInfoResume (e) {
    this.setData({infoResume: e.detail.value})
  },
  changeTeamName (e) {
    this.setData({teamName: e.detail.value})
  },
  changeTeamIntroduce (e) {
    this.setData({teamIntroduce: e.detail.value})
  },
  changeProjectIntroduce (e) {
    this.setData({projectIntroduce: e.detail.value})
  },
  changeWorksName (e) {
    this.setData({worksName: e.detail.value})
  },
  changeWorksDetails (e) {
    this.setData({worksDetails: e.detail.value})
  },
  save () {
    let that = this
    let pamer = {
      userId: that.data.userInfo.id,
      name: that.data.infoName,
      phone: that.data.infoPhone,
      email: that.data.infoEmail,
      wx: that.data.infoWeChat,
      city: that.data.infoCity,
      resumeDescription: that.data.infoResume,
      // imgResumeUrl: that.data.InfoImg,
      imgResumeUrl: that.data.InfoImgList,
      annexResumeUrl: '',
      workType: that.data.workType==null?-1:that.data.workType,
      workName: that.data.worksName,
      workContent: that.data.worksDetails,
      // imgUrl: that.data.worksImg,
      imgUrl: that.data.worksImgList,
      annexUrl: '',
      isPersonal: that.data.types
    }
    if (that.data.types == 0) {
      pamer.avatar = that.data.teamInfoImg
      pamer.teamName = that.data.teamName
      pamer.description  = that.data.teamIntroduce
      pamer.projectDesc = that.data.projectIntroduce
      pamer.imgTeamUrl = that.data.teamImgList
    }
    API.post('v1.0/jx/team/create', pamer).then(res => {
      if (res.code == 200) { 
        this.setData({showExamine: true})
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
  onTeamClickHide () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  delInfoImg (e) {
    let i = e.currentTarget.dataset.index
    let arr = this.data.InfoImgList
    arr.splice(i,1)
    this.setData({InfoImgList: arr})
  },
  delInfoImg (e) {
    let i = e.currentTarget.dataset.index
    let arr = this.data.InfoImgList
    arr.splice(i,1)
    this.setData({InfoImgList: arr})
  },
  delTeamImg (e) {
    let i = e.currentTarget.dataset.index
    let arr = this.data.teamImgList
    arr.splice(i,1)
    this.setData({teamImgList: arr})
  },
  delWorksImg (e) {
    let i = e.currentTarget.dataset.index
    let arr = this.data.worksImgList
    arr.splice(i,1)
    this.setData({worksImgList: arr})
  }
})