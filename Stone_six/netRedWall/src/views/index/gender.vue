<template>
	<div class="gender">
		<div class="centent" v-if="isShow == 1">
			<div class="title">
				<p>选择性别</p>
			</div>
			<div class="item" @click="changeNum(1)">
				<img src="../../assets/img/sex1.png" alt="">
				<div class="changeImg">
					<img v-if="isChange != 1" src="../../assets/img/nocheck.png" alt="">
					<img v-if="isChange == 1" src="../../assets/img/check.png"  alt="">
				</div>
			</div>
			<div class="item" @click="changeNum(2)">
				<img src="../../assets/img/sex2.png" alt="">
				<div class="changeImg">
					<img v-if="isChange != 2" src="../../assets/img/nocheck.png" alt="">
					<img v-if="isChange == 2" src="../../assets/img/check.png" alt="">
				</div>
			</div>
			<div class="btn" @click="goto">
				<p>下一步</p>
			</div>
		</div>
		<div class="loginBox" v-if="isShow == 2">
			<div class="logo">
				<img src="../../assets/img/logo.png" alt="">
			</div>
			<div class="inpBox">
				<div class="phone_box">
				  <input class="phone_num_inp" name="nickName" v-model="nickName" placeholder="昵称">
				</div>
				<div class="phone_box">
				  <input class="phone_num_inp" name="phone" type="number" v-model="phone" placeholder="手机号码" @input="formatPhone(phone)"/>
				</div>
				<div class="code_box">
				  <input name="code" class="checkcode" type="number" v-model="code" placeholder="手机验证码" @input="inputCheck" />
					<div class="line"></div>
				  <div class="code_btn" :class="codeMsg === '获取验证码' ? '' : 'gray'" @click="sendCode_login">
				    {{ codeMsg }}
				  </div>
				</div>
			</div>
			<div class="experience" @click="handleLogin">
				<p>开始体验</p>
			</div>
		</div>
	</div>
</template>

<script>
import { getData } from "@/api";
import { isMobile } from "@/utils/validate";
import { mapGetters } from 'vuex';

export default{
	data () {
		return {
			isChange: 0,
			isShow: 1,
			nickName: "",
			phone: "",
			code: "",
			codeMsg: "获取验证码",
		}
	},
	computed: {
		...mapGetters({
			storeId: 'getStoreId'
		}),
	},
	methods: {
		changeNum (i) {
			this.isChange = i
		},
		goto () {
			if (this.isChange == 0) {
				this.$toast('请选择性别')
				return
			}
			this.isShow = 2
		},
		formatPhone(phone) {
		  this.$nextTick(function() {
		    this.phone = this.phone.substring(0, 11)
		  })
		},
		inputCheck() {
		  this.$nextTick(function() {
		    this.code = this.code.substring(0, 4)
		  })
		},
		sendCode_login() {
		  if (!isMobile(this.phone)) {
		    this.$toast("请输入正确的手机号");
		    return;
		  }
		  if (this.codeMsg != "获取验证码") {
		    return;
		  }
		  let pamer = {
			  mobile: this.phone,
			  smsTypeCode: 'leapmotor'
		  }
		  getData.sendSms(pamer).then((res) => {
		      this.$toast("发送成功！");
		      var codeTime = 60;
		      this.timer = setInterval(() => {
		        codeTime--;
		        var codeText = codeTime + "s重新获取";
		        if (codeTime == 0) {
		          clearInterval(this.timer);
		          this.codeMsg = "获取验证码";
		        } else {
		          this.codeMsg = codeText;
		        }
		      }, 1000);
		    }).catch((e) => {
		      if (e.code != 401 && e.code != 200) {
		        this.$toast(e.msg);
		      }
		    });
		},
		handleLogin() {
		  if (this.nickName == '') {
			this.$toast("请输入昵称");
			return;
		  }
		  if (!isMobile(this.phone)) {
		    this.$toast("请输入正确的手机号");
		    return;
		  }
		  if (!this.code) {
		    this.$toast("验证码不能为空");
		    return;
		  }
		  let params = {
		    mobile: this.phone,
		    checkCode: this.code,
		    nickName: this.nickName,
			sex: this.isChange,
			fromSource: 5
			// storeId: this.storeId
		  };
		  getData.login(params).then((res) => {
			  let flag = {
				  type: "object",
				  data:res
			  }
			  let obj = JSON.stringify(flag)
			  let jumpToken = JSON.stringify(res.token)
			  sessionStorage.setItem('token',jumpToken)
			  let token = JSON.stringify(res.token)
			  document.cookie = "token=" + token
			  localStorage.setItem('communityInfo',obj)
			  localStorage.setItem('user',obj)
			  this.getUserByPhone(res.mallToken)
			  sessionStorage.setItem('mallToken',res.mallToken)
		    }).catch((e) => {
		      if (e && e.msg) {
		        this.$toast(e.msg);
		      }
		    });
		},
		getUserByPhone(mallToken) {
			let param = {
				mallToken: mallToken
			}
			getData.phoneByToken(param).then(res=>{
				let flag = {
				  type: "object",
				  data:res
			  }
			  let obj = JSON.stringify(flag)
			  localStorage.setItem('userInfo',obj)
			  this.$router.push({path: '/index',query:{nickName: this.nickName}})
			})
		}
	},
	destroyed() {
		clearInterval(this.showBarrageTimer);
	}
}
</script>

