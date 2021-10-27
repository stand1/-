import TYPES from './mutations_type'
export default {

    [TYPES.SET_OSS_KEY](state, params) {
        params.OSSAccessKeyId = params.accessid
        state.ossKey = Object.assign({}, state.ossKey, params)
    },
    [TYPES.SET_EXPRESSIONLIST](state, expressionList) {
        state.expressionList = expressionList
        localStorage.setItem('expressionList',JSON.stringify(expressionList))
    },
}