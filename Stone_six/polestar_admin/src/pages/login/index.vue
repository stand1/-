<template>
  <div class="login-container">
<!--    <div class="header">-->
<!--      <div><img src="../../assets/images/logo2.png"></div>-->
<!--      <div><img src="../../assets/images/logo3.png"></div>-->
<!--    </div>-->

    <el-form v-if="!isRegister" class="card-box login-form" autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <!-- <h3 class="title">AR workbench</h3> -->
      <el-row class="login_box">
          <h3>登录</h3>
          <el-form-item prop="nickName" v-if="!isRegister">
            <span class="svg-container svg-container_login">
              <!-- <i class="el-icon-info"></i> -->
              <!-- <Icon type="md-person" /> -->
            </span>
            <el-input name="nickName" type="text" clearable v-model="loginForm.nickName" autocomplete="on" placeholder="请输入账号" class="iconfont icon-icon_account" />
          </el-form-item>
          <el-form-item prop="password" v-if="!isRegister">
            <span class="svg-container svg-container_password">
            </span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autocomplete="on" placeholder="请输入密码" class="iconfont icon-mima" />
            <span class="show-pwd" @click="showPwd">
              <i class="iconfont icon-eye" v-if="!passwordShow"></i>
              <i class="iconfont icon-eye-close" v-if="passwordShow"></i>
            </span>
          </el-form-item>
          <!-- <el-checkbox v-model="checked">
            <span>我已阅读并同意</span>
          </el-checkbox>
          <span style="color:#3366FF;font-size:12px;  cursor: pointer;" @click.stop="open">《用户使用协议》</span> -->
          <el-button class="login-btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          <!-- <div class="register" @click="goRegister">没有账号?立即注册</div> -->
      </el-row>
    </el-form>
    <div class="footer">
<!--      <img src="../../assets/images/logo1.png" alt="" srcset="">-->
    </div>
  </div>
</template>

<script>
import Utils from "@/utils/util";
import { isvalidUsername } from "@/utils/validate";
import { getData } from "@/api";

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        // callback(new Error('请输入正确的用户名'))
        callback(new Error("5-20位字母、数字、下划线"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    const validateUname = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        // callback(new Error('请输入正确的用户名'))
        callback(new Error("5-20位字母、数字、下划线"));
      } else {
        callback();
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      isRegister: false,
      checked: false,
      loginForm: {
        nickName: "",
        password: ""
      },
      loginRules: {
        nickName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      registerForm: {
        uname: "",
        password: "",
        name: "",
        isAgent: 1,
        agentName: "",
        sex: "",
        birthday: ""
      },
      registerRules: {
        uname: [{ required: false, trigger: "blur", validator: validateUname }],
        password: [{ required: false, trigger: "blur", validator: validatePwd }]
      },
      pwdType: "password",
      loading: false,
      passwordShow: true,
      agreementShow: false
    };
  },
  components: {

  },
  created() {},
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.passwordShow = false;
      } else {
        this.pwdType = "password";
        this.passwordShow = true;
      }
    },
    goRegister() {
      this.isRegister = !this.isRegister;
      console.log(this.isRegister);
    },
    handleLogin() {
      let that = this;
      // if (!this.checked) {
      //   return this.openMessage("请阅读并同意协议", 0);
      // }
      this.$refs.loginForm.validate(valid => {
        if (valid) {


          // if(this.loginForm.nickName=='admin'&&this.loginForm.password=="Aa123456*a"){
          //   that.$router.push({ path: "/order/index" });
          // }else{
          //   that.openMessage('用户名或密码不正确',0);
          // }

          // return

          this.loading = true;
          let obj = {
            // baseURL: `${window.location.protocol}//${window.location.hostname}`,
            url: "/api/v1.0/iclubst/user/loginAdmin",
            method: "post",
            params: {
              password: this.loginForm.password,
              userName: this.loginForm.nickName
            }
          }
          getData.formMainServer(obj).then(res => {
            console.log('loginAdmin->'+JSON.stringify(res));
            that.loading = false;
            that.$store.dispatch('setUser',res)
            that.$router.push({ path: "/order/index" });

          })
          .catch(e => {
            this.loading = false;
            if (e && e.msg) {
              that.openMessage(e.msg,0);
            } else {
              that.openMessage(0, "当前为非正式环境，请用跨域浏览器访问");
            }
          })
        } else {
          console.log("error login!!");
          return false;
        }
      });
    },
    open() {
      this.agreementShow = true;
    },
    openStatus(data) {
      this.agreementShow = false;
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          var param = JSON.parse(JSON.stringify(this.registerForm));
          param.birthday = Utils.parseTime(
            this.registerForm.birthday,
            "{y}-{m}-{d}"
          );
          this.$store
            .dispatch("Register", param)
            .then(res => {
              console.log(res);
              // this.$store.dispatch('setUser',res)
              this.loading = false;
              this.$router.push({ path: "/photoBook/index" });
            })
            .catch(e => {
              this.loading = false;
              if (e && e.msg) {
                this.openMessage(e.msg, 0);
              } else {
                this.openMessage("当前为非正式环境，请用跨域浏览器访问", 0);
              }
              console.log(e);
            });
        } else {
          console.log("error register!!");
          return false;
        }
      });
    }
  },
  destroyed() {}
};
</script>

