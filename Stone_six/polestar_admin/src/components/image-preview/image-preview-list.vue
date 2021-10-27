
<template>
  <!-- <el-dialog :title="''" :width="width" :modal="false"  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false" 
  :visible.sync="dialogFormVisible" class="dialog-right-warrper"></el-dialog> -->
  <el-dialog :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" class="image-preview-list-container">
    <img class="preview-img" :src="imgObj.imgUrl.concat(oss?'?x-oss-process=image/resize,w_711/quality,50':'')" alt="">
    <div class="arrow left" @click="handleChange(-1);"><img src="https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/20200528/left_icon_white_1_zu4oti3.svg" alt=""></div>
    <div class="arrow right"  @click="handleChange(1);"><img src="https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/20200528/right_icon_white_2_dyxodg2.svg" alt=""></div>
    <div class="close" @click="close"><img src="@/assets/images/dialog-close.svg" alt=""></div>
  </el-dialog>
</template>
<script>
export default {
  name: 'edit-message',
  data() {
    return {
        dialogVisible: false,
        imgObj: '',
    };
  },
  props: {
    width: {
      type: String,
      default: '350px'
    },
    oss: {
      type: Boolean,
      default: false
    },
    // src: {
    //   type: String,
    //   default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540742400401&di=01f8e3559614736d9bfe570709f98a80&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f4d6599f7c0ca80121ad7bdd9a58.jpg'
    // },
    // index: {
    //     type: [Number,String],
    //     default: 0
    // },
    imgList: {
        type: Array
    },
    title: {
      type: String,
      default: '预览图片'
    },
    type: {
      type: String,
      default: 'image'
    },
  },
  components: {},
  watch: {},
  methods: {
    open(options) {
      console.log(options);
    //   this.imgList = options.list;
      this.index = options.index;
      this.imgObj = this.imgList[this.index];
      this.dialogVisible = true;
    },
    handleChange(flag) {
        debugger
        if(flag>0&&this.index<this.imgList.length-1){
            this.index += 1;
            this.imgObj = this.imgList[this.index];
        }
        if(flag<0&&this.index>0){
            this.index -= 1;
            this.imgObj = this.imgList[this.index];
        }
    },
    close() {
        this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss">
.image-preview-list-container{
    // position: relative;
    .el-dialog{
        height: 80vh;
        width: 80%;
        border: none;
        border-radius: 0;
        box-shadow: none;
        background: transparent;
        margin-top: 10vh !important;
        .el-dialog__header{
            padding: 0;
        }
        .el-dialog__body{
            padding: 0;
            height: 100%;
        }
        .preview-img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .arrow{
        width: 32px;
        height: 32px;
        position: absolute;
        top: calc(50% - 24px);
        cursor: pointer;
    }
    .left{
        left: -2%;
    }
    .right{
        right: -2%;
    }
    .close{
        width: 32px;
        height: 32px;
        position: absolute;
        top: 0px;
        right: -50px;
        border: 1px solid #fff;
        cursor: pointer;
    }
}
</style>


