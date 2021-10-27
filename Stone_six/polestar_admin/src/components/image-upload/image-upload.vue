
<template>
    <div class="image-upload-container">

        <!-- <Icon class="icon" size="20" type="ios-image-outline" @click="uploadImage()"/> -->
        <i class="icon iconfont icon-xingzhuang-tupian"  @click="uploadImage()"></i>
        
        <upload-box ref="upload">{{uploadImgDisc}}</upload-box>

        <!-- <el-dialog width="30%" title="文件上传" :visible.sync="innerVisible" class="upload-container"  @close="close" append-to-body>
            <el-upload
                class="upload-demo" drag ref="upload-tool" :data="OSSKey" :action="OSSKey.host || ''"
                :on-success="uploadImgSuccess"
                :on-error="uploadImgError" :before-upload="beforeUpload" :limit="1" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog> -->

    </div>
</template>

<script>
// import Util from "@/util/utiljs";
import uploadBox from "@/components/image-upload/index";
// import BASEURL from "@/api/ip-config/main";
export default {
  data() {
    return {
      form: {
        messageImageList: []
      },
      uploadImgDisc: ""
    };
  },
  props: ["value", "max", "msg","type"],
  computed: {
    // arrlist: {
    //   get() {
    //     return this.value || [] ;
    //   },
    //   set(val) {
    //     this.$nextTick(() => {
    //       this.$emit("input", val);
    //     });
    //   }
    // }
  },
  created() {},
  methods: {
    uploadImage(tag) {
      let callback = null;
      this.uploadImgDisc = this.msg || "只能上传jpg/png文件";
      callback = (imageUrl, obj) => {
        console.log(imageUrl);
        console.log(obj); 
        if(this.type=="message"){
          this.$emit('imageMsgSuccess', obj)
        }
        // this.arrlist = this.arrlist || [];
        // this.arrlist.push({
        //   url: imageUrl,
        //   fileType: obj.fileType
        // });
      };
      this.$refs.upload.open(tag, callback);
    },

  },
  components: {
    uploadBox
  }
};
</script>
<style lang="less" scoped>
.image-upload-container{
  display: inline-block;
  .icon{
    margin-left: 8px;
  }
}
.img-container {
  display: inline-flex;
  border: 1px solid #e4e4e4;
  width: 150px;
  height: 150px;
  margin: 10px;
  background: #f7f7f7;
  flex-direction: column;
  .tools {
    height: 40px;
    justify-content: space-around;
    display: flex;
    align-items: center;
    i {
      border: 0;
      background: transparent;
      font-size: 1.5em;
      width: 32.5px;
      text-align: center;
      cursor: pointer;
      color: #aaa;
      //   color: #409eff;
      &.delete {
        color: #ff7979;
      }
    }
  }
  .elcontain {
    justify-content: center;
    align-items: center;
    display: flex;
    height: 110px;
    img,
    video {
      max-width: 150px;
      max-height: 110px;
    }
  }
}
</style>