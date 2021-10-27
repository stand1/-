
<template>
    <div class="image-upload-list-container">
        <el-upload ref="upload-tool" :data="OSSKey" :action="OSSKey.host || ''" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="uploadImgSuccess" :before-upload="beforeUpload" :file-list="uploadFileList"
        :on-error="uploadImgError">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" class="picDialog" style="z-index:99999;" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import Utils from "@/utils/util";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      uploadFileList: [],
      localArr: []
    };
  },
  props: {
      size: {
          type: String,
          default: '80px'
      }
  },
  computed: {
    OSSKey() {
      var osskey = this.$store.getters.getOSSKey;
      // console.log("addupload+OSSKey");
      // console.log(osskey);
      if(osskey){
        return osskey;
      }else{
        return {}
      }
    }
  },
  watch: {
   
  },
  methods: {
    // close() {
    //     this.OSSKey.key = ''
    //     this.$refs['upload-tool'].clearFiles()
    // },
    uploadImgSuccess(response, file, fileListdata) {
      let picurl = this.OSSKey.host + "/" + this.OSSKey.key;
      var obj = {};
      obj.localUrl = file.url;
      obj.pic = picurl;
      this.localArr.push(obj);
      // console.log('本地arr',this.localArr);
      var picArr = []
      this.localArr.map(item=>{
        item.pic?picArr.push(item.pic):""
      })
      this.openMessage(1, '上传成功')
      this.$emit('onPicStr',picArr.toString())
    },
    beforeUpload(file) {
      this.fileType = file.type;
      const testVideo = /^(video)+/;
      const testImage = /^(image)+/;
      const testMp4 = /(mp4)+$/;
      const testCnName = /[\u4e00-\u9fa5|\s]+/;
      // if (testCnName.test(file.name)) {
      //   return this.openMessage(0, "文件名不能含有中文字符且不能含有空格");
      // }
      if (testVideo.test(this.fileType)) {
        this.fileType = "video";
        return this.openMessage(0, "不支持视频文件");
      } else if (testImage.test(this.fileType)) {
        this.fileType = "image";
      } else {
        return this.openMessage(0, "不支持的文件类型");
      }
      this.OSSKey.key = this.OSSKey.dir + new Date().getTime() + file.name;
    },
    handleRemove(file, fileList) {
      var idx = Utils.findArr(this.localArr,'localUrl',file.url)
      this.localArr.splice(idx, 1);
      var picStr = ""
      var picArr = []
      this.localArr.map(item=>{
        item.pic?picArr.push(item.pic):""
      })
      this.$emit("onPicStr",picArr.toString())
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImgError(e) {
        this.openMessage(0, '图片上传失败，请稍后重试')
    }
  }
};
</script>
<style lang="scss">
.image-upload-list-container {
  // text-align: center;
}
.el-upload.el-upload--picture-card{
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 80px;
  height: 80px
}
</style>
