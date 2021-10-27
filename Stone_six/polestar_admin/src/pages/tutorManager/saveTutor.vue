<template>
    <div class="saveTutor" v-loading="loading">
        <navBar is-show="3" string-a="导师管理 -" :string-b="name" @changeDel="changeDel" @changePreserve="changePreserve"></navBar>
        <div class="content">
            <div class="contentBox">
                <div class="uploadImg">
                    <img :src="imgUrl" alt="" v-loading="imgLoading">
                    <div class="txt">
                        {{imgUrl==''?'新增头像':'更换头像'}}
                        <input type="file" @change="uploadImg($event)"/>
                    </div>
                </div>
                <div class="inps">
                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </div>
                <div class="inps">
                    <el-input v-model="company" placeholder="请输入公司"></el-input>
                </div>
                <div class="inps">
                    <el-input v-model="title" placeholder="请输入头衔"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getData} from "../../api";
    import navBar from "../../components/navBar";
    export default {
        name: "saveTutor",
        data () {
            return {
                loading: false,
                imgLoading: false,
                userId: this.$route.query.id,
                imgUrl: '',
                name: '',
                company: '',
                title: '',
            }
        },
        components: {
            navBar
        },
        created() {
            if (this.userId == 0) {
                this.name = '新增导师'
                return
            }
            this.getTutorDetails()
        },
        methods: {
            getTutorDetails () {
                let pamer = {
                    id: this.userId
                }
                this.loading = true
                getData.tutorDetails(pamer).then(res => {
                    this.loading = false
                    this.imgUrl = res.imgUrl
                    this.title = res.title
                    this.company = res.company
                    this.name = res.name
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeDel () {
                let pamer = {
                    id: this.userId
                }
                this.loading = true
                getData.delTutor(pamer).then(() => {
                    this.loading = false
                    this.$router.replace('/tutorManager/index')
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changePreserve () {
                if (this.imgUrl == '') {
                    this.$message.warning('请上传导师图像')
                    return
                }
                if (this.name == '') {
                    this.$message.warning('请输入导师姓名')
                    return
                }
                if (this.company == '') {
                    this.$message.warning('请输入导师公司')
                    return
                }
                if (this.title == '') {
                    this.$message.warning('请输入导师头衔')
                    return
                }
                let pamer = {
                    id: this.userId == 0 ? '': this.userId,
                    name: this.name,
                    imgUrl: this.imgUrl,
                    company: this.company,
                    title: this.title
                }
                this.loading = true
                getData.saveTutor(pamer).then(() =>{
                    this.loading = false
                    this.$router.replace('/tutorManager/index')
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            uploadImg (e) {
                let files = e.target.files[0];
                let formData = new FormData();
                formData.append('file',files);
                this.imgLoading = true
                getData.uploadFiles(formData).then(res => {
                    this.imgLoading = false
                    this.imgUrl = res
                }).catch(err => {
                    this.imgLoading = false
                    this.$message.error(err.msg)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.saveTutor{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    .content{
        margin: 2px 240px 0;
        background: #fff;
        display: flex;
        height: 95%;
        justify-content: center;
        .contentBox{
            padding: 65px 0;
            .uploadImg{
                display: flex;
                align-items: center;
                font-size: 18px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: center;
                color: #2b78e8;
                margin-bottom: 31px;
                img{
                    width: 256px;
                    height: 190px;
                    opacity: 1;
                    background: #d8d8d8;
                    border: 1px solid #979797;
                }
                .txt{
                    position: relative;
                    margin-left: 23px;
                    cursor: pointer;
                    input{
                        border: none;
                        opacity: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                    }
                }
            }
            .inps{
                margin-bottom: 31px;
            }
            .inps /deep/ .el-input__inner{
                border: none;
                background: #f7f7f7;
                color: #000;
            }
        }
    }
}
</style>