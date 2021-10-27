<template>
    <div class="answers">
<!--        <navBar isShow="1"></navBar>-->
        <div class="nav">
            <div class="searchBox">
                <el-input placeholder="搜索问题" v-model="keys"></el-input>
                <i class="searchs el-icon-search" @click="searchs"></i>
            </div>
            <div class="selects">
                <span class="title">分类</span>
                <el-select v-model="value" placeholder="全部" @change="changeNum">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="btn" @click="addAnswers">新增问题</div>
        </div>
        <div class="content">
            <el-table :data="dataList" style="width: 100%" v-loading="loading" height="600" @row-click="changeItem">
                <el-table-column prop="title" label="问题"></el-table-column>
                <el-table-column label="浏览次数" width="80">0</el-table-column>
                <el-table-column label="有帮助/无帮助" width="160"></el-table-column>
                <el-table-column label="分类" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.questionType == 0">活动规则</span>
                        <span v-if="scope.row.questionType == 1">奖品及报销</span>
                        <span v-if="scope.row.questionType == 2">关于极星</span>
                        <span v-if="scope.row.questionType == 3">参赛建议</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination :total="total" @changePeger="changePeger"></pagination>
    </div>
</template>

<script>
    import {getData} from "../../api";
    // import navBar from "../../components/navBar";
    import pagination from "../../components/pageintaion"
    export default {
        name: "index",
        data () {
            return {
                loading: false,
                dataList: [],
                keys: '',
                total: 0,
                pageNum: 1,
                value: 666,
                options: [
                    {value: 666, label: '全部'},
                    {value: 0, label: '活动规则'},
                    {value: 1, label: '奖品及报销'},
                    {value: 2, label: '关于极星'},
                    {value: 3, label: '参赛建议'}
                ]
            }
        },
        components: {
            // navBar
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
                    name: this.keys,
                    type: this.value == 666 ? '' : this.value
                }
                this.loading = true
                getData.questionList(pamer).then(res => {
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
            changeNum () {
                this.pageNum = 1
                this.getDataList()
            },
            changePeger (val) {
                this.pageNum = val
                this.getDataList()
            },
            changeItem (row) {
                let id = row.id
                this.$router.push({path: '/answersManager', query: {id:id}})
            },
            addAnswers () {
                this.$router.push({path: '/answersManager', query: {id:0}})
            }
        }
    }
</script>

<style scoped lang="scss">
.answers{
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
            .searchs{
                position: absolute;
                top: 6px;
                right: 10px;
                font-size: 26px;
                cursor: pointer;
            }
        }
        .selects{
            margin: 0 65px;
            font-size: 18px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #000000;
            .title{
                margin-right: 16px;
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