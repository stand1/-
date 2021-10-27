<template>
  <el-drawer
    title="个人资料"
    :visible.sync="showDrawer"
    :direction="direction"
    size="300px"
    :show-close="false"
    :before-close="handleClose"
    custom-class="drawer"
    :append-to-body="true"
  >
    <section>
      <div class="headerTitle">
        <div class="title">头像</div>
        <div class="pic">
          <img :src="userInfo&&userInfo.avatar?userInfo.avatar:defualt" alt />
        </div>
        <!-- <p class="upload">点击修改图像</p>
        <input type="file" class="uploadInput" @change="fileChanged($event)" accept="*" /> -->
      </div>
      <div class="headerTitle">
        <div class="title">账号</div>
        <p class="account">{{userInfo&&userInfo.userName}}</p>
      </div>
      <!-- <div class="headerTitle" v-if="userInfo&&userInfo.id">
        <div class="title">密码</div>
        <el-input
          v-model="userInfo.pwdOrigin"
          placeholder="请输入内容"
          type="password"
          disabled
          style="width:110px;"
        ></el-input>
        <p class="updata" @click="openChangePasswordDialog">修改</p>
      </div> -->
      <div class="sign_out" @click="signOut">退出账户</div>
    </section>
    <changePassword ref="changePassword"></changePassword>
  </el-drawer>
</template>
<script>
import changePassword from "./change_password";
import { mapGetters } from "vuex";
import {getData} from "@/api"
export default {
  data() {
    return {
      showDrawer: false,
      direction: "ltr",
      password: "12345678",
    
        form: {
        username: "",
        password: "",
        groupId: "",
        avatar:"",
        level: ""
      }
    };
  },
  props: {
    drawer: {
      type: Boolean,
      defualt: false
    }
  },
  watch:{
    drawer(val){
        this.form.avatar="";
        this.showDrawer = val;
    }
  },
  components: {
    changePassword
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser"
    })
  },
  methods: {
    handleClose(done) {
      this.showDrawer = false;
      this.$emit("drawerStatus", false);
    },
    signOut() {
        getData.loginOut().then(res=>{
           this.openMessage('退出成功','1')
            this.$store.dispatch('setUser',{})
            this.$router.push('/login')
        }).catch(e=>{
             this.openMessage(e.msg,0)
        })
    },
    openChangePasswordDialog() {
      this.$refs.changePassword.open({});
    },
    async fileChanged(e) {
        let _this =this
      const file = e.target.files[0];
        await this.uploadService(1, file, function(url) {
   
          _this.userInfo.avatar=url
          _this.updateAccountInfo(_this.userInfo.id)
      });
    },
    updateAccountInfo(accountId) {
      getData
        .updateAccountInfo(accountId, this.userInfo)
        .then(res => {
            this.getAccountInfo(this.userInfo.id)
        })
        .catch(e => {
            this.openMessage(e.msg,0)
        });
    },
    getAccountInfo(accountId){
        getData.getAccountInfo(accountId).then(res=>{
            this.$store.dispatch('setUser',res)
        }).catch(e=>{
             this.openMessage(e.msg,0)
        })
    }
  }
};
</script>
<style lang="scss">
.drawer {
  border-radius: 0 16px 16px 0;
  .section{
    position: relative;
  }
  .headerTitle {
    padding: 10px 20px;
    position: relative;
    .title {
      font-size: 14px;
      color: rgba(143, 146, 161, 1);
      padding-bottom: 10px;
    }
    .pic {
      width: 72px;
      height: 72px;
      display: inline-block;
      img {
        border-radius: 50%;
      }
    }
    .upload {
      color: #3366ff;
      font-size: 16px;
      display: inline-block;
      font-weight: 500;
      cursor: pointer;
    }
    .uploadInput {
      color: red;
      position: absolute;
      left: 30px;
      top: 40px;
      width: 140px;
      height: 70px;
      opacity: 0;
    }
    .account {
      font-size: 20px;

      font-weight: 500;
      color: rgba(50, 50, 50, 1);
    }
    .el-input__inner {
      border: 0;
      height: 20px;
      font-size: 30px;
      background: #fff;
      padding: 0;
    }
    .el-input.is-disabled .el-input__inner {
      background: #fff;
    }
    .updata {
      color: #3366ff;
      font-size: 16px;
      font-weight: 500;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
    }
  }
  .sign_out {
    position: absolute;
    bottom: 74px;
    width: 240px;
    height: 46px;
    border-radius: 23px;
    border: 1px solid rgba(51, 102, 255, 1);
    text-align: center;
    line-height: 46px;
    font-size: 16px;
    left: calc(50% - 120px);
    cursor: pointer;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 102, 255, 1);
  }
}
</style>