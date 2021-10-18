// pages/detail/searchList/searchList.js
import API from "../../../api/index";
import http from "../../../api/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    title:'历史记录',
    imgShow:true,
    showFlag:true,
    showResultFlag:false,
    hotList:[],
    keyword:'',
    resultList:[],
    

  },
   async getHistoryList(){
    let res = await http.get('v1.0/redt_b_material/searchHistory/list',{

    })
    console.log('res---',res);
    // let url = "v1.0/newuser/searchHistory/list";
    // let params = {};
    // API.get(url,params).then(res=>{
    //   this.setData({
    //     list:res.data
    //   })
    // })
  },
  getHotList(){
    let url = "v1.0/newarticle/home/hotSearch";
    let params = {};
    API.get(url,params).then(res=>{
      this.setData({
        hotList:res.data
      })
    })
  },
  handleDelete(){
    let url = "v1.0/newuser/searchHistory/clear";
    let params = {};
    API.post(url,params).then(res=>{
      this.getHistoryList();
    })
    
  },
  gosearch(){
    console.log(this.data.keyword)
    wx.navigateTo({
      url: '/pages/pageA/searchResult/searchResult?key=' +this.data.keyword,
    })
  },
  handleTagUser(e){
    console.log(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/pageA/searchResult/searchResult?key=' + e.currentTarget.dataset.item.searchText,
    })
  },
  handleClickHot(e){
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/pageA/searchResult/searchResult?key=' + e.currentTarget.dataset.item.search_text,
    })
  },
  goBack(){
    wx.navigateBack();
  },
  changeTxt(e){
    // console.log(e.detail.value);
    let _this = this;

    if (this.changeEndTimer) {
      clearTimeout(this.changeEndTimer);
      this.changeEndTimer = null;
    }

    this.changeEndTimer = setTimeout(function () {
      console.log("滑动结束");
      // console.log();
      _this.setData({
        keyword:e.detail.value
      })
      _this.getResultList(e.detail.value)
    }, 500);
  },
  getResultList(value){
    let url = "v1.0/newarticle/article/getAllTag";
    let params = {
      name:value,
      pageNum:1,
      pageSize:200
    };
    API.get(url,params).then(res=>{
      this.setData({
        resultList:res.data.records,
        showResultFlag:true,
      })
    })
  },
  handleShowDetail(e){
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/pageA/searchResult/searchResult?key=' + e.currentTarget.dataset.tagname,
    })
  },
  setEmpty(){
    this.setData({
      keyword:'',
      resultList:[],
      showResultFlag:false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.key){
      console.log(options);
      this.setData({
        keyword:options.key,
        showResultFlag:true,
      })
      this.getResultList(options.key);
    }else{

    }
    this.getHistoryList();
    this.getHotList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})