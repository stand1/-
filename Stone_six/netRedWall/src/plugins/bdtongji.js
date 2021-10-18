import Vue from 'vue'
const du = () => {
  /*window._hmt = window._hmt || [];
  if (document.querySelector('#baidutongji')) {
    return
  }*/
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?6883d729eef79eea45e030f3c121f471";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    /*var hm = document.createElement("script");
    let loc = ''
    if (typeof window != "undefined") {
      loc = window.location.hostname || window.location.protocol
    }
    /!*if (loc.indexOf("iclubh5.gtmc.com.cn") > -1) {
      //正式
      hm.src = "https://hm.baidu.com/hm.js?39a4e2f6c97e972aa393daf56234a2ac"; //正式
    } else {
      hm.src = "https://hm.baidu.com/hm.js?e2b897f4778d2986368ea8e3cc3f7d1b"; //测试
    }*!/

    // hm.src = "https://hm.baidu.com/hm.js?39a4e2f6c97e972aa393daf56234a2ac";//正式
    hm.src = "https://hm.baidu.com/hm.js?6883d729eef79eea45e030f3c121f471";
    hm.id = 'baidutongji';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);*/
  })();
}

const bdtongji = (to) => {
  du();
  window._hmt && window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
}

export default bdtongji
