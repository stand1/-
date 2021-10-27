<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
import { localKey } from '@/api/config/ip-config';
import { mapGetters } from "vuex";
export default {
  name: 'App',
  computed: {
    // ...mapGetters({
    //   user: "getUser",
    // })
  },
  mounted(){

  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
