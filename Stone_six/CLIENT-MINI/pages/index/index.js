// pages/index/index.js
import http from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getStorageSync('statusBarHeight'),
    isCard: false,
    swiperHeight: 200,
    bannerList: [],
    carTypeList: [],
    size: 0,
    params: {
      pageNum: 1,
      pageSize: 10,
      userId:wx.getStorageSync("useInfo").id//wx.getStorageSync("useInfo").id
    },
    isUserlist: [], //最近使用
    isNewlist: [] //最新
  },

  onLoad: function (options) {
    this.bannerFn()
    this.carTypeFn()
    this.isuserFN(1)
    this.isuserFN(2)
  },
  onReady: function () {

  },
  //3d看车
  goWatch(e){
    console.log()
    wx.navigateTo({
      url: '/pages/Home/3Dwatch/3Dwatch?id='+e.currentTarget.dataset.id+"&carname="+e.currentTarget.dataset.carname,
    })
  },
  async isuserFN(num) {
    //最近使用
    let ob = {}
    if (num == 1) {
      ob = {
        isUser: 1
      }
    } else {
      //最新
      ob = {
        isNew: 1
      }
    }
    let res = await http.get("v1.0/redt_b_material/material/getMaterialList", {
      ...ob,
      ...this.data.params
    })
    console.log(res)
    if (res.code == 200) {
      if (num == 1) {
        this.setData({
          isUserlist: res.data.records
        })
      } else {
        this.setData({
          size: res.data.records.length,
          isNewlist: [...res.data.records, ...this.data.isNewlist]
        })
      }
    }
  },
  async carTypeFn() {
    let res = await http.get("v1.0/redt_b_car/carConfig/getCarByBrandId", {
      brandId: '3-155'
    })
    console.log(res)
    if (res.code == 200) {
      this.setData({
        carTypeList: res.data
      })
    }
  },
  async bannerFn() {
    let res = await http.get("v1.0/redt_b_material/banner/getBanner", {
      dictValue: 6
    })
    console.log(res)
    if (res.code == 200) {
      this.setData({
        bannerList: res.data
      })
    }
  },
  goAct(e) {
    //banner跳转viewWeb
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '/pages/pageA/viewWeb/viewWeb?url=' + e.currentTarget.dataset.url,
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onHide: function () {},
  classfn(e) {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      // console.log(  this.getTabBar())
      this.getTabBar().setData({
        isShow: true
      })
    }
    this.setData({
      isCard: false
    })
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/index/searchList',
    })
  },
  moreGo() {
    wx.navigateTo({
      url: '/pages/pageA/moreUse/moreUse',
    })
  },
  openView() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(this.getTabBar())
      this.getTabBar().setData({
        isShow: false
      })
    }
    this.setData({
      isCard: true
    })
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    if (this.data.size < this.data.params.pageSize) {
      wx.showToast({
        title: '已经到底了'
      })
      return
    }
    this.data.params.pageNum++
    this.isuserFN(2)
  },
  onShareAppMessage: function () {

  }
})