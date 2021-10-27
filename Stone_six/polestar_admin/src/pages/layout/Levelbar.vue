<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
      <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name=='历史会话详情'?'详情':item.name}}</span>
      <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
    </el-breadcrumb-item>

    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->


  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if(first && first.name == '首页'){
        this.levelList = [{ name: '首页', path: '/home/index' }]
        return
      }
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/home/index' }].concat(matched)
      }
      this.levelList = matched
      // console.log('this.levelList',matched);
    }
  },
  watch: {
    $route(val) {
      console.log('$route',val);
      this.getBreadcrumb()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
