import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutationsType';

Vue.use(Vuex);

const state = {
    userInfo:null,
    ajaxParam:null,
}
const getters = {
    getUserInfo (state){
        if(!state.userInfo){
            state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        }
        return state.userInfo
    },
    getAjaxParam(state){
        if(!state.ajaxParam){
            state.ajaxParam = JSON.parse(sessionStorage.getItem('ajaxParam'))
        }
        return state.ajaxParam
    }
}
const mutations = {
    [types.SAVE_USER_INFO](state,userInfo){
        state.userInfo = userInfo
    },
    [types.SAVE_AJAX_PARAM](srare,ajaxParam){
        state.ajaxParam = ajaxParam
    }
}

const actions = {
    commitUserInfo(context,userInfo){
        context.commit(types.SAVE_USER_INFO,userInfo)
    },
    commitAjaxParam(context,ajaxParam){
        context.commit(types.SAVE_AJAX_PARAM,ajaxParam)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store;