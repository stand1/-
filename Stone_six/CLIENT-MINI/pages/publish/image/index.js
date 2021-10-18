// pages/publish/image/index.js
import API from "../../../api/index"
import Util from "../../../utils/util"
import http from "../../../api/index"
Page({
  data: {
    isapp: false,
    imgList: [
      // 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1597216792980redt_e300.JPG',
    ],
    maxLength: 6,
    tribeName: "",
    textContent: "",
    titleLength: 0,
    params: {},
    Appobj: {},
    userId:wx.getStorageInfoSync("useInfo").id
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },

  closefn() {
    this.setData({
      isapp: false
    })
  },
  chosefn(e) {
    //应用
    console.log(e.detail)
    this.setData({
      Appobj: e.detail
    })
    this.data.params.appId = e.detail.id
  },
  openApp() {
    this.setData({
      isapp: true
    })
  },

  chooseImage() {
    wx.setStorageSync('maxNum', 6 - this.data.imgList.length);
    console.log(wx.getStorageSync('carType'))
    let car = wx.getStorageSync('carType')
    wx.navigateTo({ //把车系带过去 
      url: '/pages/pageA/materialLibrary/materialLibrary?carId=' + car.id + "&carname=" + car.name,
    })
  },
  removeImg(e) {
    let i = e.currentTarget.dataset.idx;
    // let arr = this.data.imgList.splice(i,1);
    this.data.imgList.splice(i, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  imgPreview(e) {
    let src = e.currentTarget.dataset.item;
    wx.previewImage({
      current: src,
      urls: this.data.imgList
    })
  },

  textNumInput(e) {
    console.log('eee', e);
    let text = e.detail.value;
    if (this.data.titleLength > 100) {
      // wx.showToast({
      //   title: '最多只能输入100个字',
      //   icon: 'none',
      //   duration: 2000
      // })
      text = text.slice(0, 100);
    }
    this.setData({
      textContent: text,
      titleLength: text.length
    })
  },

  async publish() {
    if (this.data.imgList.length < 1) {
      return wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
    }
    if (!this.data.textContent) {
      return wx.showToast({
        title: '内容不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    if(!this.data.Appobj.id){
      return wx.showToast({
        title: '请选择关联应用！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading();
    let imgDom = '',
      y;
    let text = `<p>${this.data.textContent}<p>`
    console.log('this.data.imgList', this.data.imgList);
    let res = await http.post("v1.0/redt_b_material/post/post", {
      userId:wx.getStorageSync("useInfo").id || 'sale_3',
      carStyleId:wx.getStorageSync("carType") && wx.getStorageSync("carType").id,
      imgUrl:this.data.imgList[0],
      url:this.data.imgList.toString(),
      type:1,//1图片,2视频,3文章
      appId:this.data.Appobj.id,
      introduction:this.data.textContent,
    })
    console.log(res)
    if (res.code == 200) {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
      })
    }
  },
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    console.log('json----',json) //为传过来的值
    if (json) {
      // this.data.imgList = {
      //   ...this.data.imgList,
      //   ...json.url
      // }
      this.data.imgList = [
        ...this.data.imgList,
        ...json.url
      ]
      this.setData({
        imgList: this.data.imgList
      })
    }
    console.log(this.data.imgList, "onshow")
  },
  onShareAppMessage: function () {

  }
})