<style lang="less" scoped>
.gender{
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background-color: #000;
	background: url('../../assets/img/indexBg.png') no-repeat;
	background-size: 100% 100%;
	position: fixed;
	top: 0;
	left: 0;
	padding-top: 60px;
	.centent{
		.title{
			font-size: 48px;
			font-family: PingFangSC, PingFangSC-Semibold;
			font-weight: bold;
			text-align: center;
			color: #ffffff;
			margin-bottom: 78px;
			p{
				font-size: 48px;
			font-family: PingFangSC, PingFangSC-Semibold;
			font-weight: bold;
			text-align: center;
			color: #ffffff;
			}
		}
		.item{
			width: 298px;
			height: 298px;
			position: relative;
			margin: 0 auto 82px;
			img{
				width: 298px;
				height: 298px;
			}
			.changeImg{
				width: 54px;
				height: 54px;
				position: absolute;
				right: 12px;
				bottom: 4px;
				img{
					width: 54px;
					height: 54px;
				}
			}
		}
	}
	.btn{
		width: 572px;
		height: 96px;
		line-height: 96px;
		opacity: 1;
		background: #34d0e7;
		border-radius: 48px;
		margin: 0 auto;
		p{
			font-size: 32px;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: bold;
			text-align: center;
			color: #000000;
		}
	}
	.loginBox{
		padding: 0 40px;
		.logo{
			width: 245px;
			height: 196px;
			margin: 80px auto 100px;
			img{
				width: 245px;
				height: 196px;
			}
		}
		.inpBox{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.phone_box{
				width: 572px;
				height: 96px;
				input{
					width: 572px;
					height: 96px;
					padding-left: 48px;
					font-size: 28px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					font-family: PingFangSC, PingFangSC-Regular;
					opacity: 1;
					background: rgba(255,255,255,0.50);
					border-radius: 8px;
					backdrop-filter: blur(20px);
				}
			}
			.code_box{
				display: flex;
				align-items: center;
				width: 572px;
				height: 96px;
				opacity: 1;
				background: rgba(255,255,255,0.50);
				border-radius: 8px;
				backdrop-filter: blur(20px);
				input{
					width: 360px;
					height: 96px;
					padding-left: 48px;
					font-size: 28px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					font-family: PingFangSC, PingFangSC-Regular;
					/*background: rgba(255,255,255,0.50);*/
					background: transparent;
					border-radius: 8px;
					/*backdrop-filter: blur(20px);*/
				}
				.line{
					width: 0px;
					height: 50px;
					border: 2px solid #fff;
					margin-left: 50px;
				}
			}
			input::-webkit-input-placeholder { /* WebKit browsers */
				color: #fff;
				opacity: 0.5;
				font-size: 32px;
				font-family: PingFangSC, PingFangSC-Regular;
			}
			input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
				color: #fff;
				opacity: 0.5;
				font-size: 32px;
				font-family: PingFangSC, PingFangSC-Regular;
			}
			input::-moz-placeholder { /* Mozilla Firefox 19+ */
				color: #fff;
				opacity: 0.5;
				font-size: 32px;
				font-family: PingFangSC, PingFangSC-Regular;
			}
			input:-ms-input-placeholder { /* Internet Explorer 10+ */
				color: #fff;
				opacity: 0.5;
				font-size: 32px;
				font-family: PingFangSC, PingFangSC-Regular;
			}
			
			.phone_box {
			  width: 630px;
			  margin-bottom: 32px;
			  .phone_num_inp{
				  width: 100%;
			  }
			}
			
			.code_box {
			  width: 630px;
			  // margin: 0 auto;
			  position: relative;
			  left: 0;
			  right: 0;
			}
			
			.code_btn {
			  position: absolute;
			  right: 32px;
			  top: 22px;
			  display: block;
			  height: 44px;
			  line-height: 44px;
			  font-size: 24px;
			  font-family: PingFangSC-Regular, PingFang SC;
			  font-weight: 400;
			  // background-color: #fff;
			  /*color: #009800;*/
			  color: #fff;
			  text-align: left;
			  z-index: 999;
			}
		}
		.experience{
			width: 620px;
			height: 96px;
			line-height: 96px;
			opacity: 1;
			background: #34d0e7;
			border-radius: 48px;
			margin: 147px auto 0;
			p{
			font-size: 32px;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			}
		}
	}

}

</style>
<style  >
.van-toast__text{
		font-size: 14px !important;
	}
</style>
