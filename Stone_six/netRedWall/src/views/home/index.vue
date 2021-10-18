<template>
    <div class="index" :style="{backgroundImage:'url('+imgBgUrl+')'}">
        <div class="top">
            <div class="barrageContainter" id="barrageContainter">
                <div class="barrageItem" :id="'barrageItem'+i" :style="{top: x.top}" v-for="(x,i) in showBarrageList" :key="i" v-if="x.isShow">
                    <img src="../../assets/img/logoa.png" alt=""><span class="3">{{x.content}}</span>
                </div>
            </div>
            <div class="checkBox" v-if="false">
                <div class="item" @click="changeNum(6)">
                    <img v-if="num != 6" src="../../assets/img/img1.png" alt="">
                    <img v-if="num == 6" src="../../assets/img/img2.png" alt="">
                </div>
                <div class="item" @click="changeNum(7)">
                    <img v-if="num != 7" src="../../assets/img/img3.png" alt="">
                    <img v-if="num == 7" src="../../assets/img/img4.png" alt="">
                </div>
            </div>
            <div class="checkBox">
                <div class="item" @click="changeNum(8)">
                    <img v-if="num != 8" src="../../assets/img/img1.png" alt="">
                    <img v-if="num == 8" src="../../assets/img/img2.png" alt="">
                </div>
                <div class="item" @click="changeNum(9)">
                    <img v-if="num != 9" src="../../assets/img/img3.png" alt="">
                    <img v-if="num == 9" src="../../assets/img/img4.png" alt="">
                </div>
            </div>
        </div>
        <div class="centre">
            <div class="item">
                <input type="text" placeholder="昵称" v-model="nickName">
            </div>
            <div class="item">
                <textarea name="" id="" cols="30" rows="10" placeholder="我有话说..." v-model="keys"></textarea>
            </div>
            <p class="line">发送后全部不可编辑</p>
            <div class="btnBox">
                <div v-if="!waiting" class="btn" @click="send">开始传送上墙</div>
                <div v-if="waiting" class="btn">预计剩余等待{{wait_time1}}分钟{{wait_time2}}秒</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getData} from '@/api';
    import { mapGetters } from 'vuex';
    export default {
        name: "index",
        data () {
            return {
                // num: 6,
                num: 8,
                imgBgUrl: '',
                imgArr:[
                    {imgs: require('../../assets/img/bg1.png')},
                    {imgs: require('../../assets/img/bg2.png')}
                ],
                nickName: '',
                keys: '',
                barrageList: [],
                waiting: false,
                wait_time1: '',
                wait_time2: '',
                wait_time: '',
                showBarrageTimer: '',
                showBarrageList: [],
                currentTime: 0
            }
        },
        computed: {
            ...mapGetters({
                storeId: 'getStoreId'
            }),
        },
        mounted() {
            // this.imgBgUrl = this.imgArr[this.num-6].imgs
            this.imgBgUrl = this.imgArr[this.num-8].imgs
            this.nickName = this.$route.query.nickName
            this.getBarrage()
        },
        methods: {
            changeNum (i) {
                this.num = i
                // this.imgBgUrl = this.imgArr[this.num-6].imgs
                this.imgBgUrl = this.imgArr[this.num-8].imgs
                clearInterval(this.showBarrageTimer);
                this.currentTime = 0
                this.showBarrageList = []
                this.getBarrage()
            },
            delList (i) {
                setTimeout(() => {
                    this.showBarrageList[i-1].isShow = false
                }, 3000);
            },
            playStart(){
                let that = this
                if (this.showBarrageTimer) {
                    clearInterval(this.showBarrageTimer);
                }
                this.showBarrageTimer = setInterval(() => {
                    let _i = Math.round(this.currentTime);
                    this.currentTime++
                    if (_i == this.barrageList.length) {
                        let list = JSON.parse(JSON.stringify(this.showBarrageList))
                        list.forEach((item) => {
                            if (item.isShow) item.isShow = false
                        })
                        this.showBarrageList = list
                        clearInterval(this.showBarrageTimer)
                        return
                    }
                    let obj = this.barrageList[_i];
                    obj.top = Math.random()*180 + 'px';
                    obj.isShow = true
                    this.showBarrageList.push(obj);
                    this.delList(_i)
                }, 3000)
            },
            getBarrage () {
                let pamer = {
                    storeId: this.storeId,
                    topicId: this.num
                }
                getData.userList(pamer).then(res => {
                    this.barrageList = res.list || []
                    this.playStart()
                }).catch(err => {
                    if (err.msg) this.$toast(err.msg);
                })
            },
            send () {
                let that = this
                if (that.nickName == '') {
                    that.$toast('请填写昵称');
                    return;
                }
                if (that.keys == '') {
                    that.$toast('请填写内容');
                    return;
                }
                let pamer = {
                    code: '000000',
                    topicId: that.num,
                    storeId: this.storeId
                }
                getData.addLine(pamer).then(res => {
                    that.sendUp(res.globalIds)
                    // if (res.minute == 0) {
                        that.wait_time = res.minute;
                        that.wait_time1 = Math.floor(that.wait_time / 60)
                        that.wait_time2 = (this.wait_time % 60)
                        that.waiting = true
                        let timeInterval = setInterval(() => {
                            that.wait_time--;
                            if (that.wait_time <= 0 || !that.waiting) {
                                that.waiting = false;
                                clearInterval(timeInterval)
                            } else {
                                that.wait_time1 = Math.floor(that.wait_time / 60)
                                that.wait_time2 = (that.wait_time % 60)
                            }
                        }, 1000)
                    // }
                }).catch(err => {
                    if (err.msg) that.$toast(err.msg);
                })
            },
            sendUp (globalId) {
                let parama = {
                        globalId: globalId,
                        topicId: this.num,
                        topicLedId: '',
                        title: this.nickName,
                        content: this.keys,
                        storeId:this.storeId
                    }
                getData.sends(parama).then(res => {
                    if (res.result == 1) {
                        // this.nickName = '';
                        this.$toast('发送成功，请在网红墙查收')
                        let obj = {};
                        obj.content = this.keys
                        obj.top = Math.random()*180 + 'px';
                        obj.isShow = true
                        this.showBarrageList.push(obj);
                        setTimeout(() => {
                            this.showBarrageList[this.showBarrageList.length-1].isShow = false
                        }, 3000);
                        this.keys = '';
                        // this.waiting = true;
                    }
                }).catch((err) => {
                    if (err.msg) this.$toast(err.msg);
                })
            }
        }
    }
