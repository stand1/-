<template>
    <div class="bannerManage">
<!--        <navBar isShow="1"></navBar>-->
        <div class="top">
            <div class="btn" @click="addBanner">新增Banner</div>
        </div>
        <div class="content">
            <el-table :data="dataList" style="width: 100%" v-loading="loading" height="600" @row-click="changeItem">
                <el-table-column label="Banner">
                    <template slot-scope="scope">
                        <img class="imgs" :src="scope.row.imgUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="名称">
                    <template slot-scope="scope">
                        {{scope.row.title}}
                    </template>
                </el-table-column>
                <el-table-column label="顺序">
                    <template slot-scope="scope">
                        {{scope.row.topOrder}}
                    </template>
                </el-table-column>
                <el-table-column label="排序">
                    <template slot-scope="scope">
                        <div class="changeBox">
                            <div class="item" @click.stop="changeTop(scope.$index, scope.row)">置顶</div>
                            <div class="item" @click.stop="moveUp(scope.$index, scope.row)">上移</div>
                            <div class="item" @click.stop="moveDown(scope.$index, scope.row)">下移</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination :total="total" @changePeger="changePeger"></pagination>
    </div>
</template>

<script>
    // import navBar from "../../components/navBar";
    import {getData} from "../../api";
    import pagination from "../../components/pageintaion"
    export default {
        name: "index",
        data () {
            return {
                dataList: [],
                loading: false,
                total: 0,
                pageNum: 1
            }
        },
        components: {
            // navBar
            pagination
        },
        created() {
            this.getBannerList()
        },
        methods: {
            getBannerList () {
                let pamer = {
                    pageSize: 10,
                    pageNum: this.pageNum
                }
                this.loading = true
                getData.bannerList(pamer).then(res => {
                    this.loading = false
                    this.dataList = res.records || []
                    this.total = res.total
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changePeger (val) {
                this.pageNum = val
                this.getBannerList()
            },
            changeTop (i, item) {
                let id = item.id,
                    topOrder = 1;
                this.changeBannerIndex(id,topOrder)
            },
            moveUp (i, item) {
                console.log(item.topOrder)
                let id = item.id,
                    topOrder = item.topOrder - 1;
                this.changeBannerIndex(id,topOrder)
            },
            moveDown (i, item) {
                let id = item.id,
                    topOrder = item.topOrder + 1;
                this.changeBannerIndex(id,topOrder)
            },
            changeBannerIndex (id, topOrder) {
                let pamer = {
                    id: id,
                    topOrder: topOrder
                }
                getData.changeBanner(pamer).then(res => {
                    this.getBannerList()
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeItem (row) {
                let id = row.id
                this.$router.push({path: '/banner', query: {id:id}})
            },
            addBanner () {
                this.$router.push({path: '/banner', query: {id:0}})
            }
        }
    }
</script>

<style scoped lang="scss">
.bannerManage{
    margin: 32px 41px 0;
    background: #fff;
    .top{
        height: 95px;
        display: flex;
        align-items: center;
        padding-left: 95px;
        border-bottom: 2px solid #F5F5F5;
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
            height: 90px;
        }
        .changeBox{
            .item{
                display: inline-block;
                padding: 0 5px;
                font-size: 18px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: #2b78e8;
                cursor: pointer;
            }
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