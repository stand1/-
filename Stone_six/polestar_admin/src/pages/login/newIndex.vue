<template>
    <div class="login" v-loading="loading">
        <div class="loginBox">
            <div class="title">极星黑客松后台管理系统</div>
            <div class="imgs"><img src="../../assets/img/login.png" alt=""></div>
            <div class="inps">
                <el-input v-model="account" placeholder="账号"></el-input>
                <el-input placeholder="密码" v-model="pwd" show-password></el-input>
                <div class="txt">忘记密码</div>
            </div>
            <div class="btn" @click="login">登录</div>
        </div>
    </div>
</template>

<script>
    import {getData} from "../../api";
    import { localKey } from '@/api/config/ip-config'
    export default {
        name: "newIndex",
        data () {
            return {
                loading: false,
                account: 'admin',
                pwd: '123456'
            }
        },
        methods: {
            login () {
                if (this.account == '') {
                    this.$message.warning('请输入登录账号')
                    return
                }
                if (this.pwd == '') {
                    this.$message.warning('请输入登录账号密码')
                    return
                }
                let pamer = {
                    username:this.account,
                    password: this.pwd
                }
                this.loading = true
                getData.login(pamer).then(res => {
                    this.loading = false
                    localStorage.setItem(localKey + 'token', res.token)
                    this.$store.dispatch('setUser',res)
                    this.$message.success('登录成功')
                    this.$router.replace('/home/index')
                }).catch(err => {
                    this.loading = false
                    this.$message.error(err.msg)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.login{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginBox{
        width: 600px;
        height: 800px;
        opacity: 1;
        background: #ffffff;
        padding: 110px 127px 70px;
        box-sizing: border-box;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        .title{
            font-size: 28px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            color: #000000;
        }
        .imgs{
            width: 98px;
            height: 99px;
            margin: 68px auto 82px;
            img{
                width: 98px;
                height: 99px;
            }
        }
        .inps /deep/ .el-input__inner{
            border: none;
            background: #f7f7f7;
            margin-bottom: 24px;
        }
        .inps{
            .txt{
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                color: #2b78e8;
                text-align: left;
            }
        }
        .btn{
            width: 345px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            opacity: 1;
            background: #53565a;
            margin-top: 82px;
            cursor: pointer;
        }
    }
}
</style>