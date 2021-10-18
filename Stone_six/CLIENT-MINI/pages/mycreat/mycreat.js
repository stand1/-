import http from "../../api/index";

Page({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: 'page/weui/example/tabs/tabs'
    }
  },
  data: {
    active: 0          ,
    noramalData: [{
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
        "CoverHeight": 467,
        "pCoverHeight": "tag css 可以自己算",
        "CoverWidth": 350,
        "tag":"江山",
        "timetop":"time 距离顶部",
        "time":"假数据"
      },
      
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
        "CoverHeight": 871,
        "pCoverHeight": -871/2,
        "CoverWidth": 672,
        "tag":"多娇",
        "timetop":"time 距离顶部",
        "time":"14小时前"
      },
      {
        "Cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg",
        "CoverHeight": 320,
        // "pCoverHeight": -680/2,
        "CoverWidth": 680,
        "tag":"如此",
        // "timetop":"time 距离顶部",
        "time":"20小时前"
      },
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
        "CoverHeight": 467,
        "pCoverHeight": -467/2,
        "CoverWidth": 350,
        "tag":"引无",
        "timetop":"time 距离顶部",
        "time":"10时前"
      },
      
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
        "CoverHeight": 871,
        "pCoverHeight": -871/2,
        "CoverWidth": 672,
        "tag":"雄竞",
        "timetop":"time 距离顶部",
        "time":"10小时"
      },
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
        "CoverHeight": 467,
        "pCoverHeight": -467/2,
        "CoverWidth": 350,
        "tag":"折腰",
        "timetop":"time 距离顶部",
        "time":"0小时前"
      },
      
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
        "CoverHeight": 871,
        "pCoverHeight": -871/2,
        "CoverWidth": 672,
        "tag":"毛主席",
        "timetop":"time 距离顶部",
        "time":"万岁"
      },
      {
        "Cover": "http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png",
        "CoverHeight": 320,
        "pCoverHeight": -680/2,
        "CoverWidth": 680,
        "tag":"数英",
        "time":"10小时前"
      },
    ],
    leftList: [],
    rightList: [],
    leftHight: 0,
    rightHight: 0
  },
  //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现
  async onLoad() {

    let res = await http.get("v1.0/redt_b_material/post/myPost", {
      userId:wx.getStorageSync("useInfo").id || 'sale_3',
      type:1,//1图片 2视频
    })
    console.log(res)
    if (res.code == 200) {
      this.setData({
        // noramalData:res.data.records,
      })
    }

    const tabs = [{
        title: '技术开发',
        title2: '小程序开发进阶',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg',
        desc: '本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。',
      },
      {
        title: '产品解析',
        title2: '微信小程序直播',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png',
        desc: '微信小程序直播系列课程持续更新中，帮助大家更好地理解、应用微信小程序直播功能。',
      },
      {
        title: '运营规范',
        title2: '常见问题和解决方案',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSGqys4ibO2a8L9nnIgH0ibjNXfbicNbZQQYfxxUpmicQglAEYQ2btVXjOhY9gRtSTCxKvAlKFek7sRUFA/0?wx_fmt=jpeg',
        desc: '提高审核质量',
      },
      {
        title: '营销经验',
        title2: '流量主小程序',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSH2Eic4Lt0HkZeEN08pWXTticVRgyNGgBVHMJwMtRhmB0hE4m4alSuwsBk3uBBOhdCr91bZlSFbYhFg/0?wx_fmt=jpeg',
        desc: '本课程共四节，将分阶段为开发者展示如何开通流量主功能、如何接入广告组件、不同类型小程序接入的建议，以及如何通过工具调优小程序变现效率。',
      },
      {
        title: '高校大赛',
        title2: '2020中国高校计算机大赛',
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/TcDuyasB5T3Eg34AYwjMw7xbEK2n01ekiaicPiaMInEMTkOQtuv1yke5KziaYF4MLia4IAbxlm0m5NxkibicFg4IZ92EA/0?wx_fmt=jpeg',
        desc: '微信小程序应用开发赛',
      },
    ]
    var that = this;
    var allData = that.data.noramalData;
    //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
    var leftH = that.data.leftHight;
    var rightH = that.data.rightHight;
    var leftData = [];
    var rightData = [];
    for (let i = 0; i < allData.length; i++) {
      var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
      allData[i].pCoverHeight = -parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth)) + "rpx";
      // 减去本身的高度，减去距离底部的高度，减去左上角tag的高度，因为是相对左上角tag来算位置的
      allData[i].timetop = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth))-82-50+"rpx";
      
      allData[i].CoverHeight = currentItemHeight + "rpx"; //因为xml文件中直接引用的该值作为高度，所以添加对应单位
      // var pH = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
      console.log(allData[i].pCoverHeight)
      if (leftH == rightH || leftH < rightH) { //判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
        leftData.push(allData[i]);
        leftH += currentItemHeight;
      } else {
        rightData.push(allData[i]);
        rightH += currentItemHeight;
      }
    }

    //更新左右两栏的数据以及累计高度
    that.setData({
      leftHight: leftH,
      rightHight: rightH,
      leftList: leftData,
      rightList: rightData
    })
  },

  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  // onChange(e) {
  //   const index = e.detail.index
  //   this.setData({ 
  //     activeTab: index 
  //   })
  // },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
  }
})