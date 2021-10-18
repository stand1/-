// pages/publish/article/index.js
import API from "../../../api/index";
import Util from "../../../utils/util";
import http from "../../../api/index";
import comm from "../../../api/comm";
Page({
  data: {
    isapp: false,
    params: {},
    Appobj: {},
    title: '',
    postCoverSrc: '',
    articleContent: '',
  },
  onLoad: function (options) {
    console.log('options', options);

    if (options.src) {
      this.setData({
        postCoverSrc: options.src
      })
    }
    if (options.imgUrl) {
      this.setData({
        postCoverSrc: options.imgUrl
      })
    }
    if (options.introduction) {
      this.setData({
        articleContent: options.introduction
      })
    }
    if (options.title) {
      this.setData({
        title: options.title
      })
    }
  },
  onReady: function () {

  },
  titleInputBlur(e) {
    this.setData({
      title: e.detail.value
    })
  },

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
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      //一进入页面就初始化富文本编辑器，此时还未发送请求获取不到数据，编辑器内容html为空（that.data.articleContent为空）
      //请求完数据后再调用这个方法，才能取到数据写入编辑器')
      that.editorCtx.setContents({
        html: that.data.articleContent  //将数据写入编辑器内
      })
      //在这里用event.on注册onEditorReady方法
      //当event.emit执行时，就会调用onEditorReady方法，重新渲染富文本编辑器
      //此时就能获取到数据，写入编辑器中（即给that.data.articleContent赋值后，他不再为空）
      // event.on('resetEditor', that, that.onEditorReady.bind(that)) 
    }).exec()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    wx.setStorageSync('richText', 'richText');
    wx.setStorageSync('maxNum', 1);

    console.log(wx.getStorageSync('carType'))
    let car = wx.getStorageSync('carType')
    wx.navigateTo({ //把车系带过去 
      url: '/pages/pageA/materialLibrary/materialLibrary?carId=' + car.id + "&carname=" + car.name,
    })

    // const that = this
    // wx.chooseImage({
    //   count: 1,
    //   success: async function (res) {
    //     let _img = await API.uploadService(1, res.tempFilePaths[0], (res) => {
    //       // console.log('res',res);
    //     })
    //     that.editorCtx.insertImage({
    //       src: _img,
    //       width: '100%',
    //       height: 'auto',
    //       extClass: 'img',
    //       success: function () {
    //         console.log('insert image success')
    //       }
    //     })
    //   }
    // })
  },
  getEditorValue(e) {
    this.setData({
      articleContent: e.detail.html
    })
    // console.log(e.detail.html)
  },
  chooseCoverImage() {
    wx.setStorageSync('richText', '');
    wx.setStorageSync('maxNum', 1);
    console.log(wx.getStorageSync('carType'))
    let car = wx.getStorageSync('carType');
    wx.navigateTo({ //把车系带过去 
      url: '/pages/pageA/materialLibrary/materialLibrary?carId=' + car.id + "&carname=" + car.name,
    })
    // let self=this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original'],
    //   sourceType: ['album', 'camera'],
    //   success: async function (res) {
    //     console.log('res',res);
    //     const src = res.tempFilePaths[0];
    //     wx.navigateTo({
    //       url: '/pages/cropper/cropper?from=article&src='+src,
    //     })
    // let  _img = await API.uploadService(1,res.tempFilePaths[0],(res)=>{
    //   // console.log('res',res);
    // })
    // if(_img){
    //   self.setData({
    //     postCoverSrc: _img
    //   })
    // }
    // }
    // })
  },
  save() { },
  async publish() {
    console.log('articleContent---',this.data.articleContent);
   
    if (!this.data.postCoverSrc) {
      return wx.showToast({
        title: '请上传封面图',
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
    } if (this.data.title.length < 6) {
      return wx.showToast({
        title: '标题不能少于6个字！',
        icon: 'none',
        duration: 2000
      })
    } if (this.data.title.length > 30) {
      return wx.showToast({
        title: '标题不能多于30个字！',
        icon: 'none',
        duration: 2000
      })
    }
    if (!this.data.articleContent) {
      return wx.showToast({
        title: '内容不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    let link = await comm.getRichText(this.data.articleContent);
    let res = await http.post("v1.0/redt_b_material/post/post", {
      userId: wx.getStorageSync("useInfo").id || 'sale_3',
      carStyleId: wx.getStorageSync("carType") && wx.getStorageSync("carType").id,
      title: this.data.title,
      content: link,
      imgUrl: this.data.postCoverSrc,
      // url:this.data.videoList[0],
      type: 3,//1图片,2视频,3文章
      appId: this.data.Appobj.id,
      // introduction:this.data.textContent,
    })
    console.log(res)
    if (res.code == 200) {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
      })
    }
  },
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    console.log('json----', json) //为传过来的值
    if (json) {
      if (json.richText) {//插入富文本的图片
        console.log('富文本');
        const that = this;
        that.editorCtx.insertImage({
          src: json.url[0],
          width: '100%',
          height: 'auto',
          extClass: 'img',
          success: function () {
            console.log('insert image success')
          }
        })
      } else {
        console.log('封面');
        this.data.postCoverSrc = json.url[0];
      }
      this.setData({
        postCoverSrc: this.data.postCoverSrc
      })
    }
  },
  onShareAppMessage: function () {

  }
})