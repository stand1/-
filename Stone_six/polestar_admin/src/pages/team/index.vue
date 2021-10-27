<template>
    <div class="team">
        <div class="nav">
            <div class="searchBox">
                <el-input placeholder="搜索姓名、团队名" v-model="keys"></el-input>
                <i class="searchs el-icon-search" @click="searchs"></i>
            </div>
            <div class="btn" @click="exports">批量导出</div>
        </div>
        <div class="content">
            <el-table :data="dataList" style="width: 100%" v-loading="loading" height="600" @row-click="changeItem">
                <el-table-column prop="teamName" label="团队名称"></el-table-column>
                <el-table-column prop="captain.nickName" label="队长"></el-table-column>
                <el-table-column prop="userWorkVos.length" label="队员数量" width="80"></el-table-column>
                <el-table-column prop="teamWork.workName" label="作品名称"></el-table-column>
            </el-table>
        </div>
        <pagination :total="total" @changePeger="changePeger"></pagination>
    </div>
</template>

<script>
    import {getData} from "../../api";
    import pagination from "../../components/pageintaion"
    import qs from "qs"
    import {apiURL} from "@/api/config/ip-config"
    export default {
        name: "index",
        data () {
            return {
                keys: '',
                loading: false,
                dataList: [],
                total: 0,
                pageSize: 10,
                pageNum: 1
            }
        },
        components: {
            pagination
        },
        created() {
            this.getDataList()
        },
        methods: {
            getDataList () {
                let pamer = {
                    isPersonal: 0,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.keys
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
            searchs () {
                this.pageNum = 1
                this.getDataList()
            },
            exports () {
                let pamer = {
                    isPersonal: 1,
                    name: this.keys
                }
                let url =apiURL +"api/v1.0/jx/team/export?" + qs.stringify(pamer);
                window.open(url);
            },
            changePeger (val) {
                this.pageNum = val
                this.getDataList()
            },
            changeItem (row) {
                let id = row.id
                this.$router.push({path: '/examine', query: {id:id,type:3,status:0}})
            },
        }
    }
</script>

<style scoped lang="scss">
.team{
    margin: 32px 41px;
    background: #fff;
    .nav{
        height: 95px;
        opacity: 1;
        background: #ffffff;
        display: flex;
        align-items: center;
        padding-left: 95px;
        border-bottom: 1px solid #F5F5F5;
        .searchBox{
            position: relative;
            margin-right: 40px;
            .searchs{
                position: absolute;
                top: 6px;
                right: 10px;
                font-size: 26px;
                cursor: pointer;
            }
        }
        .btn{
            width: 120px;
            height: 40px;
            line-height: 40px;
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
    .nav .searchBox /deep/ .el-input{
        width: 400px;
    }
    .nav .searchBox /deep/ .el-input__inner{
        background: #f1f1f1;
        border: none;
    }
    .nav .selects /deep/ .el-input{
        width: 140px;
    }
    .nav .selects /deep/ .el-input__inner{
        background: #f7f7f7;
        border: none;
    }
    .content{
        padding: 0 95px;
    }
    .content /deep/ .el-table th:first-child > .cell {
        text-align: left;
    }
    .content /deep/ .el-table th > .cell {
        text-align: center;
    }
    .content /deep/ .el-table .cell {
        text-align: center;
    }
    .content /deep/ .el-table td:first-child .cell {
        text-align: left;
    }
}
</style>