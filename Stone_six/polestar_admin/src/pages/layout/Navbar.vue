<template>
	<el-menu class="navbar" mode="horizontal" style="height:50px">
	
		<levelbar></levelbar>
		<!-- <tabs-view></tabs-view> -->
		<error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
		<div class="seat-navbar" style="float:right;">
			<!-- <div class="high-light pointer" @click="openCallLogin">话机登录</div> -->
			<div>在线的用户人数：<span class="high-light">{{tipObj.serviceClientCount}}</span></div>
			<div>当前排队人数：<span class="high-light">{{tipObj.waitClientCount}}</span></div>
			<div>在线助理数：<span class="high-light">{{tipObj.agentCount}}</span></div>
			<div>助理忙：{{tipObj.agentBusyCount?tipObj.agentBusyCount:0}}</div>
      <el-dropdown trigger="click" >
        <span class="el-dropdown-link high-light" style="cursor: pointer;font-size:12px;"  @click="toggleDropdownStatus">关联系统<i :class="[dropdownStatus?'el-icon-arrow-up':'el-icon-arrow-down','el-icon--right']"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <a target='_blank'  href="javascript:void(0);">
				  	<el-dropdown-item>
						  商城系统
					  </el-dropdown-item>
				  </a>
          <a target='_blank'  href="javascript:void(0);">
				  	<el-dropdown-item>
						  门店系统
					  </el-dropdown-item>
				  </a>
           <a target='_blank'  href="javascript:void(0);">
				  	<el-dropdown-item>
						  用车指南
					  </el-dropdown-item>
				  </a>
           <a target='_blank'  href="javascript:void(0);">
				  	<el-dropdown-item>
						  酷屏后台
					  </el-dropdown-item>
				  </a>
         
        </el-dropdown-menu>
      </el-dropdown>
      <div class="statusImg-container left">
        <!-- <img src="../../assets/images/online.png" alt=""> -->
        <i-switch size="large" v-model="connectFlag" @on-change="setConnectStatus">
          <span slot="open">就绪</span>
          <span slot="close"></span>
        </i-switch>
      </div>
      <div class="statusImg-container">
        <!-- <img src="../../assets/images/busy.png" alt="">       :disabled="!connectFlag"     -->   
        <i-switch size="large" :disabled="!connectFlag"  v-model="isBusyFlag" @on-change="setBusyStatus">
          <span slot="open">示忙</span>
          <span slot="close">示闲</span>
        </i-switch>
      </div>
		</div>

		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<!-- <img class="user-avatar" v-if="getAgentAvatar" :src="getAgentAvatar"> -->
				<!-- <img class="user-avatar" v-if="false" :src="getAgentAvatar">
				<img class="user-avatar" v-else src="http://pic.51yuansu.com/pic3/cover/00/94/67/58dcd69ac0bf8_610.jpg" alt=""> -->
        <span style="color:#F9743C">{{getAgentName}}</span>
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <el-dropdown-item>
					{{getAgentName}}
				</el-dropdown-item> -->
				<!-- <router-link class='inlineBlock' to="/">
					<el-dropdown-item divided>
						首页
					</el-dropdown-item>
				</router-link> -->
        <el-dropdown-item divided>
          <span @click="changeInfo" style="display:block;">修改密码</span>
        </el-dropdown-item>
				<el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    <!-- <audio style="display:none"  preload="metadata" controls="controls"  ref="statusTipsAudio">
      <source src="../../../static/audio/statustips.mp3" type="audio/mpeg"/>
    </audio> -->   
    
    <!-- <audio style="display:none"  preload="metadata" controls="controls"  ref="newAudio">
      <source src="../../../static/audio/new.mp3" type="audio/mpeg"/>
    </audio> -->
    
     <!-- <Dialog ref="callLoginDialog" title="话机登录" type="callLogin"></Dialog> -->
    <Dialog ref="changeInfoDialog" title="修改密码" type="changeInfo"></Dialog> 
	</el-menu>
</template>

<script>
import { getData } from "@/api";
import { mapGetters } from "vuex";
import Levelbar from "./Levelbar";
import TabsView from "./TabsView";



