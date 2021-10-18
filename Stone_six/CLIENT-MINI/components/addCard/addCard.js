// components/addCard/addCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCard:{
      type:Boolean,
      value:false
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
    close(){
      // this.setData({
      //   isCard:false
      // })
      this.triggerEvent("classfn", false)
    },
    editFn(e){ //C:\Users\51424\Desktop\B2-CLIENT-MINI\B2-CLIENT-MINI\pages\build\choseCar\choseCar.js
      // console.log(e.currentTarget.dataset.type)
      wx.navigateTo({
        url: '/pages/build/choseCar/choseCar?type='+e.currentTarget.dataset.type,
      })
    }
  }
})
