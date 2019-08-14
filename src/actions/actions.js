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
