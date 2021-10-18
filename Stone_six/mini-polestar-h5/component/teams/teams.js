// component/teams/teams.js
import API from '../../api/base'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teamList: {
      type: Object,
      value: []
    },
    myTeam: {
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
    },
    changeJoin (e) {
      let joinUserId = e.currentTarget.dataset.joinuserid
      let teamId = e.currentTarget.dataset.id
      let types = e.currentTarget.dataset.type
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      let pamer = {
        yourId: wx.getStorageSync('userInfo').id,
        userId: joinUserId,
        status: types,
        teamId: teamId
      }
      API.post('v1.0/jx/teamParticipant/audit', pamer).then(res => {
        wx.hideLoading()
        if (res.code == 200) {
          if (types == 1) {
            wx.showToast({
              title: '加入成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
            this.triggerEvent('changeJoins', true)
          } else {
            wx.showToast({
              title: '拒绝成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }).catch(err => {
        wx.showToast({
          title: err.msg,
          icon: 'none',
          duration: 2000,
          mask: true
        })
      })
    }
  }
})
