<template>
	<section class="app-main" id="appmainbox">
		<transition name="fade" mode="out-in" v-if="!$route.path.includes('/chat')">
			<router-view class="main-container" :key="key"></router-view>
    </transition>

    <router-view v-else class="main-container" :key="key"></router-view>

    <!-- <transition name="fade" mode="out-in">
      <router-view class='chatUser' name='chat-user'></router-view>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view class='pcChatContainer' name='pc-chat-container'></router-view>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view class='workOptions' name='work-options'></router-view>
    </transition> -->

	</section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + +new Date()
    }
  },
  created() {
    //this.$store.dispatch('init')
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar + 间距8px */
  height: 100%;
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  // background: $bgmain;
  /*background: #F5F6FA;*/
  display: flex;
  flex-flow: row nowrap;
  .main-container{
    width: 100%;
  }
  .chatUser{
    width: 29%;
    width: 380px;
    flex: none;
    height: 100%;
    background: transparent;
    // border-radius: 8px;
    border-radius: 6px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
  }
  .pcChatContainer{
    width: 1px;
    flex: 1;
    // background: #fff;
    margin-right: 8px;
    border-radius: 6px 6px 0 0;
    height: calc(100vh - 58px);
    overflow: hidden;
  }
  .workOptions{
    // background: #fff;
    width: 400px;
    flex: none;
    border-radius: 6px 0 0 0;
    height: calc(100vh - 58px);
    overflow: hidden;
  }
}
</style>
