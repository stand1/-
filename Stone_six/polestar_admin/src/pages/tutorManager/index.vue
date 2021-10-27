<template>
    <div class="tutor">
        <div class="top">
            <div class="btn" @click="goUrl">新增导师</div>
        </div>
        <div class="content">
            <el-table :data="dataList" style="width: 100%" v-loading="loading" height="600" @row-click="changeItem">
                <el-table-column label="头像">
                    <template slot-scope="scope">
                        <img class="imgs" :src="scope.row.imgUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="姓名">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="组织">
                    <template slot-scope="scope">
                        {{scope.row.company}}
                    </template>
                </el-table-column>
                <el-table-column label="头衔">
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
    import {getData} from "../../api";
    import pagination from "../../components/pageintaion"
    export default {
        name: "index",
        data () {
            return {
                loading: false,
                dataList: [],
                pageNum: 1,
                total: 0
            }
        },
        components: { pagination },
        created() {
            this.getDataList()
        },
        methods: {
            getDataList () {
                let  pamer = {
                    pageSize: 10,
                    pageNum: this.pageNum,
                    name: ''
                }
                this.loading = true
                getData.tutorList(pamer).then(res => {
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
                this.$router.push({path: '/saveTutor', query: {id:id}})
            },
            changePeger (val) {
                this.pageNum = val
                this.getDataList()
            },
            changeTop (i, item) {
                let id = item.id,
                    topOrder = 1;
                this.changeTutorIndex(id,topOrder)
            },
            moveUp (i, item) {
                let id = item.id,
                    topOrder = item.topOrder - 1;
                this.changeTutorIndex(id,topOrder)
            },
            moveDown (i, item) {
                let id = item.id,
                    topOrder = item.topOrder + 1;
                this.changeTutorIndex(id,topOrder)
            },
            changeTutorIndex (id, topOrder) {
                let pamer = {
                    id: id,
                    topOrder: topOrder
                }
                getData.changeTutor(pamer).then(res => {
                    this.getDataList()
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            goUrl () {
                this.$router.push({path: '/saveTutor', query: {id:0}})
            }
        }
    }
</script>

<style scoped lang="scss">
.tutor{
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
            width: 60px;
            height: 45px;
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