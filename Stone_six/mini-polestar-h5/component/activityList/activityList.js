// component/activityList/activityList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityList:{
      type: Object,
      value: []
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
    goDetail (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/detail/activityDetail/activityDetails?id=' + id,
      })
    }
  }
})
