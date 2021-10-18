// pages/templateDetail/buildTemp/buildTemp.js
// const Minio = require('../../../miniprogram_npm/minio/dist/main/minio')
// import { Minio } from '../../../miniprogram_npm/minio/dist/main/minio'
import API from '../../../api/base'
import COMM from '../../../api/comm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBgUrl: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/160125614168303.png',
    imgTopUrl: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/b71345c631e64de2b5b3598e9b00d7f5.png',
    topImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      imgBgUrl: options.src || this.data.imgBgUrl, 
      imgTopUrl: options.imgTopUrl || this.data.imgTopUrl
    })
    wx.getSystemInfo({
      success: function (res) {
        if (options.imgTopUrl != undefined) {
          that.drawImg(that.data.imgTopUrl,res.windowWidth);
        } else {
          that.drawBgImg(options.src,res.windowWidth);
        }
      }
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
  // 替换图片
  changeImg () {
    wx.navigateTo({
      url: '/pages/pageA/materialLibrary/materialLibrary?from=poster',
    })
    return
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const _src = res.tempFilePaths[0];
        wx.navigateTo({
          url: '/pages/cropper/cropper?src='+_src+'&from=temp',
        })
      }
    })
  },
  // 撤销
  goRevoke () {
    wx.redirectTo({
      url:'/pages/templateDetail/buildTemp/buildTemp?imgTopUrl=' + wx.getStorageSync('imgTopUrl')
    })
  },
  // 重做
  goRedo () {
    // wx.reLaunch({
    wx.redirectTo({
      url:'/pages/templateDetail/tempType/tempType'
    })
  },
  // 保存
  saved () {
    if (this.data.imgBgUrl == wx.getStorageSync('imgBgUrl')) {
      wx.showToast({
        title: '请替换背景图片',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    let that = this;
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          API.uploadFile(res.tempFilePath).then((datas) => {
            let pamer = {
              userId: wx.getStorageSync('useInfo').id || 'sale_1',
              watermarkImage: that.data.imgTopUrl,
              backgroundImage: that.data.imgBgUrl,
              cover: datas,
              name: '',
              templateType: parseInt(wx.getStorageSync('tempType')) || null,
              type: '',
              tag: ''
            }
            API.post('v1.0/redt_b_material/template/savePersonalTemplate', pamer).then((resData) => {
              wx.hideLoading();
              if (resData.code == 200) {
                wx.navigateTo({
                  url: '/pages/templateDetail/savedSuccess/savedSuccess?src=' + datas,
               })
              }
            }).catch((e) => {
              wx.hideLoading();
              wx.showToast({
                title: e.msg,
                icon: 'none',
                duration: 2000
              })
            })
          }); 
        }
      });
    }, 1000);
  },
  // 绘制图片海报封面
  drawImg (url,w) {
    let that = this;
    let ctx = wx.createCanvasContext("myCanvas");
    wx.downloadFile({
      url: url,
      success: function (res) {
        wx.setStorageSync('imgTopUrl', res.tempFilePath)
        ctx.drawImage(
          res.tempFilePath,
          0,
          0,
          w * 0.7733,
          w * 1.088
        );
        ctx.draw();
      }
    })
  },
  drawBgImg (url,w) {
    let that = this;
    let ctx = wx.createCanvasContext("myCanvas");
    wx.downloadFile({
      url: url,
      success: function (res) {
        ctx.drawImage(
          res.tempFilePath,
          0,
          0,
          w * 0.7733,
          w * 1.088
        );
        ctx.drawImage(
          wx.getStorageSync('imgTopUrl'),
          0,
          0,
          w * 0.7733,
          w * 1.088
        );
        ctx.draw();
      }
    })
  }
})