<template>
<transition name="mask">
    <div class="cropp_container flex" v-show="currentValue">
        <input style="display:none" v-model="currentValue">
        <div class="content" v-show="currentValue">
            <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :info="true"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :full="option.full"
                :fixedBox="option.fixedBox"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :centerBox="option.centerBox"
                :high="option.high"
                :infoTrue="option.infoTrue"
                :maxImgSize="option.maxImgSize"
                :mode="option.mode" 
            ></vueCropper>
            <!-- :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight" -->
            <!-- :fixed="option.fixed" -->
            <!-- :fixedNumber="option.fixedNumber" -->
            <!-- :canScale="option.canScale" -->
        </div>
        <div class="close" @click="close">
            <i class="el-icon-close"></i>
        </div>
        <div class="confirm" @click="comfirm">
            使用
        </div>
        <loading v-if="showLoading" type="bars" size="40">...</loading>
    </div>
</transition>
</template>
    
<script>
import { getData } from "@/api";
import { VueCropper } from "vue-cropper";
var ModalHelper = (function (bodyCls) {
    var scrollTop;
    return {
        afterOpen: function () {//弹框弹出时
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function () {//弹框消失时
            document.body.classList.remove(bodyCls);
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('modal-open');


export default {
    name: 'cropp',
    data() {
        return {
            showLoading: false,
            currentValue: false,
            option: {
                img: "",
                outputSize: 1, // 裁剪生成图片的质量
                outputType: 'png', // 裁剪生成图片的格式
                info: true, // 裁剪框的大小信息
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                // 只有自动截图开启 宽度高度才生效
                // autoCropWidth: 100, // 默认生成截图框宽度
                // autoCropHeight:300, // 默认生成截图框高度
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [178, 133], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                fixedBox: false,   // 固定截图框大小 不允许改变
                canMove: false,    //上传图片是否可以移动
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                high: true,   //false;
                infoTrue: false, // false;     true 为展示真实输出图片宽高 false 展示看到的截图
                maxImgSize: 1000,
                enlarge: 1,
                mode: "contain",  // 图片默认渲染方式  contain , cover, 100px, 100% auto
                //mode: "contain",  // 图片默认渲染方式  contain , cover, 100px, 100% auto
            },
            croppImg: '', 
            cropImgWidth: '',
            cropImgHeight: ''
        }
    },
    props: {
        value: {
            type: Boolean,
            default: true
        },
        imgSrc: {
            type: String,
        },
        cropWidth: {
            type: [String,Number],
            default: 200
        },
        cropHeight: {
            type: [String,Number],
            default: 200
        },
        // cropImgWidth: {
        //     type: [String,Number],
        //     default: 200
        // },
        // cropImgHeight: {
        //     type: [String,Number],
        //     default: 200
        // },
        // rightFun: {
        //     type: Function,
        //     default: null
        // }
        rightFun: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
            if(val){
                ModalHelper.afterOpen();
            }else{
                ModalHelper.beforeClose();
            }
        },
        imgSrc(val){
            this.option.img = val;
            this.getImageInfo(val);
        },
        cropWidth(val){
            this.option.fixedNumber[0] = val;
        },
        cropHeight(val){
            this.option.fixedNumber[1] = val;
        },
        currentValue(val) {
            // this.$emit(val ? "on-show" : "on-hide");
            this.$emit(val?"":"on-hide",this.croppImg);
            this.$emit("input", val);
        }
    },
    components: {
        VueCropper
    },
    created() {
        if (typeof this.value !== "undefined") {
            this.currentValue = this.value;
            this.option.img = this.imgSrc;
            this.getImageInfo(this.imgSrc);
            this.option.fixedNumber[0] = this.cropWidth;
            this.option.fixedNumber[1] = this.cropHeight;
        }
    },
    mounted() {

    },
    methods: {
        close() {
            this.currentValue = false;
        },
        comfirm() {
            var that = this;
            that.showLoading = true;
            if(this.rightFun){ 
                console.log(this.cropImgWidth);   //原图的宽
                console.log(this.cropImgHeight);  //原图的高
                var _img = this.$refs.cropper.getImgAxis();
                var _crop = this.$refs.cropper.getCropAxis();
                console.log(_img);
                console.log(_crop);
                let cropW,cropH,_imgWidth,_imgHeight,_w,_h,_x,_y;
                cropW = this.$refs.cropper.cropW;  //框的宽
                cropH = this.$refs.cropper.cropH;  //框的高
                _imgWidth = _img.x2 - _img.x1;   //现图的宽
                _imgHeight = _img.y2 - _img.y1;  //现图的高

                _w = cropW/_imgWidth  * this.cropImgWidth;
                _h = cropH/_imgHeight  * this.cropImgHeight;
                _x = (_crop.x1 - _img.x1)/_imgWidth  * this.cropImgWidth;
                _y = (_crop.y1 - _img.y1)/_imgHeight  * this.cropImgHeight;

                console.log(_w);
                console.log(_h);
                console.log(_x);
                console.log(_y);
                let param = {
                    ossUrl: that.imgSrc,
                    x: Math.round(_x),
                    y: Math.round(_y),
                    w: Math.round(_w),
                    h: Math.round(_h)
                }
                getData.cropImage(param).then(res=>{
                    that.croppImg = res;
                    that.currentValue = false;
                })
                .catch(e=>{
                    if(e.code!=401){
                    this.$toast(e.msg);
                    }
                })
                
            }else{
                this.$refs.cropper.getCropBlob(data => {    //getCropData ==base64 ||  getCropBlob == blob
                    data.name = 'cropp.png';
                    // console.log('data',data);
                    that.uploadService(1,data,res=>{
                        that.showLoading = false;
                        if(res){
                            that.croppImg = res;
                        }
                        that.currentValue = false;
                    });
                });
            }
        },
        getImageInfo(src){
            let that = this;
            var img = new Image();
            img.src = src;
            var check = function(){
                // 只要任何一方大于0 表示已经服务器已经返回宽高
                if(img.width>0 || img.height>0){
                    console.log('width:'+img.width+',height:'+img.height);
                    that.cropImgWidth = img.width;
                    that.cropImgHeight = img.height;
                    console.log(that.cropWidth+'++++'+that.cropWidth);
                    
                    clearInterval(set);
                }
            };
            var set = setInterval(check,40);
        },
    }
}
</script>
<style scoped lang="less">
.cropp_container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1010;
    min-height: 100vh;
    background: rgba(0,0,0,0.5);
    overflow-y: auto;
    align-items: center;
    justify-content: center;
    /* .mask-leave-active {
        transition: all 0s ease 0.2s;
        transition-delay: 0.2s;
    }
    .mask-enter,.mask-leave-to{
        opacity: 0;
    }  */
    .content{
        width: 60%;
        height: 90vh;
        // flex: 1;
        img{
            width: 100%;
        }
    }
    .close{
        position: fixed;
        left: calc(80% + 70px);
        top: calc(50vh - 50px);
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        i{
            font-size: 16px;
        }
    }
    .confirm{
        position: fixed;
        left: calc(80% + 50px);
        top: calc(50vh + 50px);
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #12A0F8;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
    }
}
</style>
<style lang="less">
.cropp_container{
    .child_header_box .headerbar_container .right{
        width: 104px;
        height: 56px;
        line-height: 56px;
        background:#F81E36;
        border-radius: 28px;
        text-align: center;
        font-size:28px;
        color: #fff;
        button.btn_pub{
            display: block;
            width: 100%;
            text-align: center;
            font-size:28px;
            color: #fff;
            line-height: 56px;
            padding-left: 0;
            padding-right: 0;
            margin-left: 0;
        }
    }
}

</style>
    