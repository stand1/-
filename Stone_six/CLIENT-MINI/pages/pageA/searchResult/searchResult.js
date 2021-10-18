import http from "../../../api/index"
import comm from "../../../api/comm"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    param: {
      text: '',
      pageNum: 1,
      pageSize: 10,
      searchArticleType: "ALL"
    },
    name: "",
    text: "",
    nav: [{
        name: "全部",
        id: "ALL"
      },
      {
        name: "贴子",
        id: "ARTICLE"
      },
      {
        name: "图片",
        id: "IMG"
      },
      {
        name: "视频",
        id: "VIDEO"
      },
      {
        name: "用户",
        id: "USER"
      },
      {
        name: "活动",
        id: "active"
      },
    ],
    paramsSize: 0,
    viewList: [],
  },
  goTabs(e) {
    console.log(e.currentTarget.dataset)
    let index = e.currentTarget.dataset.index.toUpperCase()
    this.data.nav.map(res => {
      if (index.indexOf(res.id) > -1) {
        this.data.param.searchArticleType = res.id
        this.setData({
          param: this.data.param,
          viewList: [],
          name: res.name,
          // text: res.id
        }, function () {
          this.list()
        })
      }
    })

  },
  changefn(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      paramsSize: 0,
      name: e.currentTarget.dataset.name,
      viewList: [],
      param: {
        text: this.data.text,
        pageNum: 1,
        pageSize: 10,
        searchArticleType: e.currentTarget.dataset.id
      },
    })
    this.list()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.param.text = options.key;
    this.list()
    this.setData({
      text: options.key
    })
  },
  goSearch() {
    console.log(1)
    wx.navigateTo({
      url: '/pages/search/index/searchList/searchList?key=' + this.data.text,
    })
  },
  clearfn() {
    wx.navigateTo({
      url: '/pages/search/index/searchList/searchList'
    })
  },
  goPre() {
    wx.navigateBack({
      delta: 1,
    })
  },

  goDet(e) {
    console.log(e.currentTarget.dataset)
    comm.jump(e.currentTarget.dataset.type, {
      id: e.currentTarget.dataset.id
    })
  },
  async list() {
    let res = await http.request("v1.0/newarticle/home/searchText", this.data.param, "GET")
    if (res.code == 200) {
      console.log(res)

      if (this.data.param.searchArticleType == 'ALL') {
        console.log(1)
        this.setData({
          viewList: res.data,
        })
        return;
      }
      if (res.data.records) {
        console.log(2)
        this.data.paramsSize = res.data.records ? res.data.records.length : 0
        this.setData({
          viewList: [...res.data.records, ...this.data.viewList],
        })
        console.log(this.data.viewList)
      }

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
    if (this.data.paramsSize < this.data.param.pageSize) {
      wx.showToast({
        title: '已经到底了'
      })
    } else {
      this.data.param.pageNum += 1
      this.list()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})