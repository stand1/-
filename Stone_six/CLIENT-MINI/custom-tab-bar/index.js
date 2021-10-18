var app = getApp();
import API from "../api/index"
Component({
  properties: {

  },
  data: {
    isShow:true,
    selected: null,
    list: [{
        "pagePath": "/pages/index/index",
        "iconPath": "/static/tabs/1.png",
        "selectedIconPath": "/static/tabs/select1.png",
        "text": "素材"
      },
      {
        "pagePath": "/pages/tempbox/index",
        "iconPath": "/static/tabs/2.png",
        "selectedIconPath": "/static/tabs/2-select.png",
        "text": "模板"
      },
      {
        "pagePath": "/pages/usercenter/usercenter",
        "iconPath": "/static/tabs/3.png",
        "selectedIconPath": "/static/tabs/3-select.png",
        "text": "个人中心"
      }
    ],
  },
  created() {

  },
  attached() {},
  methods: {
    switchTab(e) {
      var data = e.currentTarget.dataset
      var url = data.path;
      if (url) {
        wx.switchTab({url})
        // this.setData({
        //   selected: data.index
        // })
      } else {
        wx.navigateTo({
          url: '/pages/publish/list/list',
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
          wx.navigateTo({
            url: '/pages/cropper/cropper?from=maganize&src='+src,
          })
        }
      })
    },
    itemTap(e) {
      console.log('eee', e.currentTarget.dataset.id);
      let typeId = e.currentTarget.dataset.id;
      switch (typeId) {
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
              wx.navigateTo({
                url: '/pages/publish/image/index?imgList='+JSON.stringify(arr)
              })
            }
          })
          break;
        case '5':
          console.log('55');
          wx.navigateTo({
            url: '/pages/publish/article/index',
          })
          break;
       default:
          break;
      }
    }
  }
})