/* eslint-disable */
/* tslint:disable */
import qs from "qs";
// import apiURL from "@/api";
// import { mapMutations, mapGetters } from "vuex";
import Ajax from "@/utils/ajax";
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          message: "hello",
          defaultAvatar:
            "https://sixeco-gtmc.oss-cn-beijing.aliyuncs.com/3x_7_TE3NTU1ODA4M%5B1%5D.png"
        };
      },
      computed: {

          fullPath() {
            let path = this.$route.fullPath;
            return  path;
          },
        // ...mapGetters(["getUser", "getCoffee", "getCoupon", "getGoods", "getGoodsCount", "getIntegral"]),
        // isLogin() {
        //   if (this.getUser && this.getUser.userId) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // },
        // isWx(){         //微信网页
        //   var ua = navigator.userAgent.toLowerCase();
        //   if(ua.match(/MicroMessenger/i)=="micromessenger") {
        //       return true
        //   }else{
        //       return false
        //   }
        // },
        // isIos() {        //ios环境
        //   // var ua = navigator.userAgent.toLowerCase();
        //   var ua = navigator.userAgent;
        //   if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //     return true
        //   } else {
        //     return false
        //   }
        // },
        // isAndroid() {    //android环境
        //   var ua = navigator.userAgent;
        //   if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
        //     return true
        //   } else {
        //     return false
        //   }
        // },
      },
      mounted() { },
      methods: {
        openMessage(message,type=1,duration=3000) {
          let messageType = 'info',
              title = '消息'
          switch(type) {
              case 0: messageType = 'error';title = '错误'; break
              case 1: messageType = 'success'; title = '成功';break
              case 2: messageType = 'info'; title = '消息';break
          }
          this.$message({
              showClose: true,
              type: messageType,
              message: message,
              duration: duration
          });
        },
        openWarning(message = '确认要执行这步操作吗？') {
          return new Promise((resolve, reject) => {
              this.$confirm(message, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  closeOnClickModal: false
              }).then(() => {
                  resolve('ok')
              }).catch(() => {
                  // this.$message({
                  //     type: 'info',
                  //     message: '已取消'
                  // });
                  reject('cancel')
              });
          })
        },
        goBack() {
          if (window.history.length < 2) {
            this.$router.replace("/");
          } else {
            this.$router.go(-1);
          }
        },
        gotoLink(url, title) {
          window.location.href = apiURL[url] || url;
        },
        linkto(item) {
          if (item.path) {
            this.$router.push({
              path: item.path
            });
          } else if (item.link) {
            window.location.href = apiURL + item.link;
          } else if (item.fn) {
            this.gotoLink(item.fn);
          }
        },
        findArr(arr,findkey,val){   //返回index
          for(var i in arr){
              if(arr[i][findkey]==val) return i
          }
          return undefined
      },
        scrollToTop() {
          window.scrollTo(0, 0);
        },
        isMobile(str) {
          var reg = /^1(2|3|4|5|6|7|8|9)\d{9}$/
          return reg.test(str + ''.trim())
        },
        getQueryFromUrl(type) {
          // let q = this.$route.query;
          // if (!q.mobile) {
          //   return;
          // }
          // this.M_SET_SRGUSER(q);
          // let header = {
          //   source: q.source,
          //   station: "JP"
          // };
          // this.M_SET_Header(header);
          // if (type == "boq") {
          //   this.axios
          //     .post("/sixeco-user/api/v2.1/login/srgRegisterSilence", q)
          //     .then(data => {
          //       this.M_SET_USER(data);
          //     });
          // }
        },
        getOSSSign1() {
          return new Promise((resolve, reject) => {
            this.$getData.getOSSSign().then(res => {
                resolve(res);
            })
            .catch(e => {
                console.log("获取oss签名失败", e);
                reject()
                if (e.code != 401) {
                    this.openMessage(e.msg);
                }
            });
          })
        },
        async getOSSSign() {
          let result = await this.$getData.getOSSSign().then(res => {
              // console.log(1111);
              return res
            })
            .catch(e => {
              console.log("获取oss签名失败", e);
              if (e.code != 401) {
                this.openMessage(e.msg,0);
              }
              return null
            });
          return result
        },
        async uploadService(type,file,insert) {
          // var type = files[0].type;
          var OSSOption = await this.getOSSSign();
          if(!OSSOption){
            insert?insert(null):'';
            return null
          }
          let filename = "";
          if(type=='1'){    //1=img/video;2=str;
            filename = new Date()/1 + file.name;
          }else{
            filename = new Date()/1 + 'a.html';
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
          if(type=='1'){    //1=img/video;2=str;
            formData.append("file", file);
            // fileUrl = OSSOption.host + "/" + OSSOption.dir + "/" + filename;
          }else{
            formData.append("file", new Buffer(file));
            // fileUrl = OSSOption.dir + '/' + filename;   //For SDK  upload & get
          }
          var config = {
              onUploadProgress: progressEvent => {
                  var complete = progressEvent.loaded / progressEvent.total * 100
                  this.$store.commit('SET_UPLOAD_PROGRESS', Math.round( complete ) );
              }
          }
          var result = await this.axios.post(OSSOption.host, formData, config )
            .then(res => {
            
              console.log("上传成功", fileUrl);
              this.$store.commit('SET_UPLOAD_PROGRESS', 0 );
              if(insert){
                if(~file.type.indexOf('image')){
                  // insert(fileUrl+'?x-oss-process=image/quality,q_80');
                  insert(fileUrl);
                }else{
                  insert(fileUrl);
                }
              }
              return fileUrl
            })
            .catch(e => {
              console.log("上传失败", e);
              insert?insert(null):'';
            });
          return  result
        },
        getOSSStr(url) {
          return new Promise((resolve,reject) =>{
              let obj = {
                  type: 'get',
                  url: url||'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/157708572084978.html',
                  timeout: 9000,
                  success: res=>{
                      resolve(res)
                  },
                  error: e=>{
                      console.log(e);
                  }
              }
              Ajax(obj,true);
          })
        },
      }
    });
  }
};
