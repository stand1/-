
<template>
  <!-- <el-dialog :title="''" :width="width" :modal="false"  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false" 
  :visible.sync="dialogFormVisible" class="dialog-right-warrper"></el-dialog> -->
  <el-dialog :visible.sync="dialogVisible" class="image-preview-container">
    <img width="100%" :src="src" alt="">
  </el-dialog>
</template>
<script>
export default {
  name: 'edit-message',
  data() {
    return {
        dialogVisible: false,
    };
  },
  props: {
    width: {
      type: String,
      default: '350px'
    },
    src: {
      type: String,
      default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540742400401&di=01f8e3559614736d9bfe570709f98a80&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f4d6599f7c0ca80121ad7bdd9a58.jpg'
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
      console.log(options)
      this.dialogVisible = true
    },
   
  }
};
</script>

<style lang="scss">
.image-preview-container{
    .el-dialog{
        width: 60% ;
    }
}
</style>

<style lang="scss" scoped>

</style>

