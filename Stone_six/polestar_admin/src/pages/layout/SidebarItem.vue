<template>
  <div class="menu-wrapper">
<!--    <div class="logo" @click="opendrawer">-->
<!--      <img src="@/assets/img/logo.png" alt="">-->
    <ul>
      <template v-for="(item,index) in routes">
        <router-link v-if="!item.hidden" :to="item.redirect" :key="index">
          <li :index="item.children && item.children[0].path" class="submenu" @click="clickEvent">
            <div class="icon_box" :class="[$route.fullPath==item.redirect?'active':'']">
<!--              <i :class="['iconfont',item.icon]"></i>-->
              <span class="title">{{item.children && item.children[0].name}}</span>
            </div>
          </li>
        </router-link>
      </template>
    </ul>
    <personal :drawer="drawer" @drawerStatus="drawerStatus"></personal>
  </div>
</template>

<script>
import personal from "@/components/dialog/personal";
import { mapGetters } from "vuex";

export default {
  name: "SidebarItem",
  data() {
    return {
      drawer: false,
    };
  },
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      sidebar: "sidebar",
      userInfo: "getUser",
      userId: "getUserId"
    })
  },
  components: {
    personal
  },
  watch: {

  },
  created() {
    //  if(!(this.userInfo&&this.userInfo.level)){
    //   this.$router.replace('/login');
    // }
  },
  mounted(){
    this.routes.forEach(item => {
      if (item.meunShow * 1 == 1) {
        if (this.userInfo.level * 1 > 2) {
          item.hidden = true;
        }else{
          item.hidden = false;
        }
      }
    });
  },
  methods: {
    clickEvent() {
      // console.log('clickEvent');
      // this.$viewRightClose();
    },
    drawerStatus(data) {
      this.drawer = data;
    },
    opendrawer() {
      this.drawer = true;
    }
  }
};
</script>

