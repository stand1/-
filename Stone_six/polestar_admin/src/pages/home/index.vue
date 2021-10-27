<template>
    <div class="index">
<!--        <div class="indexTop">-->
<!--            <navBar isShow="1"></navBar>-->
<!--        </div>-->
        <div class="content">
            <div class="nav">
                <div :class="['item', num == item.id ? 'active' : '']" v-for="(item, index) in navList" :key="index" @click="changeNav(item.id)">{{item.name}}</div>
            </div>
            <div class="contentBox">
                <el-table :data="dataList" style="width: 100%" v-loading="loading" height="600" @row-click="changeItem">
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <span>{{scope.row.captain.nickName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="团队名">
                        <template slot-scope="scope">
                            <span>{{scope.row.teamName?scope.row.teamName:'--'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="作品类别">
                        <template slot-scope="scope">
                            <span v-if="scope.row.teamWork.workType == 0">HMI</span>
                            <span v-if="scope.row.teamWork.workType == 1">智能出行</span>
                            <span v-if="scope.row.teamWork.workType == 2">智能座舱</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="作品名">
                        <template slot-scope="scope">
                            <span>{{scope.row.teamWork.workName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报名时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="申请次数">1</el-table-column>
                </el-table>
            </div>
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
                num: 0,
                navList: [
                    {id: 0, name: '未审核'},
                    {id: 2, name: '未通过'},
                    {id: 1, name: '已通过'}
                ],
                loading: false,
                dataList: [],
                total: 0,
                pageNum: 1
            }
        },
        components:{
            // navBar,
            pagination
        },
        created() {
            this.getDataList()
        },
        methods: {
            getDataList () {
                let pamer = {
                    pageNum: this.pageNum,
                    pageSize: 10,
                    status: this.num
                }
                this.loading = true
                getData.examineList(pamer).then(res => {
                    this.loading = false
                    this.dataList = res.records || []
                    this.total = res.total
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeNav (i) {
                this.num = i
                this.getDataList()
            },
            changePeger (val) {
                this.pageNum = val
                this.getDataList()
            },
            changeItem (row) {
                let id = row.id
                this.$router.push({path: '/examine', query: {id:id,type:1,status:this.num}})
            }
        }
    }
</script>

<style scoped lang="scss">
.index{
    margin: 32px 41px;
    background: #fff;
    .content{
        width: 100%;
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
        }
        .contentBox /deep/ .el-table th > .cell {
            text-align: center;
        }
        .contentBox /deep/ .el-table .cell {
            text-align: center;
        }
    }
}
</style>