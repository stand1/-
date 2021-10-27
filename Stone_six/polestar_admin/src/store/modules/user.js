import { getData } from '@/api'
import { localKey } from '@/api/config/ip-config'

const user = {
    state: {
        user: {},
        userId: '',
        userName: '',
        agentAvatar: ''
    },
    getters: {
        getRoles: state => {
            return state.roles
        },
        setting: state => state.setting,

        getUser: state => {
            // if (state.userId) {
            if (state.userName) {
                return state.user
            } else {
                return JSON.parse(localStorage.getItem(localKey + 'userInfo'))
            }
        },
        getToken: state => {
            if (state.userName) {
                return state.token
            } else {
                let userInfo = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
                return userInfo ? userInfo.token : ""
            }
        },
        getUserId: state => {
            if (state.userId) {
                return state.userId
            } else {
                let userInfo = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
                return userInfo ? userInfo.id : ""
            }
        },
        getUserName: state => {
            if (state.userName) {
                return state.userName
            } else {
                let userInfo = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
                return userInfo ? userInfo.uname : ""
                    // return JSON.parse(localStorage.getItem(localKey+'userInfo')).uname
            }
        },
        getRealName: state => {
            if (state.realName) {
                return state.realName
            } else {
                let userInfo = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
                return userInfo ? userInfo.name : ""
                    // return JSON.parse(localStorage.getItem(localKey+'userInfo')).name
            }
        },
        getSex: state => {
            if (state.sex) {
                return state.sex
            } else {
                let userInfo = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
                return userInfo ? userInfo.sex : ""
                    // return JSON.parse(localStorage.getItem(localKey+'userInfo')).sex
            }
        },
        getProjectKey: state => {
            if (state.projectKey) {
                return state.projectKey
            }
            // else{
            //   return eval(localStorage.getItem(localKey+'switchMatchFlag'))
            // }
        },

    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user
            // state.userId = user.id
            state.userName = user.userName
            state.agentAvatar = user.avatar
            localStorage.setItem(localKey + 'userInfo', JSON.stringify(user))
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        CLEAR_USER: (state, ) => {
            state.user = {}
            state.userId = ""
            state.userName = ""
            state.agentAvatar = ""
            localStorage.clear();
            // localStorage.setItem(localKey+'userInfo',JSON.stringify({}))
            // localStorage.removeItem(localKey + 'userInfo');
        },

        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_PROJECTKEY: (state, projectKey) => {
            state.projectKey = projectKey
        },
    },

    actions: {
        //保存登录信息
        setUser({ commit }, userInfo) {
            commit('SET_USER', userInfo)
        },
        setRoles({ commit }, roles) {
            return new Promise((resolve, reject) => {
                commit('SET_ROLES', roles)
                if (roles.length > 0) {
                    resolve(roles)
                } else {
                    reject(roles)
                }
            })
        },

        // 注册
        Register({ dispatch, commit, getters }, param) {
            return new Promise((resolve, reject) => {
                getData.register(param).then((res) => {
                    commit('SET_USER', res)
                    dispatch('getallAgentList')
                    dispatch("setActiveClient", {})
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登录
        Login({ dispatch, commit }, param) {
            return new Promise((resolve, reject) => {
                getData.login(param).then((res) => {
                    console.log('登录', res);
                    if (res.isBusy * 1 == 1) {
                        commit('SET_BUSYSTATUS', 1)
                    } else {
                        commit('SET_BUSYSTATUS', 2)
                    }
                    commit('SET_USER', res)
                        // dispatch('getallAgentList')   
                        // dispatch("setActiveClient",{})
                    resolve(res)
                        // dispatch("getMenuList").then(r=>{
                        //   console.log('rrrrrr',r);
                        //   resolve(res)
                        // })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                getData.logout({}).then((res) => {
                    commit('SET_SHOWWORKORDERTIP', false)
                    commit('CLEAR_USER')
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },




        // 获取用户信息
        GetUserInfo({ commit, state }) {
            // return new Promise((resolve, reject) => {
            //   getUserInfo(state.token).then(response => {
            //     if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            //       reject('error')
            //     }
            //     const data = response.data
            //     commit('SET_ROLES', data.role)
            //     commit('SET_NAME', data.name)
            //     commit('SET_AVATAR', data.avatar)
            //     commit('SET_INTRODUCTION', data.introduction)
            //     resolve(response)
            //   }).catch(error => {
            //     reject(error)
            //   })
            // })
        },

        // 动态修改权限
        ChangeRole({ commit }, role) {
            // return new Promise(resolve => {
            //   commit('SET_TOKEN', role)
            //   setToken(role)
            //   getUserInfo(role).then(response => {
            //     const data = response.data
            //     commit('SET_ROLES', data.role)
            //     commit('SET_NAME', data.name)
            //     commit('SET_AVATAR', data.avatar)
            //     commit('SET_INTRODUCTION', data.introduction)
            //     resolve()
            //   })
            // })
        }
    }
}

export default user