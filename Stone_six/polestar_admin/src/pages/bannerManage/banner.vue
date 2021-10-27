<template>
    <div class="banner" v-loading="loading">
        <navBar is-show="3" string-a="Banner管理 -" :string-b="title" @changeDel="changeDel" @changePreserve="changePreserve"></navBar>
        <div class="content">
            <div class="contentBox">
                <div class="tiemr">
                    <span class="title">Banner类型</span>
                    <el-select v-model="bannerType" placeholder="请选择" @change="changeType">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="inps">
                    <el-input v-model="title" placeholder="请输入Banner名称"></el-input>
                </div>
                <div class="imgs">
                    <p class="igmsTxt">Banner图片</p>
                    <img :src="imgUrl" alt="">
                    <div class="bomt" v-if="imgUrl">
                        <p class="bomtUpload">
                            更换图片
                            <input class="uploadImg" type="file" @change="changeImg($event,1)"/>
                        </p>
<!--                        <p @click.stop="delImg(1)">删除</p>-->
                    </div>
                    <p class="bomtUpload bomtUploadtxt" v-if="!imgUrl">
                        请上传Banner图片
                        <input class="uploadImg" type="file" @change="uploadImg($event,1)"/>
                    </p>
                </div>
                <div class="inps" v-if="bannerType == 2">
                    <el-input v-model="dataUrl" placeholder="请输入Banner跳转公众号连接"></el-input>
                </div>
                <div class="imgs"  v-if="bannerType == 1">
                    <p class="igmsTxt">Banner跳转图片</p>
                    <img :src="dataUrl" alt="">
                    <div class="bomt" v-if="dataUrl">
                        <p class="bomtUpload">
                            更换图片
                            <input class="uploadImg" type="file" @change="changeImg($event,2)"/>
                        </p>
<!--                        <p @click.stop="delImg(2)">删除</p>-->
                    </div>
                </div>
                <p class="bomtUpload bomtUploadtxt" v-if="bannerType == 1 && !dataUrl">
                    请上传Banner跳转图片
                    <input class="uploadImg" type="file" @change="uploadImg($event,2)"/>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    // import {getData} from "../../api";
    import navBar from "../../components/navBar";
    import {getData} from "../../api";
    import util from "../../utils/util";
    export default {
        name: "banner",
        data () {
            return {
                loading: false,
                id: this.$route.query.id,
                title: '',
                imgUrl: '',
                dataUrl: '',
                bannerType: '',
                options: [
                    {value: 1, label: '跳转图片'},
                    {value: 2, label: '跳转公众号文章'}
                ],
            }
        },
        components: {
            navBar
        },
        created() {
            if (this.id == 0) {
                this.title = '新增Banner'
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
                getData.bannerDetails(pamer).then(res => {
                    this.loading = false
                    this.title = res.title
                    this.imgUrl = res.imgUrl
                    this.dataUrl = res.dataUrl
                    this.bannerType = res.bannerType
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
                getData.delBanner(pamer).then(() => {
                    this.loading = false
                    this.$router.replace('/bannerManage/index')
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changePreserve () {
                if (this.bannerType == '') {
                    this.$message.warning('请选择Banner跳转类型')
                    return
                }
                if (this.title == '') {
                    this.$message.warning('请输入Banner名称')
                    return
                }
                if (this.imgUrl == '') {
                    this.$message.warning('请上传Banner图片')
                    return
                }
                if (this.dataUrl == '') {
                    if (this.bannerType == 1) {
                        this.$message.warning('请上传Banner跳转图片')
                    } else {
                        this.$message.warning('请输入Banner跳转公众号文章')
                    }
                    return
                }
                let pamer = {
                    id: this.id == 0 ? '': this.id,
                    title: this.title,
                    bannerType: this.bannerType,
                    imgUrl : this.imgUrl,
                    dataUrl: this.dataUrl
                }
                this.loading = true
                getData.saveBanner(pamer).then(() =>{
                    this.loading = false
                    this.$router.replace('/bannerManage/index')
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeType () {
                this.dataUrl = ''
            },
            changeImg (e, type) {
                let files = e.target.files[0];
                let formData = new FormData();
                formData.append('file',files);
                this.loading = true
                getData.uploadFiles(formData).then(res => {
                    this.loading = false
                    if (type == 1) {
                        this.imgUrl = res
                    } else {
                        this.dataUrl = res
                    }
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            uploadImg (e, type) {
                let files = e.target.files[0];
                let formData = new FormData();
                formData.append('file',files);
                this.loading = true
                getData.uploadFiles(formData).then(res => {
                    this.loading = false
                    if (type == 1) {
                        this.imgUrl = res
                    } else {
                        this.dataUrl = res
                    }
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.banner{
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
            padding-top: 35px;
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
                width: 500px;
            }
            .inps /deep/ .el-input__inner{
                border: none;
                background-color: #f7f7f7;
            }
            .inps /deep/ .el-textarea__inner{
                border: none;
                background-color: #f7f7f7;
            }
            .imgs{
                position: relative;
                margin-bottom: 30px;
                .igmsTxt{
                    font-weight: bold;
                    margin-bottom: 20px;
                }
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
            background-color: #f7f7f7;
        }
    }
}
</style>