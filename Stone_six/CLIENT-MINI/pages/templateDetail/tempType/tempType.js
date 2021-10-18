// pages/tempType/tempType.js
const App = getApp();
import API from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:  wx.getStorageSync('navHeight'),
    keys: '',
    titles: '',
    arrList: ["筛选",1,2,3,4,5,6],
    i:0,
    imgList:[ ],
    previewPosterUrl: '',
    isShow: false,
    type: 1,
    isLive: false,
    indexs: null,
    pageSize: 10,
    pageNum: 1,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      titles: options.str || '',
      type: options.types
    })
    this.getTempLists();
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
    if (this.data.total > this.data.imgList.length) {
      this.setData({pageNum: this.data.pageNum += 1});
      this.getTempLists();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 切换最热最新
  changeBar (val) {
    console.log(val.detail)
    // true => 最热  false => 最新
  },
  // 筛选
  bindPickerChange (e) {
    this.setData({
      i: e.detail.value
    })
  },
  // 预览
  changeDetail (e) {
    let i = e.currentTarget.dataset.i;
    this.setData({
      previewPosterUrl: this.data.imgList[i].cover,
      isShow: !this.data.isShow,
      indexs: i,
      isLive: this.data.imgList[i].isFavorite || false,
    })
  },
  // 收藏
  like () {
    wx.showLoading({
      title: '正在加载',
      mask: true,
    })
    let pamer = {
      userId: wx.getStorageSync('useInfo').id || 'sale_1',
      anyId: this.data.imgList[this.data.indexs].id,
      favoriteType: this.data.imgList[this.data.indexs].favoriteType
    }
    API.post('v1.0/redt_b_user/favorite/addFavorite', pamer).then((res) => {
      wx.hideLoading();
      if (res.code == 200) {
        let list = this.data.imgList;
        list[this.data.indexs].isFavorite = !this.data.isLive;
        this.setData({
          isLive: !this.data.isLive,
          imgList: list
        });
      }
    }).catch( (e) => {
      wx.hideLoading();
      wx.showToast({
        title: e.msg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 立即使用
  useNext (e) {
    console.log(this.data.imgList[this.data.indexs].templateType)
    let id = this.data.imgList[this.data.indexs].id;
    wx.setStorageSync('tempType', this.data.imgList[this.data.indexs].templateType);
    if (this.data.imgList[this.data.indexs].templateType == 1) {
      let pamer = {
        templateType: this.data.type,
        id: id
      }
      API.get('v1.0/redt_b_material/template/getTemplate', pamer).then((res) => {
        if (res.code == 200) {
          wx.setStorageSync('imgTopUrl', res.data.watermarkImage);
          wx.setStorageSync('imgBgUrl', res.data.backgroundImage);
          wx.navigateTo({
             url: '/pages/templateDetail/buildTemp/buildTemp?imgTopUrl=' + res.data.watermarkImage + '&imgBgUrl=' + res.data.backgroundImage
          })
        }
      }).catch((e) => {
        wx.showToast({
          title: e.msg,
          icon: 'none',
          duration: 2000
        })
      })
    } else if (this.data.imgList[this.data.indexs].templateType == 2) {
      let type = this.data.imgList[this.data.indexs].type
      console.log('type=>',type)
      switch (type) {
        case 1:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardA/tempCardA',
          })
        break;
        case 2:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardB/tempCardB',
          })
        break;
        case 3:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardC/tempCardC',
          })
        break;
        case 5:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardD/tempCardD',
          })
        break;
        case 7:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardE/tempCardE',
          })
        break;
        case 6:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardF/tempCardF',
          })
        break;
        case 4:
          wx.navigateTo({
            url: '/pages/templateDetail/tempCard/tempCardG/tempCardG',
          })
        break;
        default:
          wx.showToast({
            title: '暂未开放，换个模板试试',
            icon: 'none',
            duration: 2000
          })
      }
    }
  },
  // 关闭弹层
  closeShow () {
    this.setData({isShow: !this.data.isShow})
  },
  // 获取模板列表
  getTempLists () {
    let pamer = {
      name: this.data.keys,
      templateType: parseInt(this.data.type),
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      userId: wx.getStorageSync('useInfo').id || 'sale_1'
    }
    API.get('v1.0/redt_b_material/template/templateList',pamer).then((res) => {
      if (res.code == 200) {
        if (this.data.pageNum == 1) {
          this.setData({
            imgList: res.data.records,
            total: res.data.total
          })
        } else {
          let imgList = this.data.imgList
          imgList.push(...res.data.records)
          this.setData({
            imgList: imgList
          })
        }
      }
    }).catch((e) => {
      wx.showToast({
        title: e.msg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 搜索
  search (e) {
    this.setData({keys: e.detail.value})
    this.getTempLists();
  }
})