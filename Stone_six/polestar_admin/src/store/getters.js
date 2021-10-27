export default {
    getOSSKey(state) {
        return state.ossKey
    },
    getExpressionList(state){
        // return state.expressionList
        if(state.expressionList.length>0){
            return state.expressionList
        }else{
            return JSON.parse(localStorage.getItem('expressionList'))
        }
    }
}