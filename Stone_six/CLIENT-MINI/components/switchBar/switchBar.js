// component/switchBar/switchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isNew: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change() {
      this.setData({
        isNew: !this.data.isNew
      })
      this.triggerEvent("setHot",this.data.isNew)
    }
  }
})
