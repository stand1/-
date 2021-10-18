// components/recom/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navTempList: {
      type: Object,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navList:[
      'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/160125547050801.png',
      'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/160125618074502.png',
      'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/160125614168303.png'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changePoster (e) {
      let str = this.data.navTempList[e.currentTarget.dataset.i].name;
      let i = this.data.navTempList[e.currentTarget.dataset.i].value;
      if (i == 1 || i == 2) {
        wx.navigateTo({
          url: '/pages/templateDetail/tempType/tempType?str=' + str + "&types=" + i,
       })
      } else {
        wx.showToast({
          title: '暂未开放，敬请期待',
          icon: 'none',
          duration: 2000
        })
      }
    },
  }
})
