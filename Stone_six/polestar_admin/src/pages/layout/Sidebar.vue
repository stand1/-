<template>
    <div>
      <!-- <sidebar-item :routes='getMenuList'></sidebar-item> -->
      <sidebar-item :routes='accessRouter'></sidebar-item>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import { constantRouterMap } from '@/router'
export default {
  data() {
			return {
        accessRouter: [
          // {
          //   id: '',
          //   path: '/home',
          //   name: '',
          //   icon: 'icon-homepage',
          //   noDropdown: true,
          //   children: [
          //     { path: 'index',name: 'Dashboard' }
          //   ]
          // },
          // {
          //   id: '',
          //   path: '/chat',
          //   name: '',
          //   icon: 'icon-shebeizhuangtai',
          //   noDropdown: true,
          //   children: [
          //     { path: 'index', name: '消息' }
          //   ]
          // },
        ]
      }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'getMenuList',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted(){
    this.accessRouter = constantRouterMap;
  }
}
</script>
