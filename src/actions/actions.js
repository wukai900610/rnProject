// export * from './common'
// export * from './homePage'

// import * as homePage from './homePage';
// import * as common from './common';
// console.log(common)
// export {
//     ...homePage,
//     ...common,
// }
import {setLang} from '../language/I18n.js';
import Util from '../libs/libs';

// 变更当前自办展
export function changeExhibition (data) {
    return {
        type: 'CHANGE_EXHIBITION',
        value: data
    }
}

// 变更语言
export function changeLan (data) {
    // data = data == 'zh' ? data: 'en' ;
    setLang(data);
    return {
        type: 'CHANGE_LAN',
        value: data
    }
}
/****************登录登出***************/
// 登出
export function logoutSuccess () {
    return {
        type: 'LOGINOUT_SUCCESS',
        value: ''
    }
}
// 登录
export function loginSuccess (data) {
    return {
        type: 'LOGIN_SUCCESS',
        value: data
    }
}
export function loginFail () {
    return {
        type: 'LOGIN_FAIL',
        value: ''
    }
}
/****************列表***************/
// 列表刷新
export function listRefresh (data,params) {
    return {
        type: 'LIST_REFRESH',
        value: data,
        view: params.view,
    }
}
// 列表加载
export function listLoad (data,params) {
    return {
        type: 'LIST_LOADING',
        value: '',
        view: params.view,
    }
}
// 列表加载完成
export function listLoadSuccess (data,params) {
    return {
        type: 'LIST_LOAD_SUCCESS',
        value: data,
        view: params.view,
    }
}
// 列表加载失败
export function listLoadFail (data,params) {
    return {
        type: 'LIST_LOAD_FAIL',
        value: '',
        view: params.view,
    }
}
