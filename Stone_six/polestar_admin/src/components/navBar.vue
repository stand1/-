<template>
    <div class="navBar">
        <div class="item items" v-if="isShow==1">
            <span class="title">黑客松后台管理</span>
            <div class="itemRs" @click="showOut = !showOut">
                <img :src="userInfo.avatar" alt="">
                <span class="name">{{userInfo.nickName}}</span>
                <i class="el-icon-arrow-down"></i>
                <div class="out" v-if="showOut" @click.stop="changeOut">退出登录</div>
            </div>
        </div>
        <div class="item" v-if="isShow==2">
            <div class="itemL" @click="goBack">
                <i class="el-icon-arrow-left"></i>
                <span class="txt">{{stringA}}</span>
                <span>{{stringB}}</span>
            </div>
            <div class="itemR" v-if="statusTypes!=1&&statusTypes!=2">
                <div class="btn preserve" @click="preserve">通过</div>
<!--                <div class="btn cancel" @click="violation">违规</div>-->
                <div class="btn cancel" @click="showExamine = true">违规</div>
            </div>
        </div>
        <div class="item" v-if="isShow==3">
            <div class="itemL" @click="goBack">
                <i class="el-icon-arrow-left"></i>
                <span class="txt">{{stringA}}</span>
                <span>{{stringB}}</span>
            </div>
            <div class="itemR">
                <div class="btn" @click="del" v-if="id != 0">删除</div>
                <div class="btn preserve" @click="preserve">保存</div>
                <div class="btn cancel" @click="goBack">取消</div>
            </div>
        </div>
        <div class="model" v-if="showExamine">
            <div class="modelCenBox">
                <div class="modelCen" v-if="showExamineType == 1">
                    <div class="titles">审核不通过原因</div>
                    <div class="reason">
                        <div class="items" v-for="(item, index) in reasonList" :key="index" @click="changeShow(index)">
                            <div class="itemL">
                                <img :src="require('@/assets/img/'+ (item.isShow?'check.png':'noCheck.png'))" alt="">
                            </div>
                            <span>{{item.str}}</span>
                        </div>
                    </div>
                    <div class="btns">
                        <div class="btn btnActive" @click="changeExamine">确定</div>
                        <div class="btn" @click="showExamine = false">取消</div>
                    </div>
                </div>
                <div class="modelCen" v-if="showExamineType == 2">
                    <div class="titles titleTxt">此操作无法撤销， 确认审核不通过？</div>
                    <div class="btns">
                        <div class="btn btnActive" @click="violation">确定</div>
                        <div class="btn" @click="showExamineType = 1">取消</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    export default {
        name: "navBar",
        data () {
            return {
                showOut: false,
                id: this.$route.query.id,
                showExamine: false,
                reasonList: [
                    {id: 1, str: '信息与活动不相关', isShow: false},
                    {id: 2, str: '信息不完整', isShow: false},
                    {id: 3, str: '涉及敏感信息', isShow: false}
                ],
                isReason: 0,
                showExamineType: 1,
                statusTypes: this.$route.query.status
            }
        },
        props:['isShow','stringA','stringB'],
        computed: {
            ...mapGetters({
                userInfo: "getUser"
            }),
        },
        methods: {
            changeShow (i) {
                let list = this.reasonList
                this.isReason = 0
                list.forEach((item) => {
                    item.isShow = false
                })
                list[i].isShow = !list[i].isShow
                this.isReason = list[i].id
                this.reasonList = list
            },
            changeExamine () {
                if (this.isReason == 0) {
                    this.$message.warning('请选择违规原因')
                    return
                }
                this.showExamineType = 2
            },
            goBack () {
                this.$router.go(-1)
            },
            del () {
                this.$emit('changeDel', true)
            },
            preserve () {
                this.$emit('changePreserve', true)
            },
            cancel () {
                this.$emit('changeCancel', true)
            },
            violation () {
                this.showExamineType = 1
                this.showExamine = false
                this.$emit('changeViolation', this.isReason)
            },
            changeOut () {
                this.$store.commit('CLEAR_USER')
                this.$router.replace('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
.navBar{
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 101;
    padding: 0 0px 0 31px;
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 500;
    color: #000000;
    .title{
        font-weight: bold;
    }
    .item{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #000000;
        padding-right: 240px;
        .itemL{
            display: flex;
            align-items: center;
            cursor: pointer;
            .txt{
                color: rgba(0,0,0,0.5);
                margin-left: 24px;
                padding-right: 10px;
            }
        }
        .itemR{
            display: flex;
            justify-items: center;
            .btn{
                width: 140px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                opacity: 0.5;
                border: 1px solid #333333;
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Medium;
                font-weight: 500;
                text-align: center;
                color: #000000;
                margin-left: 40px;
                cursor: pointer;
            }
            .preserve{
                opacity: 1;
                background: #53565a;
                color: #ffffff;
            }
            .cancel{
                opacity: 1;
            }
            .btn:first-child{
                margin: 0;
            }
        }
        .itemRs{
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            img{
                width: 50px;
                height: 50px;
            }
            .name{
                font-size: 24px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: center;
                color: #000000;
                margin: 0 24px;
            }
            i{
                font-size: 12px;
            }
            .out{
                width: 243px;
                height: 50px;
                line-height: 50px;
                border: 1px solid rgba(0,0,0,0.1);
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: rgba(0,0,0,0.85);
                background: #fff;
                padding-left: 24px;
                position: absolute;
                left: 0;
                bottom: -40px;
                cursor: pointer;
            }
        }
    }
    .items{
        padding-right: 40px;
    }
    .model{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
        .modelCenBox{
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 1001;
            display: flex;
            justify-content: center;
            align-items: center;
            .modelCen{
                width: 30%;
                padding: 40px 32px;
                background-color: #fff;
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: #000000;
                .titles{
                    font-size: 24px;
                    text-align: center;
                }
                .titleTxt{
                    font-size: 20px;
                }
                .reason{
                    .items{
                        display: flex;
                        align-items: center;
                        height: 70px;
                        border-bottom: 1px solid #d6d6d6;
                        cursor: pointer;
                        .itemL{
                            margin-right: 16px;
                            img{
                                width: 14px;
                                height: 14px;
                            }
                        }
                    }
                }
                .btns{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 50px;
                    .btn{
                        width: 120px;
                        height: 36px;
                        line-height: 36px;
                        text-align: center;
                        border: 1px solid #333333;
                        color: #000000;
                        cursor: pointer;
                    }
                    .btnActive{
                        background: #53565a;
                        color: #ffffff;
                    }
                    .btn:last-child{
                        margin-left: 40px;
                    }
                }
            }
        }
    }
}
</style>