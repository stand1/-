/**
 * @不感兴趣
 * @关注
 * @取消关注
 * @拉黑
 *@点赞
 */
import http from "./index"
const commJs = {
  async uinterested(params = {}) {
    //不感兴趣
    let res = await http.request("/v1.0/newarticle/article/uinterested", params, "POST")
    if (res.code == 200)
      return res
  },
  async unfollowUser(params = {}) {
    //取消关注
    let res = await http.request("/v1.0/newuser/user/unfollowUser", params, "POST")
    if (res.code == 200)
      return res
  },
  async followUser(params = {}) {
    //关注
    let res = await http.request("/v1.0/newuser/user/followUser", params, "POST")
    if (res.code == 200)
      return res
  },
  async blackUser(params = {}) {
    //拉黑
    let res = await http.request("/v1.0/newuser/user/blackUser", params, "POST")
    if (res.code == 200)
      return res
  },
  async unBlackUser(params = {}) {
    //拉黑取消
    let res = await http.request("/v1.0/newuser/user/unBlackUser", params, "POST")
    if (res.code == 200)
      return res
  },
  async unlike(params = {}) {
    //取消点赞
    let res = await http.request("/v1.0/newarticle/like/unlike", params, "POST")
    if (res.code == 200)
      return res
  },
  async like(params = {}) {
    //点赞
    let res = await http.request("/v1.0/newarticle/like/like", params, "POST")
    if (res.code == 200)
      return res
  },
  //收藏 
  /**
   * favoriteType 	收藏类型,1:素材,2帖子
   * @param {userId,anyId,favoriteType} params 
   */
  async Favorite(params={}){
    let res = await http.request("v1.0/redt_b_user/favorite/addFavorite", params, "POST")
    if (res.code == 200)
      return res
  },
  async followTopics(params = {}) {
    //话题关注
    let res = await http.request("/v1.0/newarticle/home/followTopics", params, "GET")
    if (res.code == 200)
      return res
  },
  async unfollowTopics(params = {}) {
    //话题关注
    let res = await http.request("/v1.0/newarticle/home/followTopics", params, "GET")
    if (res.code == 200)
      return res
  },
  async deleteArticleByUserId(params = {}) {
    //删除
    let res = await http.request("/v1.0/newarticle/article/deleteArticleByUserId", params, "POST")
    if (res.code == 200)
      return res
  },
  async getRichText (params = {}) {
    let pamer = {}
      let timers = new Date() / 1
      pamer.key = 'richText/' + timers;
      return new Promise(function (resolve, reject) {
        http.request('v1.0/redt_b_user/file/stsSignForPut',pamer).then((res) => {
          wx.request({
            url: res.data,
            method: "PUT",
            data: params,
            success (data) {
              console.log(data)
              resolve('https://oss.sixeco.com/redt-b/richText/' + timers) 
            },
            fail (err) {
              console.log(err)
            }
          })
      })
      })
  },
  jump(type, obj) {
    let arr = []
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        let cnum = key + '=' + element
        if (type == 'feature') {
          cnum = 'featureId' + '=' + element
        }
        arr.push(cnum)
      }
    }
    console.log(type, arr)
    switch (type) {
      case "img":
        wx.navigateTo({
          url: '/pages/detail/imgDetail/imgDetail?' + arr.join("&"),
        })
        break;
      case "article":
        wx.navigateTo({
          url: '/pages/detail/postDetail/postDetail?' + arr.join("&"),
        })
        break;
      case "video":
        wx.navigateTo({
          url: '/pages/detail/videoPostDetail/videoPostDetail?' + arr.join("&"),
        })
        break;
      case "user":
        wx.navigateTo({
          url: '/pages/personal/personalCenter/personalCenter?' + arr.join("&"),
        })
        break;
      case "tag":
        wx.navigateTo({
          url: '/pages/detail/topicDetail/topicDetail?' + arr.join("&"),
        })
        break;
      case "fm":
        wx.navigateTo({
          url: '/pages/detail/FmDetail/FmDetail?' + arr.join("&"),
        })
        break;
      case "feature":
        wx.navigateTo({
          url: '/pages/detail/thorDetail/thorDetail?' + arr.join("&"),
        })
        break;
      case "tribe":
        wx.navigateTo({
          url: '/pages/detail/tribeDetail/tribeDetail?' + arr.join("&"),
        })
        break;
      default:
    }

  }
}
export default commJs