// pages/Home/3Dwatch/3Dwatch.js
import http from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleStr: "雷凌",
    cindex: 0,
    watList: [
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png",
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png",
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png",
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png",
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png",
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png",
      // "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1586847700180redt_e300.png"
    ],
    id: "",
    carObj: {},
    taglist: [],
    carList: [],
    carTypeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(77788999, options)
    if (options.id) {
      this.setData({
        id: options.id,
        titleStr: options.carname
      })
      // console.log(options)
      this.list()
      this.carTypeFn()
    }
  },
  //通过车系获取车型

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //头部列表
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
  //头部方法
  PickerChange(e) {
    console.log()
    this.setData({
      id: e.detail.carId,
      titleStr: e.detail.carName
    },()=>{
      this.list()
    })
  },
  bindPickerChange(e) {
    this.setData({

      carObj: this.data.carList[e.detail.value]
    }, () => {
      this.getMaterialTagLocaltionFn()
    })
  },
  async list() {
    let res = await http.get("v1.0/redt_b_car/carConfig/getCarTypeByCarId", {
      carId: this.data.id
    })
    console.log(res)
    if (res.code == 200) {
      this.setData({
        carList: res.data,

      }, () => {
        this.setData({
          carObj: this.data.carList[0]
        }, () => {
          this.getMaterialTagLocaltionFn()
        })
      })
    }
  },
  //tag选项卡
  async getMaterialTagLocaltionFn() {
    //  //this.data.carObj.id
    console.log('this.data.carObj--',this.data.carObj,this.data.carObj.id)
    let res = await http.get("v1.0/redt_b_material/material/getMaterialTagLocaltion", {
      // carStyleId: this.data.carObj.id
      carId:this.data.id,
    })
    if (res.code == 200) {
      this.setData({
        taglist: res.data
      }, () => {
        this.getMaterialFn()
      })
    }
  },
  //choseTag
  choseTag(e) {
    this.setData({
      cindex: e.currentTarget.dataset.index
    }, () => {
      this.getMaterialFn()
    })
  },
  //3D看车页素材列表
  async getMaterialFn() {
    //this.data.carObj.id
    let res = await http.get("v1.0/redt_b_material/material/getMaterial", {
      // carStyleId: this.data.carObj.id,
      carId:this.data.id,
      resourceId: this.data.taglist[this.data.cindex].resourceId
    })
    console.log(res)
    if (res.code == 200) {
      this.setData({
        watList: res.data
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(123)

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

  }
})