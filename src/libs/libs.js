import React, {
    Component
} from 'react';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Toast
} from 'native-base';

import Qs from 'qs';
import axios from 'axios';
import STORE from '../store/store';
import I18n from "../language/I18n.js";

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

let util = {};

util.setStore = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log('setStore Err');
    }
}

util.getStore = async (key) => {
    let value = await AsyncStorage.getItem(key);
    return value
    // try {
    //     // return await AsyncStorage.getItem(key).then((value)=>{
    //     //     return JSON.parse(value)
    //     // });
    //     let value = await AsyncStorage.getItem(key);
    //
    //     return JSON.parse(value)
    //
    // } catch (error) {
    //     console.log('getStoreDate Err');
    // }
}

//字符串截取
util.strSplit = (str, strLength) => {
    var newStr = '';
    var realLength = 0,
        len = str.length,
        charCode = -1;
    if (str) {
        for (var i = 0; i < len; i++) {
            if (realLength >= strLength) {
                return newStr + '...';
            }
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            newStr = newStr + str[i];
        }
        return newStr;
    } else {
        return '';
    }
}

util.ruleFun = {
    'email': function(text) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text);
    },
    'phone': function(text) {
        return /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/.test(text);
    },
    'idCard': function(gets) {//身份证
        var reg = /^[^ ]$/; //不包含空格
        //该方法由佚名网友提供;
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;

        if (gets.length == 15) {
            return isValidityBrithBy15IdCard(gets);
        } else if (gets.length == 18) {
            var a_idCard = gets.split(""); // 得到身份证数组
            if (isValidityBrithBy18IdCard(gets) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            }
            return false;
        }
        return false;

        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0; // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
            }
            for (var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i]; // 加权求和
            }
            valCodePosition = sum % 11; // 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            }
            return false;
        }

        function isValidityBrithBy18IdCard(idCard18) {
            var year = idCard18.substring(6, 10);
            var month = idCard18.substring(10, 12);
            var day = idCard18.substring(12, 14);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            }
            return true;
        }

        function isValidityBrithBy15IdCard(idCard15) {
            var year = idCard15.substring(6, 8);
            var month = idCard15.substring(8, 10);
            var day = idCard15.substring(10, 12);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            }
            return true;
        }
    },
    'n': function(text) {
        return /^\d+$/.test(text);
    },
    'postCode':function (text) {//邮编
        return /^[1-9]\d{5}(?!\d)$/.test(text);
    },
    // 'z2-4': function(text) {
    //     return /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(text);
    // },
    // 's': function(text) {
    //     return /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/.test(text);
    // },
    // 's2-20': function(text) {
    //     return /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{2,20}$/.test(text);
    // },
    // 's6-20': function(text) {
    //     return /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,20}$/.test(text);
    // },
    '*2-30': function(text) {
        return /^.{2,30}$/.test(text);
    },
    '*5-50': function(text) {
        return /^.{5,50}$/.test(text);
    },
    '*': function(text) {
        return /[\w\W]+/.test(text);
    }
}

util.getExhibitionConf = (code, exhibitions) => {
    return exhibitions[code];
}

util.resetNavigation = (routeName) => {
    console.log(StackActions)
    // return StackActions.reset({
    //     index: 0,
    //     actions: [
    //         NavigationActions.navigate({ routeName: routeName})
    //     ]
    // });
    // NavigationActions.dispatch(resetAction);
    // console.log(NavigationActions)
}

util.domain = 'http://b2b.nigeriatex.com'

util.ajax = axios.create({
    baseURL: util.domain + '/api',
    // timeout: 2000,
    // headers: {'content-type':'application/json;charset=UTF-8'},
    // paramsSerializer: function(params) {
    //     return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },
    // responseType: 'json',
    transformRequest: [function(data) {
        data = Qs.stringify(data);
        return data;
    }],
});

util.ajax.interceptors.request.use(function(config) {
    // console.log(config);
    let {
        defaultEx,
        exhibitions,
        // lan,
        Ticket
    } = STORE.getState().store;
    config.headers['Authorization'] = Ticket
    let exhibition = util.getExhibitionConf(defaultEx, exhibitions);
    if (config.method == 'get') {
        config.params = {
            ...config.params,
            code: exhibition.code,
            lan: I18n.locale
        }
    } else {
        config.data = {
            ...config.data,
            code: exhibition.code,
            lan: I18n.locale
        }
    }

    return config;
}, function(error) {
    return Promise.reject(error);
});

util.ajax.interceptors.response.use(function(result) {
    // let {
    //     lan
    // } = STORE.getState().store

    const res = result.data

    // 263:消息管理页面标记消息已读未读
    // 243:展会管理页面提交信息
    if (res.code == 200 || res.code == 263 || res.code == 243) { //正常
        return Promise.resolve(res)
    } else {
        // 前中后英
        let msgs = res.msg.split('::')
        Toast.show({
            text: I18n.locale == 'en' ? (msgs[1] || res.msg) : (msgs[0] || res.msg),
            position: 'top',
            type: 'danger',
            textStyle: {
                fontSize: 13
            }
        });
        return Promise.reject(res);
    }
}, function(error) {
    // let {
    //     lan
    // } = STORE.getState().store

    Toast.show({
        text:I18n.locale == 'en' ? 'Network connection failed' : '网络连接失败',
        position: 'top',
        type: 'danger',
        textStyle: {
            fontSize: 13
        }
    })
    return Promise.reject(error);
});

export default util;
