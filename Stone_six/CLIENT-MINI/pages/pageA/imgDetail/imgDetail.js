// pages/pageA/imgDetail/imgDetail.js
import http from "../../../api/index";
import comm from "../../../api/comm";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '凯美瑞外观',
    id: '',
    imgSrc: "",
    videoSrc:'',
    imgList: [
      { imgUrl: '../../../static/img/iconDownload.png', name: '保存', tab: 1 },
      { imgUrl: '../../../static/img/iconShare.png', name: '分享', tab: 2 },
      { imgUrl: '../../../static/img/iconDesign.png', name: '设计', tab: 3 },
      { imgUrl: '../../../static/img/iconZan.png', name: '收藏', tab: 4 },
      { imgUrl: '../../../static/img/iconMore.png', name: '更多', tab: 5 },
    ]
  },
  async handleBtn(e) {
    let tab = e.currentTarget.dataset.item.tab;
    console.log(e.currentTarget.dataset.item.tab, this.data.imgSrc);
    switch (tab) {
      case 1:
        wx.downloadFile({
          url: this.data.imgSrc,
          success(res) {
            console.log(12312313);
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              wx.showToast({
                title: '下载成功',
              })
              // wx.playVoice({
              //   filePath: res.tempFilePath
              // })
            }
          }
        })
        break;
      case 2:
        console.log(123);
        wx.showToast({
          title: '请点击右上角分享',
          icon: 'none',
        })
        break;
      case 3:
        break;
      case 4:
        let data = await comm.Favorite({
          userId: wx.getStorageSync("useInfo").id || 'sale_3',
          anyId: this.data.id,
          favoriteType: 1,//1帖子  2素材
        });
        console.log(data);
        if (data.code == 200) {
          wx.showToast({
            title: "收藏成功",
          });
        }
        break;
      case 5: ;
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      //跳转过来的参数
      console.log("data===",data)//type 2视频  1图片
      // let type = data.item.type;
      if (data.item) {
        self.setData({
          title: data.item.title,
          id: data.item.id,
        })
      }
      if(data.item && data.item.type==1){
          self.setData({
            imgSrc: data.item.url,
          })
      }else if(data.item && data.item.type==2){
          self.setData({
            videoSrc: data.item.url,
            imgList:[
              // { imgUrl: '../../../static/img/iconDownload.png', name: '保存', tab: 1 },
              { imgUrl: '../../../static/img/iconShare.png', name: '分享', tab: 2 },
              { imgUrl: '../../../static/img/iconDesign.png', name: '设计', tab: 3 },
              { imgUrl: '../../../static/img/iconZan.png', name: '收藏', tab: 4 },
              { imgUrl: '../../../static/img/iconMore.png', name: '更多', tab: 5 },
            ]
          })
      }
    })
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
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

  }
})