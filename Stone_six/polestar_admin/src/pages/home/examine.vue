<template>
    <div class="examine" v-loading="loading">
        <navBar is-show="2" :string-a="str" :string-b="title" @changeViolation="changeViolation" @changePreserve="changePreserve"></navBar>
        <div class="content">
            <div class="examineL">
                <div class="top" v-if="types != 3">
                    <div class="title">个人信息</div>
                    <div class="item">
                        <span class="tilteTxt">姓名</span>
                        <span>{{userInfo.name}}</span>
                    </div>
                    <div class="item">
                        <span class="tilteTxt">手机</span>
                        <span>{{userInfo.phone}}</span>
                    </div>
                    <div class="item">
                        <span class="tilteTxt">邮箱</span>
                        <span>{{userInfo.email}}</span>
                    </div>
                    <div class="item">
                        <span class="tilteTxt">微信号</span>
                        <span>{{userInfo.wx}}</span>
                    </div>
                </div>
                <div class="btm">
                    <div class="title">团队信息</div>
                    <div class="item">
                        <span class="tilteTxt">团队名称</span>
                        <span>{{datas.teamName}}</span>
                    </div>
                    <div class="item items">
                        <span class="tilteTxt">团队介绍</span>
                        <span>{{datas.description}}</span>
                    </div>
                    <div class="item">
                        <span class="tilteTxt">招募要求</span>
                        <span>{{datas.projectDesc}}</span>
                    </div>
                </div>
                <div class="team" v-if="types == 3">
                    <div class="title">团队成员</div>
                    <div class="teamList">
                        <div class="item" v-for="(item, index) in datas.userWorkVos" :key="index">
                            <span class="tilteTxt">
                                {{index==0?'队长':index}}
                            </span>
                            <span>{{item.nickName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="examineR">
                <div class="title">作品信息</div>
                <p class="txt">个人简历</p>
                <div class="item">
                    <span class="tilteTxt">个人简介</span>
                    <div class="itemR">
                        <p>{{userInfo.resumeDescription}}</p>
                        <div class="imgList">
                            <div class="imgItem" v-for="(item, index) in userInfo.imgResumeUrls" :key="index">
                                <img :src="item" alt="">
                            </div>
                        </div>
                    </div>
                </div>
<!--                附件 -->
                <div class="item itemMargin" v-if="false">
                    <span class="tilteTxt">附件</span>
                    <div class="itemR">
                        <div class="enclosureList">
                            <p>附件1.PDF</p>
                            <p>附件1.PDF</p>
                            <p>附件1.PDF</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="txt">创意作品</p>
                    <div class="item">
                        <span class="tilteTxt">作品名称</span>
                        <span>{{teamWork.workName}}</span>
                    </div>
                    <div class="item">
                        <span class="tilteTxt">作品分类</span>
                        <span v-if="teamWork.workType == 0">HMI</span>
                        <span v-if="teamWork.workType == 1">智能出行</span>
                        <span v-if="teamWork.workType == 2">智能座舱</span>
                    </div>
                    <div class="item">
                        <span class="tilteTxt">作品介绍</span>
                        <div class="itemR">
                            <p>{{teamWork.workContent}}</p>
                            <div class="imgList">
                                <div class="" v-for="(item, index) in teamWork.imgUrls" :key="index">
                                    <img :src="item" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item itemMargin" v-if="false">
                        <span class="tilteTxt">附件</span>
                        <div class="itemR">
                            <div class="enclosureList">
                                <p>附件1.PDF</p>
                                <p>附件1.PDF</p>
                                <p>附件1.PDF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getData} from "../../api";
    import navBar from "../../components/navBar"
    export default {
        name: "examine",
        data () {
            return {
                loading: false,
                title: '神秘网友',
                types: this.$route.query.type,
                id: this.$route.query.id,
                str: '审核 -',
                datas: {},
                userInfo: {},
                teamWork: {},
                approvalComment: null,
                status: null
            }
        },
        components: {
            navBar
        },
        created() {
            if (this.$route.query.type == 2) {
                this.str = '用户管理 - 个人 -'
            } else if (this.$route.query.type == 3) {
                this.str = '用户管理 - 团队 -'
            }
            this.getDatas()
        },
        methods: {
            getDatas () {
                let pamer = {
                    teamId: this.id
                }
                this.loading = true
                getData.examineDetails(pamer).then(res => {
                    this.loading = false
                    this.datas = res || {}
                    this.userInfo = res.captain.resume || {}
                    this.teamWork = res.teamWork || {}
                }).catch(e => {
                    this.loading = false
                    this.$message.error(e.msg)
                })
            },
            changeViolation (val) {
                this.approvalComment = val
                this.status = 2
                this.changeExamine()
            },
            changePreserve () {
                this.approvalComment = null
                this.status = 1
                this.changeExamine()
            },
            changeExamine () {
                let pamer = {
                    workId: this.datas.workId,
                    teamId: this.datas.id,
                    status : this.status,
                    approvalComment: this.approvalComment
                }
                this.loading = true
                getData.examine(pamer).then(() => {
                    this.loading = false
                    if (this.types == 1) {
                        this.$router.push({path: '/home/index'})
                    } else if (this.types == 2) {
                        this.$router.push({path: '/user/index'})
                    } else {
                        this.$router.push({path: '/team/index'})
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
.examine{
    background-color: #fff;
    margin: 0 240px 0;
    padding-top: 102px;
    height: 100%;
    .content{
        display: flex;
        height: 100%;
        padding: 80px 95px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0,0,0,0.85);
        .title{
            font-size: 24px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: bold;
        }
        .line{
            width: 1px;
            background: #d6d6d6;
            margin: 0 95px;
        }
        .examineL{
            overflow-y: auto;
            .top{
                margin-bottom: 50px;
            }
            .item{
                width: 350px;
                min-height: 70px;
                border-bottom: 1px solid #d6d6d6;
                display: flex;
                align-items: center;
                span{
                    display: flex;
                    width: 240px;
                }
                .tilteTxt{
                    font-weight: bold;
                    font-family: PingFangSC, PingFangSC-Semibold;
                    width: 90px;
                }
            }
            .items{
                padding: 10px 0;
            }
            .item:last-child{
                border: none;
            }
            .team{
                margin-top: 30px;
            }
        }
        .examineR{
            overflow-y: auto;
            p.txt{
                font-size: 18px;
                font-family: PingFangSC, PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(0,0,0,0.5);
                padding: 32px 0 0;
            }
            .item{
                display: flex;
                width: 350px;
                padding: 24px 0;
                border-bottom: 1px solid #d6d6d6;
                span{
                    display: flex;
                    width: 240px;
                }
                .tilteTxt{
                    font-weight: bold;
                    font-family: PingFangSC, PingFangSC-Semibold;
                    width: 90px;
                }
                .itemR{
                    width: 240px;
                    p{
                        margin-bottom: 10px;
                    }
                    .imgList{
                        img{
                            width: 240px;
                            height: 100px;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
            .itemMargin{
                border: none;
            }
        }
    }
}
</style>