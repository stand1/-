<template>
    <el-dialog
      width="30%"
      title="文件上传"
      :visible.sync="innerVisible"
      class="upload-container"
      @close="close"
      append-to-body>
        <el-upload
            class="upload-demo"
            drag
            ref="upload-tool"
            :data="OSSKey"
            :action="OSSKey.host || ''"
            :on-success="uploadImgSuccess"
            :on-error="uploadImgError"
            :before-upload="beforeUpload"
            :limit="1"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <slot></slot>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            innerVisible: false,
            tag: ''
        }
    },
    computed: {
        OSSKey() {

            var aaa = this.$store.getters.getOSSKey;
            // console.log("addupload+OSSKey");
            // console.log(aaa);

            // var aaa = this.$store.getters.getOSSKey
            // console.log("uploadindex+OSSKey");
            // console.log(aaa);
            return this.$store.getters.getOSSKey
        }
    },
    watch: {
        innerVisible: function(_new) {
            if(_new) {
                this.$store.dispatch('getOSSKey')
            }
        }
    },
    methods: {
        open(tag, callback = new Function()) {
            this.tag = tag || ''
            this.innerVisible = true
            this.callback = callback
            // this.$store.dispatch('getOSSKey')
        },

        close() {
            this.innerVisible = false
            this.OSSKey.key = ''
            this.tag = ''
            this.$refs['upload-tool'].clearFiles()
        },

        beforeUpload(file) {
            console.log(file)
            this.fileType = file.type
            const testVideo = /^(video)+/
            const testImage = /^(image)+/
            const testMp4 = /(mp4)+$/
            const testCnName = /[\u4e00-\u9fa5|\s]+/

            // if(testCnName.test(file.name)) {
            //   console.log(this.$refs['upload-tool'])
            //   this.$refs['upload-tool'].abort(file)
            //   return this.openMessage(0, '文件名不能含有中文字符且不能含有空格')
            // }

            // if(testVideo.test(this.fileType)) {
            //     this.fileType = 'video'
            //     if(file.size > 1024 * 1024 * 100) {
            //         this.$refs['upload-tool'].abort(file)
            //         return this.openMessage(0, '视频超出限制的大小：100mb')
            //     }
            //     if(!testMp4.test(file.type)) {
            //       this.$refs['upload-tool'].abort(file)
            //       return this.openMessage(0, '只能上传mp4格式视频')
            //     }
            // } elseif(){

            // }
            if(testImage.test(this.fileType)) {
                this.fileType = 'image'
            } else {
                this.$refs['upload-tool'].abort(file)
                return this.openMessage(0, '不支持的文件类型')
                // throw new Error('unknow file type')
            }

            this.OSSKey.key = this.OSSKey.dir + new Date().getTime() + file.name
        },

        uploadImgSuccess(response, file, fileListdata) {
            let imgSrc = this.OSSKey.host + '/' + this.OSSKey.key
            // this.$emit('uploadSuccess', this.tag, imgSrc, {
            //     fileType: this.fileType
            // })
            this.callback(imgSrc, {
                fileType: this.fileType,
                url: imgSrc
            })
            this.close()
            this.openMessage(1, '上传成功')
        },

        uploadImgError(e) {
            this.openMessage(0, '图片上传失败，请刷新页面后重试')
        }
    }
}
</script>
<style lang="scss" scoped>
.upload-container {
    text-align: center;
}
</style>
