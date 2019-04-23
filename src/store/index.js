import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutationsType';

Vue.use(Vuex);

const state = {
    userInfo:sessionStorage.getItem('state')?JSON.parse(sessionStorage.getItem('state')):{}
}
const getters = {
    getUserInfo (state){
        return state.userInfo
    }
}
const mutations = {
    [types.SAVE_USER_INFO](state,userInfo){
        state.userInfo = userInfo
    }
}

const actions = {
    commitUserInfo(context,userInfo){
        context.commit(types.SAVE_USER_INFO,userInfo)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store;