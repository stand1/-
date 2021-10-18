// pages/templateDetail/tempCard/tempCardD/tempCardD.js
import API from '../../../../api/base';
Page({
  data: {
    windowWidth: 0, //屏幕宽度
    windowHeight: 0,//屏幕高度
    contentHeight: 0,//内容高度
    thinkList: [], //文字超出换行处理
    lineHeight: 30, //固定值
    contentTitle: "段杨杨", //商品标题
    canvasUrl: "", //canvas李彪
    qrCode: "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602745900962redt_e300.jpeg", //小程序码https图片路径
    userImg: "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/160125547050801.png",  //user图片
    imgs: "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602828002197redt_e300.png", // 背景图
    name: "段杨杨",
    position: "销售顾问",
    phone: "136 9482 4093",
    phoneIcon: "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602742769670redt_e300.png",
    storeAddress: "广汽丰田深圳兆方店",
    storeAddressIcon: "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602745054504redt_e300.png",
    address: "广东省深圳市南山区丽水路1052号",
    addressIcon: "https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1602742744010redt_e300.png",
    iconWidth: 14,
    iconHeight: 14
  },

  onLoad: function (options) {
    let that = this;
    //获取设备信息高度。计算出其他的高度等
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          normalPageX: res.windowWidth * 0.2587,
            // res.windowWidth - (res.windowWidth + res.windowWidth * 0.56) / 2, //左边文本图片X轴位置
          boxWidth: res.windowWidth * 0.92, //分享图片box宽度
          boxheight: res.windowWidth * (0.222 + 0.72 + 0.192) + 110, //分享图片box高度
          boxPageY: res.windowWidth * 0, //boxY轴位置
          imgWidth: res.windowWidth * 0.6987, //user图片宽度
          imgHeight: res.windowWidth * 0.8053, //user图片高度
          imgPageY: res.windowWidth * 0.1947, //user图片Y轴位置
          codeWidth: res.windowWidth * 0.1413, //小程序码图片宽度
          codeHeight: res.windowWidth * 0.1413, //小程序码图片高度
          codePageY: res.windowWidth * 1.245, //小程序码Y轴位置
          avatarPageY: res.windowWidth * 0.2587 + res.windowWidth * 0.8053 + 88, //地址IconY轴位置
          titlePageY: res.windowWidth * 0.2587 + res.windowWidth * 0.8053 + 100, //地址Y轴位置
          specPageY: res.windowWidth * 0.2587 + res.windowWidth * 0.8053 + 50, //手机Y轴位置
          pricePageY: res.windowWidth * 0.2587 + res.windowWidth * 0.8053 + 15, //姓名职位Y轴位置
          timePageY: res.windowWidth * 0.2587 + res.windowWidth * 0.8053 + 75 //门店地址Y轴位置
        });
      }
    });
    //网络图片转为本地图片，直接显示网络图片的话真机不显示
    that.getUserInfo();
    // }
  },
  // 获取用户信息
  getUserInfo () {
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    let pamer = {
      userId: wx.getStorageSync('useInfo').id || 'sale_1'
    }
    API.getTempUserInfo(pamer).then((res) => {
      wx.hideLoading();
      if (res.code == 200) {
        this.setData({
          name: res.data.userName,
          position: res.data.roleName,
          userImg: res.data.userAvatar,
          phone: res.data.userMobile,
          storeAddress: res.data.storeName,
          address: res.data.storeAddress,
          qrCode: res.data.wxacode
        })
        this.getTempFile(this.data.imgs,1);
        this.getTempFile(this.data.userImg,2);
        this.getTempFile(this.data.phoneIcon,3);
        this.getTempFile(this.data.storeAddressIcon,4);
        this.getTempFile(this.data.addressIcon,5);
      }
    }).catch((e) => {
      wx.hideLoading();
      wx.showToast({
        title: e.msg,
        icon: 'none',
        duration: 2000
      })
    })
  },
  //临时图片路径
  getTempFile: function (url,i) {
    wx.showLoading({
    });
    let that = this;
    wx.downloadFile({
      url: url,
      success: function (res) {
        console.log("res.tempFilePath===>", res.tempFilePath)
        switch (i) {
          case 1:
            that.setData({
               imgs: res.tempFilePath
            });
            break;
          case 2: 
            that.setData({
               userImg: res.tempFilePath
            }); 
            //继续生成商品的小程序码
            that.downloadSkuQrCode(that.data.qrCode);
          break;
          case 3: 
            that.setData({
               phoneIcon: res.tempFilePath
            }); 
          break;
          case 4: 
            that.setData({
              storeAddressIcon: res.tempFilePath
            }); 
          break;
          case 5: 
            that.setData({
               addressIcon: res.tempFilePath
            }); 
          break;
        }
      },
      fail: function (err) { }
    });
  },
  getData: function () {
    let that = this;

    let i = 0;
    let lineNum = 1;
    let thinkStr = "";
    let thinkList = [];
    for (let item of that.data.address) {
      if (item === "\n") {
        thinkList.push(thinkStr);
        thinkList.push("a");
        i = 0;
        thinkStr = "";
        lineNum += 1;
      } else if (i === 21) {
        thinkList.push(thinkStr);
        i = 1;
        thinkStr = item;
        lineNum += 1;
      } else {
        thinkStr += item;
        i += 1;
      }
    }
    thinkList.push(thinkStr);
    that.setData({
      thinkList: thinkList
    });
    that.createNewImg(lineNum);
  },

  //画矩形，也是整块画布的大小，宽度是屏幕宽度，高度根据内容多少来动态设置。
  drawSquare: function (ctx, height) {
    let that = this;
    ctx.drawImage(
      that.data.imgs,
      that.data.windowWidth * 0.0427,
      that.data.boxPageY,
      that.data.boxWidth,
      height
    );
  },

  // 设置文字大小，并填充颜色。
  drawFont: function (ctx, contentTitle, height) {
    let that = this;
    let str = that.data.address;
    let firstline;
    let secondline;
    //一行显示14个字，超过一行时
    if (str.length > 14) {
      //第一行截取前14个字符
      firstline = str.substring(0, 14);
      //两行都显示不下
      if (str.length > 28) {
        secondline = str.substr(14, 14) + "...";
      } else {
        //第二行取剩下的
        secondline = str.substr(14, str.length - 14);
      }
    } else {
      //一行就能显示时候
      firstline = str;
    }
    ctx.drawImage(
      that.data.addressIcon,
      that.data.normalPageX,
      that.data.avatarPageY,
      that.data.iconHeight,
      that.data.iconWidth
    );
    ctx.setFontSize(12);
    ctx.setFillStyle("#FFF");
    ctx.fillText(firstline, that.data.normalPageX + 18, that.data.titlePageY);
    if (secondline) {
      ctx.setFontSize(12);
      ctx.setFillStyle("#FFF");
      ctx.fillText(
        secondline,
        that.data.normalPageX + 18,
        that.data.titlePageY + 17
      );
    }
  },
  // 根据文字多少动态计算高度，然后依次画出矩形，文字，横线和小程序码。
  createNewImg: function (lineNum) {
    let that = this;
    let ctx = wx.createCanvasContext("myCanvas");
    let contentHeight = that.data.boxheight;
    that.drawSquare(ctx, contentHeight);
    that.setData({
      contentHeight: contentHeight
    });
    let height = 100;
    for (let item of that.data.thinkList) {
      if (item !== "a") {
        that.drawFont(ctx, item, height);
        height += that.data.lineHeight;
      }
    }
    //user图片
    ctx.drawImage(
      that.data.userImg,
      that.data.windowWidth * 0.2587,
      that.data.imgPageY,
      that.data.imgWidth,
      that.data.imgHeight
    );
    // 姓名
    ctx.setFontSize(18);
    ctx.setFillStyle("#fff");
    ctx.font = "PingFangSC-Regular, PingFang SC";
    ctx.fillText(that.data.name, that.data.normalPageX-0.5, that.data.pricePageY);
    ctx.fillText(that.data.name, that.data.normalPageX, that.data.pricePageY-0.5);
    // 职位
    ctx.setFontSize(12);
    ctx.setFillStyle("#FFF");
    ctx.fillText(
      that.data.position,
      that.data.normalPageX + ctx.measureText(that.data.name).width + 50,
      that.data.pricePageY
    );
    // 手机号码 
    ctx.drawImage(
      that.data.phoneIcon,
      that.data.normalPageX,
      that.data.specPageY - 12,
      that.data.iconHeight,
      that.data.iconWidth
    );
    ctx.setFontSize(12);
    ctx.setFillStyle("#FFF");
    ctx.fillText(
      that.data.phone,
      that.data.normalPageX + 18,
      that.data.specPageY
    );
    // 门店地址
    ctx.drawImage(
      that.data.storeAddressIcon,
      that.data.normalPageX,
      that.data.timePageY - 12,
      that.data.iconHeight,
      that.data.iconWidth
    );
    ctx.setFontSize(12);
    ctx.setFillStyle("#FFF");
    ctx.fillText(
      that.data.storeAddress,
      that.data.normalPageX + 18,
      that.data.timePageY
    );
    // 填充小程序码
    ctx.drawImage(
      that.data.qrCode,
      that.data.windowWidth * 0.8,
      that.data.codePageY,
      that.data.codeWidth,
      that.data.codeHeight
    );
    ctx.draw(); //绘制到canvas
  },

  // 保存图片
  savePic: function () {
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth * 2,
      height: that.data.contentHeight * 2,
      canvasId: "myCanvas",
      success: function (res) {
        // util.savePicToAlbum(res.tempFilePath);
        API.uploadFile(res.tempFilePath).then((datas) => {
          let pamer = {
            userId: wx.getStorageSync('useInfo').id || 'sale_1',
            watermarkImage: '',
            backgroundImage: '',
            cover: datas,
            name: '',
            templateType: parseInt(wx.getStorageSync('tempType')) || null,
            type: '',
            tag: ''
          }
          API.uploadImg(pamer).then((resData) => {
            wx.hideLoading();
            if (resData.code == 200) {
              that.setData({
                canvasUrl: datas
              });
              wx.navigateTo({
                url: '/pages/templateDetail/savedSuccess/savedSuccess?src=' + datas,
             })
            }
          }).catch((e) => {
            wx.hideLoading();
            wx.showToast({
              title: e.msg,
              icon: 'none',
              duration: 2000
            })
          })
        })
        return
        if (tempFilePath !== "") {
          wx.hideLoading();
          wx.previewImage({
            current: that.data.canvasUrl, // 当前显示图片的http链接
            urls: [that.data.canvasUrl], // 需要预览的图片http链接列表
            success: function (_res) {
              console.log("预览成功啦");
            }
          });
        }
      }
    });
  },
  //下载小程序码
  downloadSkuQrCode: function (url) {
    let that = this;
    wx.downloadFile({
      url: url,
      success: function (res) {
        that.setData({
          qrCode: res.tempFilePath
        });
        wx.hideLoading();
        //生成数据
        that.getData();
      },
      fail: function (err) {
        wx.showToast({
          title: "下载商品码失败,稍后重试！",
          icon: "none",
          duration: 5000
        });
      }
    });
  },

  //点击保存到相册
  saveShareImg: function () {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) { }
                },
                fail: function (res) { }
              })
            },
            fail: function (res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  } 
});