</script>

<style scoped lang="less">
.index{
    width: 100%;
    min-height: 100vh;
    background-image: url("../../assets/img/bg1.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: #000;
    padding-top: 180px;
    font-size: 24px;
    @keyframes right2left {
        0% {
            transform: translate(100vw);
        }
        100% {
            transform: translate(-100%);
        }
    }
    .top{
        width: 100%;
        height: 568px;
        .barrageContainter {
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            height: 420px;
            background: transparent;
            position: relative;
            .barrageItem {
                position: absolute;
                height: 50px;
                line-height: 50px;
                background: rgba(255, 255, 255, 0.7);
                font-size: 24px;
                color: #000;
                border-radius: 25px;
                opacity: 0.84;
                // text-align: center;
                animation: right2left 3s linear 1 normal;
                /*padding-left: 60upx;*/
                display: flex;
                align-items: center;
                &.my {
                    background: #ff3b30;
                    span {
                        color: #fff;
                    }
                }
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    position: relative;
                    top: 0;
                    left: 0;
                }
                span {
                    white-space: nowrap;
                    padding: 0 15px;
                }
            }
        }
        .checkBox{
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            .item{
                margin-right: 60px;
                img{
                    width: 128px;
                    height: 128px;
                }
            }
            .item:last-child{
                margin-right: 0px;
            }
        }
    }
    .centre{
        width: 100%;
        box-sizing: border-box;
        padding: 48px 40px;
        .item{
            box-sizing: border-box;
            width: 670px;
            margin-bottom: 32px;
            input{
                width: 670px;
                height: 96px;
                background: rgba(216,216,216,.2);
                border-radius: 16px;
                font-size: 40px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255,255,255,.5);
                padding-left: 28px;
            }
            textarea{
                width: 670px;
                height: 200px;
                background: rgba(216,216,216,.2);
                border-radius: 16px;
                font-size: 32px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255,255,255,.5);
                padding: 10px 28px;
                border: none;
            }
        }
        .line{
            font-size: 28px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #ffc100;
        }
        .btnBox{
            width: 100%;
            box-sizing: border-box;
            margin-top: 48px;
            .btn{
                width: 674px;
                height: 96px;
                line-height: 96px;
                border: 4px solid #ffffff;
                border-radius: 46px;
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
<style>
    .van-toast__text{
        font-size: 14px;
    }
</style>