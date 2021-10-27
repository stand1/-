<template>
    <div class="dataStatistics">
        <div class="nav">
            <div :class="['item', num == item.id ? 'active' : '']" v-for="(item, index) in navList" :key="index" @click="changeNav(item.id)">{{item.name}}</div>
        </div>
        <div class="content">
            <div class="contentBox">
                <div class="item">
                    <span>个人报名人数</span>
                    <span>{{personalTeamNum}}</span>
                </div>
                <div class="item">
                    <span>团队报名人数</span>
                    <span>{{teamNum}}</span>
                </div>
                <div class="item">
                    <span>用户人数</span>
                    <span>{{userNum}}</span>
                </div>
                <div class="item">
                    <span>团队数量</span>
                    <span>{{teamPassNum}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getData} from "../../api";
    export default {
        name: "index",
        data () {
            return {
                navList: [
                    {id: 0, name: '全部时间'},
                    {id: 1, name: '今天'},
                    {id: 2, name: '过去一周'}
                ],
                num: 0,
                loading: false,
                personalTeamNum: 0,
                teamNum: 0,
                teamPassNum: 0,
                userNum: 0
            }
        },
        created() {
            this.getDatas()
        },
        methods: {
            getDatas () {
                let pamer = {
                    type: this.num
                }
                this.loading = true
                getData.statistics(pamer).then(res => {
                    this.loading = false
                    this.personalTeamNum = res.personalTeamNum
                    this.teamNum = res.teamNum
                    this.teamPassNum = res.teamPassNum
                    this.userNum = res.userNum
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeNav (val) {
                this.num = val
                this.getDatas()
            }
        }
    }
</script>

<style scoped lang="scss">
.dataStatistics{
    margin: 32px 41px;
    background: #fff;
    .nav{
        width: 100%;
        height: 95px;
        padding-left: 95px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0,0,0,0.5);
        border-bottom: 3px solid #F7F7F7;
        .item{
            margin-right: 35px;
            cursor: pointer;
        }
        .active{
            color: #000000;
        }
    }
    .content{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        margin-top: 60px;
        .contentBox{
            .item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 715px;
                height: 53px;
                border-bottom: 1px solid #d6d6d6;
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Semibold;
                font-weight: 600;
                color: #000000;
            }
        }
    }
}
</style>