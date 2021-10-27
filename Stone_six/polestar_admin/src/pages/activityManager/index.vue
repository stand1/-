<template>
    <div class="activityManager">
<!--        <navBar isShow="1"></navBar>-->
        <div class="nav">
            <div :class="['item', num == item.id ? 'active' : '']" v-for="(item, index) in navList" :key="index" @click="changeNav(item.id)">{{item.name}}</div>
            <div class="btn" @click="addActivity">新增活动</div>
        </div>
        <div class="content">
            <el-table :data="dataList" style="width: 100%" v-loading="loading" height="600" @row-click="changeItem">
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <img class="imgs" :src="scope.row.imgUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="活动名称"></el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.beginTime}}</span>
                        <span>~</span>
                        <span>{{scope.row.endTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="浏览次数">0</el-table-column>
                <el-table-column label="评论数">0</el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">预告</span>
                        <span v-if="scope.row.status == 1">进行中</span>
                        <span v-if="scope.row.status == 2">已结束</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination :total="total" @changePeger="changePeger"></pagination>
    </div>
</template>

<script>
    // import navBar from "../../components/navBar";
    import  {getData} from "../../api";
    import pagination from "../../components/pageintaion"
    export default {
        name: "index",
        data () {
            return {
                loading: false,
                num: 0,
                navList: [
                    {id: 0, name: '预告'},
                    {id: 1, name: '进行中'},
                    {id: 2, name: '已结束'}
                ],
                dataList: [],
                pageNum: 1,
                total: 0
            }
        },
        components: {
            // navBar
            pagination
        },
        created() {
            this.getActivityList()
        },
        methods: {
            changePeger (val) {
                this.pageNum = val
                this.getActivityList()
            },
            changeNav (i) {
                this.num = i
                this.pageNum = 1
                this.getActivityList()
            },
            getActivityList () {
                let pamer = {
                    pageSize: 10,
                    pageNum: this.pageNum,
                    status: this.num
                }
                this.loading = true
                getData.activityList(pamer).then(res => {
                    this.loading = false
                    this.dataList = res.records || []
                    this.total = res.total
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeItem (row) {
                let id = row.id
                this.$router.push({path: '/activity', query: {id:id}})
            },
            addActivity () {
                this.$router.push({path: '/activity', query: {id:0}})
            }
        },
    }
</script>

<style scoped lang="scss">
.activityManager{
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
        .item{
            margin-right: 35px;
            cursor: pointer;
        }
        .active{
            color: #000000;
        }
        .btn{
            width: 140px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            opacity: 1;
            background: #53565a;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            cursor: pointer;
        }
    }
    .content{
        padding: 0 95px;
        .imgs{
            width: 150px;
            height: 60px;
        }
    }
    .content /deep/ .el-table th > .cell {
        text-align: center;
    }
    .content /deep/ .el-table .cell {
        text-align: center;
    }
}
</style>