<style  lang="scss">
@import "src/styles/mixin.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  @include relative;
  height: 100vh;
  background: #f5f5f5;
  // background: url('~@/assets/images/login-bg.png') no-repeat;
  /* background: url("https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/20200522/login-bg_1_zk5mdux.png") no-repeat; */
  background-size: 100% 100%;
  .header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 83px;
    background: #fff;
    padding: 28px 160px;
  }
  .login-form {
    /* width: 76%;
    height: 500px;
    position: absolute;
    left: calc(50% - 38%);
    top: calc(50% - 250px);
    background: #fff;
    border-radius: 32px;
    padding: 0px 35px 0px 35px; */
    background-size: cover;
    margin-top: 70px;
    padding-top: 42px;
    padding-bottom: 14px;
    height: 353px;
    box-sizing: content-box;
    .login_box {
      width: 384px;
      height: 332px;
      background: #fff;
      margin: 0 auto;
      border: 1px solid #ddd;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      border-radius: 4px;
      padding: 30px 15px;
      h3 {
        font-size: 20px;
        font-weight: 400;
        color: #333;
        line-height: 24px;
        margin-bottom: 15px;
      }
      .login-tip {
        color: #8f92a1;
        line-height: 20px;
        font-size: 12px;
        margin-bottom: 40px;
      }
      .login-btn {
        width: 100%;
        /* width: 100px; */
        margin: 0 auto;
        margin-top: 20px;
        height: 48px;
        border-radius: 8px;
        background: #ae1609;
        font-size: 18px;
        border: none;
      }
    }
    .el-form-item__label {
      line-height: 46px;
    }
    &.register-form {
      margin: 80px auto 0;
    }
  }
  .footer{
    /* position: fixed; */
    width: 100%;
    height: 64px;
    margin-top: 28px;
    left: 0;
    bottom: 50px;
    text-align: center;
    img{
      display: inline-block;
      width: auto;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #8f92a1;
    height: 46px;
  }
  .el-input {
    display: inline-block;
    height: 46px;

    width: 85%;
  }
  .el-input__inner {
    padding-left: 40px;
  }
  .register {
    text-align: right;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    // padding: 6px 5px 6px 15px;
    padding-left: 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    height: 46px;
    display: inline-block;
    font-size: 20px;
    &_login {
      font-size: 20px;
    }
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .register-form {
    .el-input {
      width: 100%;
    }
  }
  .icon-icon_account:before {
    position: absolute;
    font-size: 25px;
    top: 3px;
  }
  .icon-mima:before {
    position: absolute;
    font-size: 25px;
    top: 3px;
  }

  .icon-eye,
  .icon-eye-close:before {
    font-size: 25px;
  }
}
</style>
