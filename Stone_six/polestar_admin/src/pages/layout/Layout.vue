<template>
	<div class="app-wrapper">
		<navBar is-show="1"></navBar>
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<!-- <navbar></navbar> -->
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
// import { Sidebar, Navbar, AppMain } from "../layout";
import { Sidebar, AppMain } from "../layout";
import navBar from "../../components/navBar";
import { getData } from '@/api';
import { mapGetters } from "vuex";

export default {
  name: "layout",
  components: {
    // Navbar,
    Sidebar,
    AppMain,
	navBar
  },
  computed: {
   ...mapGetters(["getUserId"]),
  },
  mounted() {
    // this.checkLogin()
    // this.socketApi.initWebSocket(this.getUserId+'',1);
    // this.socketApi.onDisconnect()
  },
  methods: {
    checkLogin() {
      let _this = this;
      getData.isLogin({}).then(res=>{
      // console.log(res);
      }).catch((e) => {
        if(e.code==500){
          this.openMessage(0,'未登录或未操作时间过长，请登录',2000);
          myApp.$router.push("/")

          // myApp.$Message.error({    iview的msg
          // 	content: '未登录或未操作时间过长，请登录',
          // 	duration: 5
          // });
          // myApp.$router.push("/")
        }
      })
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 164px;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 101px;
    bottom: 0;
    left: 0;
    z-index: 102;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left:164px;
	padding-top: 102px;
    display: flex;
    flex-direction: column;
  }
}
</style>
