// components/tabHeader/tabHeader.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleStr: {
      type: String,
      value: ""
    },
    isShow: {
      type: Boolean,
      value: false
    },
    carTypeList: {
      //3d看车车型列表 ，误删
      type: Object,
      value: []
    },
    isdown: {
      type: Boolean,
      value: false
    },
    // 返回键是否显示，默认显示 
    backIsShow: {
      type: Boolean,
      value: true
    },
    // 导航栏背景色 
    transparent: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    startBarHeight: wx.getStorageSync('statusBarHeight') || app.globalData.StatusBar,
    navHeight: wx.getStorageSync('navHeight') || app.globalData.CustomBar,
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // console.log(wx.getStorageSync('navHeight')|| app.globalData.CustomBar)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    // 在组件实例进入页面节点树时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      let pages = getCurrentPages();
      if (pages.length == 1) {
        wx.switchTab({
          url: '/pages/index/index'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    },
    goHome() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    bindPickerChange(e) {
      console.log( this.data.carTypeList[e.detail.value])
      this.triggerEvent("PickerChange",this.data.carTypeList[e.detail.value])
    }
  },

})