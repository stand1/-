import {getData} from '@/api'

export default {
    init() {
        //this.dispatch('getOSSKey');   
    },
    
    getOSSKey({commit},val=1) {
        var param = {
            dir: val
        }
        // console.log('查看ossk参数',param);
        getData.getOSSKey(param).then(res => {
            // console.log("Osskey", res); 
            // console.log(res)
            // console.log(1234567890)
            commit('SET_OSS_KEY', res)
        }).catch(e => {
            console.error(e)
        })
    },

}