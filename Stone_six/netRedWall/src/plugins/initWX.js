import Qs from "qs";
import Vue from "vue";
import {
  getData
} from "@/api";

const getWxCfg = () => {
  return new Promise((resolve, reject) => {
    let obj = {
    //   url: '/api/v1.0/redt_b_user/share/getConfig',
    //  baseURL: 'https://test.rhealane.com/api/v1.0/redt_b_user/share/getConfig', //悦分享
       url: '/api/v2.0/monthRewardJ/share/config',
         baseURL: '', //悦分享
    method: "POST",
      params: {
        url: window.location.href.split("#")[0],
        project: 'photo'
      }
    }
    getData.formMainServer(obj).then(r => {
        resolve(r);
      })
      .catch(e => {
        console.log(e);
        reject(e);
      });
  });
};
const shareFN = (r, to = {}) => {
  // console.log(to, "share")
  if (!window.wx) {
    return
  }
  window.sessionStorage.setItem("wxShareCfg", JSON.stringify(r));
  let r2 = Object.assign({
      debug: false, // false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "", // 必填，公众号的唯一标识
      timestamp: "", // 必填，生成签名的时间戳
      nonceStr: "", // 必填，生成签名的随机串
      signature: "", // 必填，签名
      jsApiList: [
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "showMenuItems",
        "hideMenuItems",
        // 'onMenuShareWeibo',
        // 'onMenuShareQZone',
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "chooseImage",
        "uploadImage",
        "downloadImage",
        "scanQRCode",
        "stopRecord", "stopRecord", "uploadVoice" //录音功能
      ] // 必填，需要使用的JS接口列表
    },
    r
  );
  console.log( 'r2',r2 );
  let nameArr = ["highway", "personInfo", "poster", "address"]
  wx.config(r2);
  wx.ready(function () {
    console.log(nameArr.indexOf(to.name) == -1)
    let cfg = {}

    cfg = {
      title: to.meta.title, // 分享标题
      // desc: to.desc || "REDT", // 分享描述
      desc: to.title || to.meta && to.meta.title, // 分享描述
      link: to.link || window.location.href, //
      imgUrl: 'https://meet.sixeco.com/share_logo.png', // 分享图标
      // imgUrl:'http://test.rhealane.com/roadCare/share.jpeg',
      success: function () {
        // alert( JSON.stringify( cfg.link ) )
        console.log("分享成功");
      }
      // 用户取消分享后执行的回调函数
      // cancel: function () {
      //   console.log("分享到朋友取消");
      // }
    };


    wx.updateTimelineShareData(cfg);
    wx.updateAppMessageShareData(cfg);
    wx.onMenuShareTimeline(cfg);

    wx.startRecord({
      success: function () {

      },
      cancel: function () {
        alert("用户拒绝授权录音");
      },
    });
    setTimeout(() => {
      wx.stopRecord({
        success: function (res) {

        },
        fail: function (res) {
          // alert(JSON.stringify(res));
        },
      });
    }, 1000)
    wx.error(function (res) {
      console.log(res);
    });
    // alert( JSON.stringify( cfg.link ) )
  });
};
const shareWX = to => {
  let to2 = {
    ...to
  }
  if (!to2.link) {
    to2.link = window.location.origin + window.location.pathname + '#' + to.fullPath
  }
  // let cfg = JSON.parse(window.sessionStorage.getItem("wxShareCfg"));
  // if (cfg) {
  //   shareFN(cfg,to2);
  // } else {
  // console.log('to',to);
  /*getWxCfg().then(r => {
    shareFN(r, to2);
  });*/
  // }
};

export default shareWX;
