import {
  Toast
} from 'vant';
import Ajax from "./ajax";
const Minio = require("minio");
import router from '@/router';
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          msg: 'hello world',
        }
      },
      computed: {
        isApp() { //app
          let _window = window;
          if (_window && _window.baojun) {
            return true
          } else {
            return false
          }
        },
        isIosData() { //ios环境
          // var ua = navigator.userAgent.toLowerCase();
          var ua = navigator.userAgent;
          if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return true
          } else {
            return false
          }
        },
        isAndroid() { //android环境
          var ua = navigator.userAgent;
          if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
            return true
          } else {
            return false
          }
        },
        isWx() { //微信网页
          var ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true
          } else {
            return false
          }
        },
      },
      methods: {
        $msg(text) {
          const toast = this.$createToast({
            txt: text,
            type: 'txt'
          })
          toast.show()
        },
        getMath() { //生成随机4位字符串
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        toBuffer(ab) {
          var buf = new Buffer(ab.byteLength);
          var view = new Uint8Array(ab);
          for (var i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
          }
          return buf;
        },
        async uploadNewService(file) {
          var self = this;
          let obj = {};
          obj = await self.$getData.getMINIOSign();
          if (JSON.stringify(obj) == "{}") return;
          var minioClient = new Minio.Client({
            endPoint: "oss.sixeco.com",
            // port: 9000,
            useSSL: true,
            accessKey: obj.credentials.accessKeyId,
            secretKey: obj.credentials.secretAccessKey,
            sessionToken: obj.credentials.sessionToken
          });
          let metedata = {
            "content-type": file.type,
            "content-length": file.size,
          };
          let reader = new FileReader();
          reader.readAsArrayBuffer(file);
          return new Promise((resolve, reject) => {
            reader.onload = function (e) {
              let arrayBuffer = e.target.result;
              // ArrayBuffer ---> Buffer:
              let buffer = self.toBuffer(arrayBuffer);
              let imgTypes = '.jpg';
              let newDate = new Date() / 1;
              if (file.name.indexOf(".") != -1) {
                imgTypes = file.name.substring(file.name.indexOf("."));
              }
              minioClient.putObject(
                "redt-b",
                "img/" + 'REDT_B2_P' + newDate + imgTypes,
                buffer,
                metedata,
                function (err, etag) {
                  if (err) {
                    console.log('上传失败=>' + err)
                    return;
                  }
                  let str = 'https://oss.sixeco.com/redt-b/img/' + 'REDT_B2_P' + newDate + imgTypes;
                  console.log(str)
                  resolve(str);
                }
              );
            };
          })
        },
        getOSSStr(url) {

          return new Promise((resolve, reject) => {
            let obj = {
              type: 'get',
              url: url || 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/157708572084978.html',
              timeout: 9000,
              success: res => {
                console.log(7777)
                console.log(res)
                console.log(7777)
                resolve(res)
              },
              error: e => {
                reject()
                console.log(e);
              }
            }
            Ajax(obj, true);
          })
        },
        jumpout() {
          window.open('http://3js.sixeco.xyz:1890/bmwi8/mainindex.html')
        },
        jumpout2() {
          window.open('http://3js.sixeco.xyz:1890/bmwi8/neco_index.html')
        },
        async getOSSSign() {
          console.log('获取OssSign', this.$getData);

          let result = await this.$getData.getOSSSign().then(res => {
              // console.log();
              return res
            })
            .catch(e => {
              console.log("获取oss签名失败", e);
              if (e.code != 401) {
                this.openMessage(e.msg, 0);
              }
              return null
            });
          return result
        },
        goBack() {
          if (this.isApp) {
            if (this.isIosREDTApp) {
              // alert('ios返回');
              window.webkit.messageHandlers.REDTBackApp.postMessage(null);
            } else {
              window.REDT.REDTBackApp()
            }
          } else {
            if (window.history.length < 2) {
              router.replace("/");
            } else {
              router.go(-1);
            }
          }
        },
        openMessage(message, type = 1, duration = 3000) {
          let messageType = 'info',
            title = '消息'
          switch (type) {
            case 0:
              messageType = 'error';
              title = '错误';
              break
            case 1:
              messageType = 'success';
              title = '成功';
              break
            case 2:
              messageType = 'info';
              title = '消息';
              break
          }

          // Notify({
          //   type: 'warning',
          //   message: message
          // })
          Toast(message)
          // this.$message({

          // });
        },
        async uploadService(type, file, insert) {
          // var type = files[0].type;
          var OSSOption = await this.getOSSSign();
          if (!OSSOption) {
            insert ? insert(null) : '';
            return null
          }
          let filename = "";
          if (type == '1') { //1=img/video;2=str;
            filename = new Date() / 1 + file.name;
          } else {
            filename = new Date() / 1 + 'a.html';
          }
          var formData = new FormData();
          formData.append("key", OSSOption.dir + "/" + filename); //存储在oss的文件路径
          formData.append("OSSAccessKeyId", OSSOption.accessid); //accessKeyId
          formData.append("policy", OSSOption.policy); //policy
          formData.append("Signature", OSSOption.signature);
          formData.append("callback", OSSOption.callback);
          formData.append("success_action_status", 200); //成功后返回的操作码
          var fileUrl = "";
          fileUrl = OSSOption.host + "/" + OSSOption.dir + "/" + filename;
          if (type == '1') { //1=img/video;2=str;
            formData.append("file", file);
            // fileUrl = OSSOption.host + "/" + OSSOption.dir + "/" + filename;
          } else {
            formData.append("file", new Buffer(file));
            // fileUrl = OSSOption.dir + '/' + filename;   //For SDK  upload & get
          }
          var result = await this.axios.post(OSSOption.host, formData)
            .then(res => {
              console.log("上传成功", fileUrl);
              if (insert) {
                if (~file.type.indexOf('image')) {
                  // insert(fileUrl+'?x-oss-process=image/quality,q_80');
                  insert(fileUrl);
                } else {
                  insert(fileUrl);
                }
              }
              return fileUrl
            })
            .catch(e => {
              console.log("上传失败", e);
              insert ? insert(null) : '';
            });
          return result
        },
        headerPaddingStyle() {
          return {
            paddingTop: this.headerPaddingTop + 'px',
            boxSizing: 'content-box'
          }
        },
        getAppStatusBarHeight() {
          let that = this
          if (this.isApp) {
            if (that.headerPaddingTopNum) {
              return that.headerPaddingTopNum
            } else {
              if (this.isIosREDTApp) {
                window.getREDTAppStatusBarHeight = function (num) {
                  // alert(num);
                  that.headerPaddingTopNum = num;
                }
                window.webkit.messageHandlers.getREDTAppStatusBarHeight.postMessage(null);
              } else {
                that.headerPaddingTopNum = window.REDT.getREDTAppStatusBarHeight();
              }
            }
          } else {
            return 0
          }
        },
        getOSSStr(url) {
          return new Promise((resolve, reject) => {
            let obj = {
              type: 'get',
              url: url || 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/157708572084978.html',
              timeout: 9000,
              success: res => {
                resolve(res)
              },
              error: e => {
                reject()
                console.log(e);
              }
            }
            Ajax(obj, true);
          })
        },
        async getOSSStrForSDK(url) {
          var OSSKey = await this.getOSSKey().then(res => {
              return res;
            })
            .catch(() => {
              return null
            })
          var client = new OSS({
            region: "oss-cn-shenzhen",
            success_action_status: "200", // 默认200
            accessKeyId: OSSKey.accessid,
            accessKeySecret: OSSKey.key,
            bucket: OSSKey.bucket,
            secure: true
          });
          // let dir = 'redt-user-files' + '/' + '6666.txt';
          let dir = url;
          try {
            let result = await client.get(dir);
            // console.log('content',result.content);
            console.log('content', result.content.toString('utf-8'));
          } catch (e) {
            console.log(e);
          }
        }
      }
    })
  }
}