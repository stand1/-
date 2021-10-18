// components/applications/applications.js
import http from "../../api/index"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isapp: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    created() {
      this.list()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    appList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async list() {
      //应用列表
      let res = await http.get("v1.0/redt_b_material/app/appList", {})
      console.log(res)
      if (res.code == 200) {
        this.setData({
          appList: res.data
        })
      }
    },
    chosefn(e){
      console.log()
      this.setData({
     appObj:   this.data.appList[e.currentTarget.dataset.index]
      })
      this.triggerEvent("chosefn",  this.data.appList[e.currentTarget.dataset.index])
     this.closefn()
    },
    closefn() {
      // this.setData({
      //   isapp:false
      // })
      this.triggerEvent("close", false)
    },
  }
})