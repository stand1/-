// pages/pageA/materialLibrary/materialLibrary.js
import API from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startBarHeight: wx.getStorageSync('statusBarHeight'),
    navHeight: wx.getStorageSync('navHeight'),
    types: 2,
    keys: '',
    navNum: 1,
    vehicleList: [],
    i: [0, 0],
    dataList: [],
    vehicleArr: [],
    arrIndex: 0,
    param: {
      carStyleId: "",
      isSort: "1", //1 最新 2 最热
      resourceId: "", //位置
      userId: wx.getStorageSync('useInfo').id,
      type: 1, //默认图片  1图 2 视频
      use: "1",
      pageNum: 1,
      pageSize: 10
    },
    index: [],
    size: 0,
    getMaterialList: [],
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.carId) {
      //车系下面的车型Id和车系下面的车型name
      this.data.param.carStyleId = options.carId
      this.data.param.carStyleName = options.carname

      this.setData({
        param: this.data.param
      })
    }

    wx.setStorageSync('tempTypes', options.from)
    this.getVehicleList()
    this.getMaterialListfn()
    this.searchfn()
  },
  bindPickerChange(e) {
    console.log(e.detail.value, "下标", e.currentTarget.dataset.typecode, "类型")
    let typecode = e.currentTarget.dataset.typecode
    let item = e.currentTarget.dataset.item
    let indexs = e.currentTarget.dataset.items
    console.log(item)
    this.data.index[indexs] = e.detail.value
    if (typecode == "MFT") {
      //文件类型
      this.data.param.type = item[e.detail.value].dictValue

    }
    if (typecode == "MU") {
      //用途类型
      this.data.param.use = item[e.detail.value].dictValue
    }
    if (typecode == "MS") {
      //排序类型
      this.data.param.isSort = item[e.detail.value].dictValue
    }
    this.data.param.pageNum = 1

    console.log(this.data.index)
    this.setData({
      //重置
      index: this.data.index,
      param: this.data.param,
      getMaterialList: []

    })
    this.getMaterialListfn()
    console.log(this.data.param)
  },
  //搜索条件
  async searchfn() {
    let res = await API.get("v1.0/redt_b_user/sysDict/getSysDictByModel?model=material")
    if (res.code == 200) {
      for (let i = 0; i < res.data.length; i++) {
        this.data.index.push(0)
      }
      this.setData({
        searchList: res.data,
        index:this.data.index
      })

      console.log(this.data.searchList, this.data.index)
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
    if (this.data.size < this.data.params.pageSize) {
      wx.showToast({
        title: '已经到底了'
      })
      return
    }
    this.data.params.pageNum++
    this.getMaterialListfn()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // back
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  changeNav(e) {
    this.setData({
      types: e.currentTarget.dataset.types
    });
  },
  changeNavNum(e) {
    this.setData({
      navNum: e.currentTarget.dataset.num
    });
  },
  // checkDetail () {
  //   wx.navigateTo({
  //     url: '/pages/templateDetail/fileList/fileList',
  //   })
  // },
  async getMaterialListfn() {
    //获取素材
    let res = await API.get("v1.0/redt_b_material/material/getMaterialList", this.data.param)
    console.log(res)
    if (res.code == 200) {

      this.setData({
        getMaterialList: [...this.data.getMaterialList, ...res.data.records],
        size: res.data.records.length
      })

    }
  },
  // 获取车系车型
  getVehicleList() {
    let pamer = {
      brandId: '3-155'
    }
    API.get('v1.0/redt_b_car/carConfig/getCarInfoStyle', pamer).then(res => {
      console.log(res.data)
      let arr1 = [],
        arr2 = [];
      let list = res.data;
      let obj = {}
      list.forEach((item, key) => {
        arr1.push(item.carName);
        item.carStyleList.forEach((x, i) => {
          arr2.push(x.carStyleName)
        })
      })
      this.setData({
        vehicleList: [arr1, arr2],
        dataList: list,
        vehicleArr: arr1
      }, () => {
        console.log(list[0].carStyleList[0])
      })
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'error',
        duration: 2000
      })
    })
  },
  changeModel(e) {
    console.log(e.detail.value)
  },
  changeVehicle(e) {
    let type = e.detail.column;
    let i = e.detail.value;
    if (type == 0) {
      let arr = [],
        arr1 = [],
        arr2 = [];
      arr.push(...this.data.dataList[i].carStyleList);
      arr.forEach((item, key) => {
        arr1.push(item.carStyleName)
      })
      arr2 = [this.data.vehicleArr, arr1]
      this.setData({
        vehicleList: arr2,
        arrIndex: i
      })
    } else if (type == 1) {
      this.setData({
        i: [this.data.arrIndex, i]
      })
    }
  }
})