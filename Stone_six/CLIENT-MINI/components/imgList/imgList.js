// components/imgList/imgList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList: {
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 1,
 
    checkedArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择图片
    checkedImg(e) {
      //获取可以上传图片的最大值
      let maxNum = wx.getStorageSync('maxNum');
      console.log("maxNum--",maxNum);


      let i = e.currentTarget.dataset.i
      let list = this.data.imgList
      if (this.data.checkedArr.indexOf(i) == -1) {
        console.log(maxNum);
        console.log(this.data.checkedArr.length);
        if(this.data.checkedArr.length>=maxNum){
          return wx.showToast({
            title: `一次最多同时上传${maxNum}张`,
            icon: 'none',
            duration: 2000
          })
        }
        this.data.checkedArr.push(i);
        list[i].isChecked = true;
        list[i].num = this.data.checkedArr.length
      } else {
        this.data.checkedArr.splice(this.data.checkedArr.indexOf(i), 1)
        list[i].isChecked = false;
        let num = list[i].num;
        list[i].num = 0;
        list.forEach((item, key) => {
          if (item.num > num) {
            item.num -= 1;
          }
        })
      }
      this.setData({
        imgList: list
      })
    },
    // 确定
    seva() {
      let types = wx.getStorageSync('tempTypes');
      console.log('types---',types);

      if (!this.data.checkedArr.length) {
        wx.showToast({
          title: '请勾选图片',
        })
        return
      }
      let arr = []
      this.data.checkedArr.map(res => {
        arr.push(this.data.imgList[res].url)
      })
console.log(arr)
      if (!types) {
        console.log(this.data.checkedArr)

        //返回上一页
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          mydata: {
            url: arr,
            richText:wx.getStorageSync('richText')?1:0,
          }
        })
      }


      switch (types) {
        case 'poster':
          wx.navigateTo({
            url: '/pages/templateDetail/buildTemp/buildTemp?src=https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/160125614168303.png',
          })
          break;
        default:
          wx.navigateBack({
            delta: 1,
          })
          break;
      }

    }
  }
})