import errLogStore from "@/store/errLog";
import { localKey,projectKey} from '@/api/config/ip-config'


export default {
  name: 'navbar',
  data() {
    return {
      log: errLogStore.state.errLog,
      dropdownStatus: false,
      MsgKey:'',
      tipObj: {
        agentCount: 0,
        serviceClientCount: 0,
        waitClientCount: 0,
        agentBusyCount: 0
      },
      // isBusyFlag: false,
    };
  },
  components: {
    Levelbar,
    TabsView,
 
 

  },
  computed: {
    ...mapGetters(["sidebar", "name","getAgentName", "getAgentAvatar","getUserId","getSocketStatus","getBusyStatus"]),
    connectFlag:{
      get(){
        return this.getSocketStatus*1==1?true:false;
      },
      set(){
        return 
      }
    },
    isBusyFlag:{
      get(){
        // console.log('this.getBusyStatus3333333333333333',this.getBusyStatus);
        return this.getBusyStatus*1==1?true:false;
      },
      set(newValue){
        console.log('newValue',newValue);
      }
    }
  },
  created() {    
    this.MsgKey = projectKey
    this.socketApi.set_callback('statistics',this.navbarStatus_callback);
    this.socketApi.set_callback('close',this.close_callback);
  },
  mounted() {
    // console.log('connectFlag',this.connectFlag);
    // console.log('isBusyFlag',this.isBusyFlag);
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    toggleDropdownStatus(){
      this.dropdownStatus = !this.dropdownStatus
      console.log(this.dropdownStatus);
    },   
    setConnectStatus(status){
      // console.log('this.isBusyFlag',this.isBusyFlag);
      // return     connectFlag
      console.log(status);
      if(status){     
         console.log('connectFlag',this.connectFlag);
        this.socketApi.initWebSocket(this.getUserId,1)
        // getData.getAgentStatus().then(res => {
        //   console.log('当前助理的状态为：',res);
        //   if(res=="UN_READY"){  
        //     this.socketApi.initWebSocket(this.getUserId)
        //   }else{
        //     this.openMessage(0, "该助理已上线请不要重复上线");
        //   }
        // }).catch(e => {
        //   if (e && e.msg) {
        //     this.openMessage(0, e.msg);
        //   } else {
        //     this.openMessage(0, "您的网络环境不佳，请稍后再试！");
        //     console.log(e);
        //   }
        // });
      }else{

        console.log('断开status',status);  
        this.socketApi.onDisconnect()
        this.tipObj = {
          agentCount: 0,
          serviceClientCount: 0,
          waitClientCount: 0,
          agentBusyCount: 0
        }

        //判断是否全部做完工单  --暂时不改
        // getData.checkAllOnoffline().then(res=>{
        //   console.log(res);
        //   if(res==1){
        //     console.log('断开status',status);  
        //     this.socketApi.onDisconnect()
        //   }else{
        //     console.log('断开status',status);  
        //     this.socketApi.onDisconnect()
        //     this.openWarning('还有客户没有做工单，请记得做工单').then(res=>{
        //       // console.log('点击了确定');  
        //     }).catch(e => {
        //       console.log('点击了取消');  
        //     })
        //   }
        // })
      }
    },
    setBusyStatus(status){
      console.log('示忙status',status);
      let param = {
        agentId: this.getUserId, 
        isbusy: status
      }
      getData.agentBusyOrNot(param).then(res => {
        console.log('res',res);
        if(res*1==1){
          console.log("修改示忙状态成功", res);
          this.$store.commit('SET_BUSYSTATUS', 1)    //示忙
        }else{
          console.log("修改示闲状态成功", res);
          this.$store.commit('SET_BUSYSTATUS', 2)    //示闲
        }
        // this.$store.dispatch('setBusyStatus',status?1:2)
      }).catch(e => {
        if (e && e.msg) {
          this.openMessage(0, e.msg);
        } else {
          this.openMessage(0, "您的网络环境不佳，请稍后再试！");
        }

        var busyStatus = localStorage.getItem(localKey+'busyStatus');
        if(busyStatus*1==2){
          this.$store.commit('SET_BUSYSTATUS', 1)
          setTimeout(()=>{
            this.$store.commit('SET_BUSYSTATUS', 2)
          },1000)
        }else{
          this.$store.commit('SET_BUSYSTATUS', 2)
          setTimeout(()=>{
            this.$store.commit('SET_BUSYSTATUS', 1)
          },1000)
        }
      });
    },
    navbarStatus_callback(message){
      // this.tipsAudio()
      console.log("头部条收到消息:+",message); 
      // var tipObj = JSON.parse(message.content)
      // this.tipObj = tipObj   statistics
      switch (message.type) {
          case "statistics":    //上下线状态类型
            // this.statusTipsAudio()
            var tipObj = JSON.parse(message.content)
            this.tipObj = tipObj
            break;   
          case "transfer":
            this.transferAudio()
            break;
          case "allocagent":    //分配类型
            // this.newAudio()
            this.tipsAudio()
            break;
          default:
            this.tipsAudio()
        }
    },
    //statusTipsAudio(){
      // this.$refs.statusTipsAudio.play()
      // this.$refs.statusTipsAudio.pause();
    //},
    tipsAudio(){
      this.$refs.tipsAudio.play()
      // this.$refs.tipsAudio.pause();
    },
    newAudio(){
      this.$refs.newAudio.play()
    },
    transferAudio(){    
      this.$refs.transferAudio.play()
      // this.$refs.transferAudio.pause();
    },
    openCallLogin(){
      // this.$store.dispatch('setBusyStatus',2)
      this.$refs.callLoginDialog.open({
        model: "login",
        params: {},
        callback: () => {
          console.log("这是话机登录回调");
          this.openMessage(1,"话机登录成功！")
        }
      })
    },
    close_callback(message){
      // console.log('状态栏手动关闭回调',message)
      // console.log('这是断开设置示忙状态');
      
      // if(message.errorCode==0||message.errorCode==5||message.errorCode==8){
      if(message.errorCode==0||message.errorCode==8){   
        console.log('66666666666666666666');
        // this.$store.dispatch('setBusyStatus',2)    //就绪和示忙独立不干扰
      }else{
        // this.$store.dispatch('setBusyStatus',2)
      }
      // this.$store.dispatch('setBusyStatus',2)
    },
    logout() {
      if(this.connectFlag){
        this.socketApi.onDisconnect();
        this.$store.dispatch('setBusyStatus',2)
      }
      this.$store.dispatch("LogOut").then((res) => {
        this.$router.push("/login");
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      }).catch(e=>{
        console.log(e);
      })
    },
    changeInfo(){
      this.$refs.changeInfoDialog.open({
        model: "changeInfo",
        params: {
          userId: this.getUserId
        },
        callback: () => {
          console.log("这是修改信息回调");
          this.openMessage(1,"修改密码成功！下次登录请使用新密码")
        }
      })
    }
  },
  beforeDestroy() {
    
  },
  destroyed() {
    
  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  
  border-radius: 6px 0 0 6px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    &:focus {
      outline: none;
    }
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .seat-navbar {
    float: right;
    display: flex;
    line-height: 50px;
		margin-right: 140px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(126,126,126,1);
		div{
			margin-right: 20px;
    }
    .high-light{
      color: $main;
    }
    .statusImg-container{
      // width: 24px;
      // height: 24px;
      // margin-top: 12px;
      img{
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      &.left{
        // margin-left: 50px;
        margin-left: 0px;
      }
    }
  }
  .screenfull {
    position: absolute;
    right: 125px;
    top: 10px;
    // top: 16px;
    // color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      // margin-top: 5px;
      padding-top: 5px;
      position: relative;
      height: 45px;
      line-height: 45px;
      outline: none;
      >span{
      
        display:inline-block;
        max-width:85px;
        text-align: right;
        overflow:hidden; 
        text-overflow:ellipsis; 
        white-space:nowrap; 
      }
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -13px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
.user-dropdown{
  li:nth-child(1){
    border:0;
    margin:0;
  }
  
}
</style>



