<template>
    <div class="loading-container">
        <vue-loading type="bars" :color="color" :size="loadingSize"></vue-loading>
    </div>
</template>
<script>
import vueLoading from "vue-loading-template";
export default {
  data() {
    return {
      loadingSize: {
        width: "50px",
        height: "50px"
      }
    };
  },
  props: {
    type: {
      type: String,
      default: 'spiningDubbles'
    },
    color: {
      type: String,
      default: '#F81E36'  //#28cc82
    },
    size: {
      type: [String,Number],
      default: 50
    }
  },
  components: {
    vueLoading
  }
};
</script>
<style lang="less" scoped>
.loading-container {
    position: fixed;
    top: 58px;
    left: 188px;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0,.3);
    -webkit-backdrop-filter: blur(5px);
    z-index: 1005;
    touch-action: none;

    .vue-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
}
</style>
