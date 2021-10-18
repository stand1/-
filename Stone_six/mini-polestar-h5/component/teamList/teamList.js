// component/teamList/teamList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teamList: {
      type: Object,
      value: []
    },
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
    checkDetail (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/detail/teamDetail/teamDetail?id='+id,
      })
    },
    applyJoin (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/route/join/join?id='+id,
      })
    }
  }
})
