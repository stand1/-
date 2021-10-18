// component/phoneEmpower/phoneEmpower.js
import API from '../../api/base'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber (e) {
      let that = this
      let obj = {}
      wx.login({
        success: r => {
          obj.codePhone = r.code
          obj.encryptedDataPhone = e.detail.encryptedData
          obj.ivPhone = e.detail.iv
          obj.userId = that.data.userInfo.id
          API.post('newuser/user/phoneCode', obj).then(res => {
             if (res.code == 200) {
              let userData = that.data.userInfo
              userData.mobile = res.data.mobile
              wx.setStorageSync('userInfo', userData)
              that.setData({isShow: false})
              this.triggerEvent('cahngeEvent', true)
             }
          })
        }
      })
    }
  }
})
