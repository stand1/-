// pages/publish/video/index.js
var app = getApp();
import API from "../../../api/index"
import Util from "../../../utils/util"
import http from "../../../api/index"
Page({
  data: {
    direction: '', //vertical  horizontal,
    postCoverSrc: '',
    textContent: '',
    videoSrc: '',
    title: '',
    textLength: 0,
    isapp: false,
    videoList: [
      // 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/15790595003531539597100847.mp4',
    ],
    textLength: 0,
    Appobj:{},
    params: {},
  },
  onLoad: function (options) {
    // console.log('options',options.direction)
    if (options.video) {
      let postCoverSrc = options.video + '?x-oss-process=video/snapshot,t_10,f_jpg,w_0,h_0,m_fast';
      this.setData({
        videoList: new Array(options.video),
        direction: options.direction,
        postCoverSrc: postCoverSrc
      })
      console.log('postCoverSrc', postCoverSrc);
    }

    if (options.introduction) {
      this.setData({
        textContent: options.introduction
      })
    }
    if (options.title) {
      this.setData({
        title: options.title
      })
    }
  },
  onReady: function () { },
  closefn() {
    this.setData({
      isapp: false
    })
  },
  chosefn(e) {
    //应用
    console.log(e.detail)
    this.setData({
      Appobj: e.detail
    })
    this.data.params.appId = e.detail.id
  },
  openApp() {
    this.setData({
      isapp: true
    })
  },

  removeVideo() {
    this.data.videoList.splice(0, 1);
    this.setData({
      videoList: this.data.videoList
    })
  },
  addVideo() {
    wx.setStorageSync('maxNum', 1);
    console.log(wx.getStorageSync('carType'))
    let car = wx.getStorageSync('carType')
    wx.navigateTo({ //把车系带过去 
      url: '/pages/pageA/materialLibrary/materialLibrary?carId=' + car.id + "&carname=" + car.name,
    })
    // let self = this;
    // wx.chooseVideo({
    //   count: 1,
    //   sizeType: ['original'],
    //   sourceType: ['album', 'camera'],
    //   maxDuration: 60,
    //   camera: 'back',
    //   success: async function (res) {
    //     let width = res.width;
    //     let height = res.height;
    //     let _src = "",
    //       arr = [];
    //     _src = await API.uploadService(3, res.tempFilePath, (res) => {
    //     })
    //     if (_src) {
    //       arr.push(_src)
    //     }
    //     self.setData({
    //       videoList: arr,
    //       postCoverSrc: _src + '?x-oss-process=video/snapshot,t_10,f_jpg,w_0,h_0,m_fast',
    //       direction: width > height ? 'horizontal' : 'vertical'
    //     })
    //   }
    // })
  },
  titleInputBlur(e) {
    this.setData({
      title: e.detail.value
    })
  },
  textNumInput(e) {
    let text = e.detail.value;
    if (this.data.textLength > 100) {
      // wx.showToast({
      //   title: '最多只能输入100个字',
      //   icon: 'none',
      //   duration: 2000
      // })
      text = text.slice(0, 100);
    }
    this.setData({
      textContent: text,
      textLength: text.length
    })
  },
  textInputBlur(e) {
    // this.setData({
    //   textContent: e.detail.value
    // })
  },
  openSelectType() {
    this.setData({
      showSelectType: true
    })
  },
  openSelectTribe() {
    this.setData({
      showSelectTribe: true
    })
  },
  openSelectLabel() {
    this.setData({
      showSelectLabel: true
    })
  },
  closeSelectType() {
    this.setData({
      showSelectType: false
    })
  },
  closeSelectTribe() {
    this.setData({
      showSelectTribe: false
    })
  },
  selectTypeItem(e) {
    let item = e.currentTarget.dataset.item;
    // console.log('item',item);
    this.setData({
      videoTypeId: item.id,
      videoTypeName: item.name,
      showSelectType: false
    })
  },
  selectTribeItem(e) {
    let item = e.currentTarget.dataset.item;
    console.log('item', item);
    this.setData({
      tribeId: item.id,
      tribeName: item.name,
      showSelectTribe: false
    })
  },
  closeLabelSelect(e) {
    let obj = e.detail;
    if (!obj.id) {
      this.setData({
        showSelectLabel: false
      })
      return
    }
    if (obj.id == -1) {
      this.data.labelList.push(obj);
      this.setData({
        labelList: this.data.labelList,
        showSelectLabel: false
      })
      return
    }
    if (!Util.findArr(this.data.labelList, 'id', obj.id)) {
      this.data.labelList.push(obj);
      this.setData({
        labelList: this.data.labelList,
      })
    }
    this.setData({
      showSelectLabel: false
    })
  },
  async publish() {
    if (this.data.videoList.length < 1) {
      return wx.showToast({
        title: '请上传视频',
        icon: 'none',
        duration: 2000
      })
    }
    if (!this.data.title) {
      return wx.showToast({
        title: '标题不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    if (this.data.title.length < 6) {
      return wx.showToast({
        title: '标题为6到30个字！',
        icon: 'none',
        duration: 2000
      })
    }
    if (!this.data.textContent) {
      return wx.showToast({
        title: '内容不能为空！',
        icon: 'none',
        duration: 2000
      })
    }

    let res = await http.post("v1.0/redt_b_material/post/post", {
      userId:wx.getStorageSync("useInfo").id || 'sale_3',
      carStyleId:wx.getStorageSync("carType") && wx.getStorageSync("carType").id,
      title:this.data.title,
      // imgUrl:this.data.imgList[0],
      url:this.data.videoList[0],
      type:2,//1图片,2视频,3文章
      appId:this.data.Appobj.id,
      introduction:this.data.textContent,
    })
    console.log(res)
    if (res.code == 200) {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
      })
    }

    // if (!this.data.labelList.length > 0) {
    //   return wx.showToast({
    //     title: '请选择标签',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // wx.showLoading();
    // let videoDom = '',
    //   y, strUrl;
    // let text = this.data.textContent ? `<p>${this.data.textContent}<p>` : '';
    // for (let i = 0; i < this.data.videoList.length; i++) {
    //   y = `<p><video src="${this.data.videoList[i]}"  controls="" autobuffer="" autoplay="" muted="" x5-playsinline="" playsinline="" webkit-playsinline="" style="width:100%;height: auto;"></video></p>`
    //   videoDom += y;
    // }
    // // console.log('videoDom',videoDom);
    // // console.log('videoDom',this.data.videoList[0]);
    // // return
    // if (text + videoDom) {
    //   strUrl = await API.uploadService(2, `${text}${videoDom}`);
    // }
    // strUrl ? this.postPublish(strUrl, 1) : wx.hideLoading();
  },
  postPublish(str, flag) {
    var newTagNames = [],
      labelIds = [],
      url = "",
      self = this;
    for (let i in this.data.labelList) {
      if (this.data.labelList[i].id == -1) {
        newTagNames.push(this.data.labelList[i].tagName);
      } else {
        labelIds.push(this.data.labelList[i].id)
      }
    }
    url = '/v1.0/newarticle/article/publishDraft';
    let param = {
      articleId: '',
      content: str,
      title: this.data.title,
      imgUrl: this.data.postCoverSrc, //文章封面
      introduction: this.data.textContent,
      tribeId: this.data.tribeId,
      tagSettingIds: labelIds.toString(),
      newTagNames: newTagNames.toString(),
      direction: this.data.direction, //vertical  horizontal
      videoClassifyId: this.data.videoTypeId
    };
    if (flag) {
      url = "/v1.0/newarticle/article/publishVideo";
    } else { //保存草稿
      param.articleType = "video"; //article，img，video
    }
    if (this.data.articleId) {
      param.articleId = this.data.articleId;
      url = "/v1.0/newarticle/article/republish";
    }
    API.post(url, param).then(res => {
      wx.hideLoading();
      self.data.videoList = [];
      if (self.data.articleId) {
        // self.$toast("修改成功！");
        return
      }
      if (flag) {
        wx.showToast({
          title: '发表成功，请等待审核！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/mine/mine'
          })
        }, 1000)
        // setTimeout(()=>{
        //   if (flag) {
        //     // this.$router.go(-1);
        //   } else {
        //     // this.$router.push({ path: "/myCreations", query: { tab: 'ALL' } });
        //   }
        // },1000)
      } else {
        wx.showToast({
          title: '已保存草稿',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          // if (this.flag) {
          //   this.$router.go(-1);
          // } else {
          //   this.$router.push({ path: "/my", query: { tab: 1 } });
          // }
        }, 1000)
      }
    })
      .catch(e => {
        wx.hideLoading();
        console.log('err', e);
      });
  },
  onShareAppMessage: function () {

  },
  onShow:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    console.log('json----',json) //为传过来的值
    if (json) {
      // this.data.imgList = {
      //   ...this.data.imgList,
      //   ...json.url
      // }
      this.data.postCoverSrc = json.url[0];
      json.url = ['https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/15790595003531539597100847.mp4'];
      this.data.videoList = [...json.url];
      
      // this.data.imgList = [
      //   ...this.data.imgList,
      //   ...json.url
      // ]
      this.setData({
        videoList:this.data.videoList,
        postCoverSrc:this.data.postCoverSrc,
      })
    }
    console.log(this.data.videoList, "onshow")
  },
})