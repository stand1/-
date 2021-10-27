<template>
    <div class="activity" v-loading="loading">
        <navBar is-show="3" string-a="活动管理 -" :string-b="title" @changeDel="changeDel" @changePreserve="changePreserve"></navBar>
        <div class="content">
            <div class="contentBox">
                <div class="tiemr">
                    <span class="title">活动时间</span>
                    <el-date-picker v-model="timers" type="datetimerange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"  @change="changeTimer">
                    </el-date-picker>
                </div>
                <div class="inps">
                    <el-input v-model="title" placeholder="请输入活动标题"></el-input>
                </div>
                <div class="inps">
                    <el-input type="textarea" :rows="6" placeholder="请输入内容" resize="none" v-model="description"></el-input>
                </div>
                <div class="imgList">
                    <div class="item" v-for="(item,index) in contentImgs" :key="index">
                        <img :src="item" alt="">
                        <div class="bomt">
                            <p class="bomtUpload">
                                更换图片
                                <input class="uploadImg" type="file" @change="changeImg($event,index)"/>
                            </p>
                            <p @click.stop="delImg(index)">删除</p>
                        </div>
                    </div>
                </div>
                <p class="bomtUpload bomtUploadtxt">
                    添加图片
                    <input class="uploadImg" type="file" @change="uploadImg($event)"/>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {getData} from "../../api";
    import util from "../../utils/util"
    import navBar from "../../components/navBar"
    export default {
        name: "activity",
        data () {
            return {
                loading: false,
                id: this.$route.query.id,
                title: '',
                imgUrl: '',
                imgUrls: '',
                description: '',
                contentImgs: [],
                beginTime: '',
                endTime: '',
                timers: [],
            }
        },
        components: {
            navBar
        },
        created() {
            if (this.id == 0) {
                this.title = '新增活动'
                return
            }
            this.getDatas()
        },
        methods: {
            getDatas () {
                let pamer = {
                    id: this.id
                }
                this.loading = true
                getData.activityDetails(pamer).then(res => {
                    this.loading = false
                    this.title = res.title
                    this.imgUrl = res.imgUrl
                    this.description = res.description
                    this.contentImgs = res.contentImgs
                    this.beginTime = res.beginTime
                    this.endTime = res.endTime
                    this.timers.push(res.beginTime)
                    this.timers.push(res.endTime)
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeDel () {
                let pamer = {
                    id: this.id
                }
                this.loading = true
                getData.delActivity(pamer).then(() => {
                    this.loading = false
                    this.$router.replace('/activityManager/index')
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changePreserve () {
                if (this.timers.length == 0) {
                    this.$message.warning('请选择活动时间')
                    return
                }
                if (this.title == '') {
                    this.$message.warning('请输入活动名称')
                    return
                }
                if (this.description == '') {
                    this.$message.warning('请输入活动详情')
                    return
                }
                if (this.contentImgs.length == 0) {
                    this.$message.warning('请上传活动图片')
                    return
                }
                let pamer = {
                    id: this.id == 0 ? '': this.id,
                    title: this.title,
                    imgUrl: this.contentImgs[0],
                    description : this.description,
                    contentImgs: this.contentImgs,
                    beginTime: this.beginTime,
                    endTime: this.endTime
                }
                this.loading = true
                getData.saveActivity(pamer).then(() =>{
                    this.loading = false
                    this.$router.replace('/activityManager/index')
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeTimer (val) {
                this.beginTime = util.parseTime(val[0])
                this.endTime = util.parseTime(val[1])
            },
            delImg (i) {
                this.contentImgs.splice(i,1)
            },
            async changeImg (e,i) {
                let files = e.target.files[0];
                let formData = new FormData();
                formData.append('file',files);
                this.loading = true
                let a = await getData.uploadFiles(formData).then(res => {
                    this.loading = false
                    return res
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
                let arr = JSON.parse(JSON.stringify(this.contentImgs))
                arr[i] = a
                this.contentImgs = arr
            },
            async uploadImg (e) {
                let files = e.target.files[0];
                let formData = new FormData();
                formData.append('file',files);
                this.loading = true
                let a = await getData.uploadFiles(formData).then(res => {
                    this.loading = false
                    return res
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
                this.contentImgs.push(a)
            }
        }
    }
</script>

<style scoped lang="scss">
.activity{
    margin: 2px 240px 0;
    height: 100%;
    background: #fff;
    .content{
        padding-top: 102px;
        height: 95%;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        .contentBox{
            .uploadImg{
                border: none;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
            }
            .tiemr{
                display: flex;
                align-items: center;
                margin-bottom: 32px;
                .title{
                    font-size: 18px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    color: #000000;
                    margin-right: 16px;
                }
            }
            .inps{
                margin-bottom: 32px;
                width: 600px;
            }
            .inps /deep/ .el-input__inner{
                border: none;
                background-color: #f7f7f7;
            }
            .inps /deep/ .el-textarea__inner{
                border: none;
                background-color: #f7f7f7;
            }
            .imgList{
                .item{
                    position: relative;
                    img{
                        width: 320px;
                        height: 160px;
                        margin-bottom: 20px;
                    }
                    .bomt{
                        width: 320px;
                        height: 36px;
                        opacity: 0.5;
                        background: rgba(83,86,90,0.5);
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        z-index: 11;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 15px;
                        font-size: 12px;
                        font-family: PingFangSC, PingFangSC-Semibold;
                        font-weight: 600;
                        color: #ffffff;
                    }
                }
            }
            .bomtUpload{
                position: relative;
            }
            .bomtUploadtxt{
                width: 320px;
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: #2b78e8;
                cursor: pointer;
            }
        }
        .contentBox /deep/ .el-input__inner{
            border: none;
        }
        .contentBox /deep/ .el-date-editor .el-range-input{
            background-color: #f7f7f7;
        }
    }
}
</style>