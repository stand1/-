<template>
    <div class="pagintaion">
        <el-pagination background layout="prev, pager, next" :pageSize="10" @current-change="changePagers" :total="total"></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pageintaion",
        data () {
            return {}
        },
        props: ['total'],
        methods: {
            changePagers (val) {
                this.$emit('changePeger', val)
            }
        }
    }
</script>

<style scoped lang="scss">
.pagintaion{
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: center;
}
.pagintaion /deep/ .el-pagination .el-pager li{
    background-color: #fff;
}
.pagintaion /deep/ .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #53565a;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 2px;
    color: #fff;
}
.pagintaion /deep/ .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #53565a;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 2px;
    color: #fff;
}
.pagintaion /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #d6d6d6;
}
.pagintaion /deep/ .el-icon-arrow-left:before {
    content: "上一页";
}
.pagintaion /deep/ .el-icon-arrow-right:before {
    content: "下一页";
}
</style>