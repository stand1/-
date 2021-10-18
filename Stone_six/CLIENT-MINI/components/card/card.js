// components/card/card.js
import comm from "../../api/comm"
Component({
 
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      value: "100%"
    },
    className: {
      type: String,
      value: ""
    },
    obj: {
      type: Object,
      value: {}
    },
    favoriteType:{
      type: String,
      value: "1" //1 素材 
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
    favriteFn() {
      //收藏
      this.data.obj.isFavorite = this.data.obj.isFavorite == 0 ? 1 : 0
      this.setData({
        obj: this.data.obj
      })
      comm.Favorite({
        userId: wx.getStorageSync("useInfo").id,
        anyId:this.data.obj.id,
        favoriteType:this.data.favoriteType
      })
    }
  }
})