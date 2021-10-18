// components/imgCard/imgCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object, //jsStyle 1 号模板 以此对应到6
      value: {}
    },

  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    //模板更多
    moreFn(e) {
      console.log(this.data.detail)
      //C:\Users\51424\Desktop\B2-CLIENT-MINI\B2-CLIENT-MINI\pages\Home\imgWatch\imgWatch.wxml 
      wx.navigateTo({
        url: '/pages/Home/imgWatch/imgWatch?templateId=' + this.data.detail.id + "&title=" + this.data.detail.title,
      })
    },
    godetail(e){
      console.log(e,this.data.detail)
      wx.navigateTo({
        url: '/pages/pageA/imgDetail/imgDetail',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset)
        }
      })
    },
  }
})