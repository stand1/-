// components/3Dwatch/index.js

var index = 1;
var lastIndex = 1;
var num = 12;
var speed = 20;

function showImg() {
  if (index < 0) {
    index = num;
  } else if (index >= num) {
    index = 1;
  }
  let src = 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/mini/images/car/yellow000' + index + '.png';
  // console.log(src)
  return index
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    imgSrc: {
      type:Object,
      value:[
    ]
    },
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    sindex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    touchStart(e) {
      // console.log(e)
      this.setData({
        "touch.x": e.changedTouches[0].clientX,
        "touch.y": e.changedTouches[0].clientY
      });
    },
    touchEnd(e) {
      let x = e.changedTouches[0].clientX;
      let y = e.changedTouches[0].clientY;
      // console.log(this.data.touch, x, y)
  
      //dis是移动了多少距离,向右拉时:evt.clientX为正,dis为负数,那么就图片
      var dis = this.data.touch.x - x;
      //根据移动多少距离来移动多少张图片,
      //lastIndex记录最后一次停留的图片.jpg
      index = Math.floor(dis / speed) % num + lastIndex;
      //index会有正有负
  
      if (index < 0) {
        index = index % num + num;
      } else if (index >= num) {
        index = index % num;
      }
      // console.log(index)
      this.setData({
        sindex: showImg()
      });
    },
  
  }
})
