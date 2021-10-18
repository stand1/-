// components/recommend/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: []
    },
    favoriteType: {
      type: String,
      value: "1"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetail(e) {

      let item = e.currentTarget.dataset.item;
      console.log(item);
      console.log(123);
      wx.navigateTo({
        url: '/pages/pageA/imgDetail/imgDetail',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset)
        }
      })
    }
  }
})
