<template>
  <div id="app" @touchend="moveEvent" @click="moveEvent">
    <router-view :key="key" />

      <!-- <div class="rotateView">
        <img src="@/assets/images/home/backgroundportrait.png" alt="">
      </div> -->
      <!-- <div :class="['fill','iconfont',isFullscreen?'icon-ln_quanpingtuichu':'icon-quanping'] -->
<!-- " @click="buttoncli"></div> -->


    <logins ref="logins"></logins>
  </div>
</template>
<script>
	import screenfull from 'screenfull'
import { getData } from "@/api";
export default {
  data() {
    return {
      // 用户超时定时器
      timmer: null,
      recordsObj: {},
      timer: "",
      isFullscreen: false
    };
  },
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
    }
 },
  created() {
   // this.renderResize();
    // this.isLogin();

   // this.createTourClient()
  },
  mounted() {
    window.addEventListener("resize", this.renderResize, false);
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  methods: {
    /**
     监听鼠标滑动和点击事件，重置页面用户未操作超时时间
     */
    moveEvent() {
      clearTimeout(this.timmer);
      if(localStorage.getItem('showBar')){
        let arr = localStorage.getItem('showBar')
        arr == 'showBar=0' ? this.init() : ''
      }
      /*let path = window.location.href.split("?")[1]
      if(path){
        path == 'showBar=0' ? this.init() : ''
      }*/

    },
    /**
     用户超时定时器 5秒钟
     */
    init() {
      console.log(2);
      this.timmer = setTimeout(() => {

        // 执行事件
        this.$router.push({
          path: "/search"
        });
      }, 60000);
    },
    isLogin() {
      getData
        .isLogin()
        .then(res => {
          if (!res) {
            this.$store.commit("SETLOGINSTATUS", 1);
            this.$refs.logins.open();
            this.$store.commit("SETUSERINFO", "");
          } else {
            this.$store.commit("SETLOGINSTATUS", 2);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    renderResize() {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      if (width > height) {

        this.$store.commit("SETSCROLLSTATUS", 2);
      } else {

        this.$store.commit("SETSCROLLSTATUS", 1);
      }
    },
    buttoncli(){
      if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示

        }
      screenfull.toggle()
      this.isFullscreen=!this.isFullscreen
		},
    saveAccessRecords() {
      let param = {
        accessType: 1
      };
      getData
        .saveAccessRecords(param)
        .then(res => {
          this.recordsObj = res;
          this.$store.commit("SETANYID", res.anyId);
          setTimeout(() => {
            this.addAccessRecordsEndTime();
          }, 5000);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createTourClient() {

      getData
        .createTourClient()
        .then(res => {
          this.recordsObj = res;
          this.$store.commit("SETANYID", res.anyId);
       this.saveAccessRecords();
        })
        .catch(e => {
          console.log(e);
        });
    },
    addAccessRecordsEndTime() {
      let param = {
        accessRecordsId: this.recordsObj.id,
        anyId: this.recordsObj.anyId
      };
      getData
        .addAccessRecordsEndTime(param)
        .then(res => {
          //  alert(1)
          this.timer = setTimeout(() => {
            this.addAccessRecordsEndTime();
          }, 60000);
        })
        .catch(e => {});
    }
  }
};
</script>
<style lang="less">

@media screen and (orientation: portrait) {
  /* 竖屏 */

  .rotateView {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    color: #fff;
    font-size: 40px;
    overflow-y: auto;
    img{
      display: block;
      width: 100%;
    }
    // z-index: 2020;
  }
}

@media screen and (orientation: landscape) {
  /* 横屏 */

  .rotateView {
    display: none;
  }
}
#app {
  font-family: sans-serif;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  text-align: left;
  width: 100vw;
  height: 100%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.tac {
  text-align: center;
}
.flex {
  display: flex;
}
* {
  font-size: 12px;
}
// .fill::before{

//   // position: fixed;
//   // left:1.6rem;
//   // top:0.1rem;
//   // color:#fff;
//   // font-size: 0.6rem;

//   position: absolute;
//   right: 0.93rem;
//   top: 0.195rem;
//   color:#fff;
//   width: 0.22rem;
//   height: 0.22rem;
// }
// .icon-quanping:before{
//   font-size: 0.12rem;
// }


// #app{
//   width: 100% !important;
//   height: 100% !important;
// }


</style>
