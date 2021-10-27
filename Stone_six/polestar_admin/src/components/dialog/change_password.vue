<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="22%"
    :show-close="false"
    :append-to-body="true"
    :before-close="clear"
  >
    <el-form :model="form" class="demo-dynamic" label-width="100px">
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPassword" placeholder="旧密码" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" placeholder="新密码" style="width:80%" ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="againPassword" placeholder="确认新密码" style="width:80%"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="clear">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getData } from "@/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      againPassword: "",
   
      form: {
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser"
    })
  },
  methods: {
    open(options) {
      this.dialogVisible = true;
    },
    clear(){
       this.form.oldPassword=""
       this.form.newPassword=""
       this.againPassword=""
       this.dialogVisible = false
    },
    sure() {
      if (
        !this.form.oldPassword ||
        !this.form.newPassword ||
        !this.againPassword
      ) {
        return this.openMessage("请输入旧密码 新密码  确认新密码", 0);
      } else if (this.form.newPassword != this.againPassword) {
        return this.openMessage("密码不一致，请重新输入",0);
      }else if(this.form.newPassword.length<6){
          return this.openMessage("密码长度不小于6",0);
      }
      this.updatePwd(this.userInfo.id);
    },
    updatePwd(accountId) {
      getData
        .updatePwd(accountId, this.form)
        .then(res => {
            this.openMessage('修改成功，请重新登录',1)
            this.$store.dispatch('setUser',{})
            // this.$router.push('/login')
            
        })
        .catch(e => {
           this.openMessage(e.msg,0)
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>