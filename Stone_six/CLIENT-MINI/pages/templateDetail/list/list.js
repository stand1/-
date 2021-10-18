// pages/publish/list/list.js
import API from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    chooseSize: false,
    btn: true,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      // {
      //   "pagePath": "/pages/index/index",
      //   "iconPath": "/static/tabs/1-1.png",
      //   "selectedIconPath": "/static/tabs/1.png"
      // },
      // {
      //   "pagePath": "/pages/Rindex/Rindex",
      //   "iconPath": "/static/tabs/2.png",
      //   "selectedIconPath": "/static/tabs/2-2.png"
      // },
      // {
      //   "pagePath": "",
      //   "iconPath": "/static/tabs/faBuAnNiu_4_zy0mjq1.png",
      //   "selectedIconPath": "/static/tabs/faBuAnNiu_4_zy0mjq1.png"
      // },
      // {
      //   "pagePath": "/pages/news/news",
      //   "iconPath": "/static/tabs/3-3.png",
      //   "selectedIconPath": "/static/tabs/Notifications-H.png"
      // },
      // {
      //   "pagePath": "/pages/mine/mine",
      //   "iconPath": "/static/tabs/4.png",
      //   "selectedIconPath": "/static/tabs/4-4.png"
      // }
    ],
    partList: [
      // {
      //   id: '1',
      //   icon: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/0224_redt_active@2x.png',
      //   text: '活动'
      // },
      // {
      //   id: '2',
      //   icon: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/0224_redt_vote@2x.png',
      //   text: '话题'
      // },
      // {
      //   id: '3',
      //   icon: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/0224_redt_pc@2x.png',
      //   text: 'PC发文'
      // },
      {
        id: '4',
        icon: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/0224_redt_topic@2x.png',
        text: '图片'
      },
      {
        id: '5',
        icon: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/0224_redt_news@2x.png',
        text: '文章'
      },
      {
        id: '6',
        icon: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/0224_redt_video@2x.png',
        text: '视频'
      }
    ],
    cropper: null,
    showCropper: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

    // 显示遮罩层
    showshadow: function (e) {
      if (this.data.chooseSize == false) {
        this.chooseSezi()
      } else {
        this.hideModal()
      }
    },

    // 动画函数
    chooseSezi: function (e) {
      // 用that取代this，防止不必要的情况发生
      var that = this;
      // 创建一个动画实例
      var animation = wx.createAnimation({
        // 动画持续时间
        duration: 500,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
      })
      // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(1000).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        chooseSize: true
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export(),
          clearcart: false
        })
      }, 100)
    },
    closefn() {
      // this.setData({
      //   btn: true,
      //   chooseSize: false
      // })
      wx.navigateBack({
        delta: -1,
       
      })
    },
    // 隐藏
    hideModal: function (e) {
      var that = this;

      this.setData({
        btn: true
      })
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'linear'
      })
      that.animation = animation
      animation.translateY(700).step()
      that.setData({
        animationData: animation.export()
      })
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export(),
          chooseSize: false
        })
      }, 500)
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if (url) {
        wx.switchTab({
          url
        })
        this.setData({
          selected: data.index
        })
      } else {
        this.showshadow()
        this.setData({
          btn: false
        })
      }


    },
    goMagazine() {
      const self = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const src = res.tempFilePaths[0];
          // wx.navigateTo({
          //   url: '/pages/cropper/cropper?from=maganize&src='+src,
          // })
        }
      })
    },
    itemTap(e) {
      console.log('eee', e.currentTarget.dataset.id);
      let typeId = e.currentTarget.dataset.id;
      switch (typeId) {
        case '1':
          console.log('11');
          break;
        case '2':
          console.log('22');
          break;
        case '3':
          console.log('33');
          break;
        case '4':
          wx.chooseImage({
            count: 6,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: async function (res) {
              let arr = [],
                _img;
              for (let i = 0; i < res.tempFilePaths.length; i++) {
                _img = await API.uploadService(1, res.tempFilePaths[i], (res) => {
                  // console.log('res',res);
                })
                if (_img) {
                  arr.push(_img)
                }
              }
              // wx.navigateTo({
              //   url: '/pages/publish/image/index?imgList=' + JSON.stringify(arr),
              // })
            }
          })
          break;
        case '5':
          console.log('55');
          // wx.navigateTo({
          //   url: '/pages/publish/article/index',
          // })
          break;
        case '6':
          wx.chooseVideo({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: async function (res) {
              let width = res.width;
              let height = res.height;
              let _src = await API.uploadService(3, res.tempFilePath, (res) => {
                // console.log('res',res);
              })
              // app.globalData.publishVideo = _src;
              // wx.navigateTo({
              //   url: '/pages/publish/video/index?video=' + _src + '&direction=' + (width > height ? 'horizontal' : 'vertical')
              // })
            }
          })
          break;
        default:
          break;
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})