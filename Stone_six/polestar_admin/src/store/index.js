import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import getters from './getters'
import actions from './actions'
import user from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
	mutations,
	state,
	getters,
	actions,
	modules:{
	  app,
	  user
	}
})

export default store