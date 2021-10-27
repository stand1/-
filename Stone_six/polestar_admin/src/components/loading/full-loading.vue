<template>
    <div class="full-loading-container">
        <vue-loading :type="type" :color="color" :size="loadingSize"></vue-loading>
    </div>
</template>
<script>
import { VueLoading } from "vue-loading-template";
export default {
  data() {
    return {
      // color: '#28cc82',
      // bar: 'spin',
      loadingSize: {
        width: "50px",
        height: "50px"
      }
    };
  },
  props: {
    type: {
      type: String,
      default: 'spiningDubbles'   //bars  spin
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
    VueLoading
  },
  mounted() {

  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.full-loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0,.3);
    -webkit-backdrop-filter: blur(5px);
    z-index: 2099;
    touch-action: none;

    .vue-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
}
</style>
