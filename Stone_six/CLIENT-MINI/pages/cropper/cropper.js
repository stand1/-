// pages/cropper/cropper.js
import WeCropper from '../../plugins/we-cropper/we-cropper.js';
import API from "../../api/index";
const config = getApp().globalData.config;
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight;
const heights = wx.getStorageSync('statusBarHeight');
const navHeight = wx.getStorageSync('navHeight');
Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width: (device.windowWidth)*2,  // 画布宽度
      height: (device.windowWidth)*1.5, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 1, // 缩放系数
      cut: {   //w291   h408
        x: (width - 291) / 2,
        y: (height - 408) / 2,
        width: 291,
        height: 408
      },
      boundStyle: {
        color: config.getThemeColor(),
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    },
    from: 'temp'
  },

  onLoad: function (options) {
    console.log('width',device.windowWidth);
    console.log(options.from)
    this.setData({
      from: options.from
    })
    const { cropperOpt } = this.data;
    if(options.from=='article'){
      cropperOpt.cut = {   //w291   h408
        x: (width - 300) / 2,
        y: (height - 224) / 2,
        width: 300,
        height: 224
      }
    }
    // if(options.src){
      cropperOpt.src = options.src || "http://tmp/wx879cd90aacd0da37.o6zAJs7OOPgD2X9OCT1floGqmlNw.WLw41zzXBzCMf49a9e3982a1b5c8b843daf99551454e.jpeg";
      // console.log(777777777777777777777,options.src);
      
      this.cropper = new WeCropper(cropperOpt)
        .on('ready', function (ctx) {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
    // }
  },
  onReady: function () {
  },
  touchStart (e) {
    this.cropper.touchStart(e)
  },
  touchMove (e) {
    this.cropper.touchMove(e)
  },
  touchEnd (e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage() {
    this.cropper.getCropperImage()
    .then((src) => {
      console.log('src',src);
      let url="";
      switch(this.data.from){
        case 'temp':
          url = '/pages/templateDetail/buildTemp/buildTemp?src='+src;
          break;
        case 'article':
          url = '/pages/publish/article/index?src='+src;
          break;
        case 'editUserInfo':
          url = '/pages/personal/editInfo/editInfo';
          API.uploadService(1, src, (res) => {
            let apiUrl = '/v1.0/newuser/user/editUserInfo';
            let params = {
              avatar: res,
            }
            API.post(apiUrl,params).then(res=>{})
          })
          break;
        default:;
      }
      wx.navigateTo({
        url: url,
      })
    })
    .catch((err) => {
      wx.showModal({
        title: '温馨提示',
        content: err.message
      })
    })

    
  },

  
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})