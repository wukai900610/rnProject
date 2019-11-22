import {combineReducers} from 'redux'
// import homePage from './homePage'
// export default combineReducers({
//   homePage
// })

const initialState = {
    defaultEx:'nigeriatex',
    lan:'zh',
    exhibitions:{
        'nigeriatex':{
            code: 'nt',
            domain:'http://b2b.nigeriatex.com',
            logo: require('../static/logo3.png'),
            tel: '+86-25-84521101',
        },
        'autoequip-nigeria':{
            code: 'an',
            domain:'http://b2b.autoequip-nigeria.com',
            logo: require('../static/logo5.png'),
            tel: '+86-25-84521101',
        },
        'homeshow-colombia':{
            code: 'hc',
            domain:'http://b2b.homeshow-colombia.com',
            logo: require('../static/logo.png'),
            tel: '+86-25-84521101',
        },
        'homeshow-nigeria':{
            code: 'hn',
            domain:'http://b2b.homeshow-nigeria.com',
            logo: require('../static/logo4.png'),
            tel: '+86-25-84521101',
        },
        // 'cotex-colombia':{
        //
        // }
    },
    userInfo:{},
    homePage:{
        isLoading:false,
        status:'',
        homeList:[],
        noData:false
    },
}
let store = (state = initialState,action)=>{
    if (action.type === 'CHANGE_EXHIBITION') {
        return {...state,defaultEx:action.value}
    }else if (action.type === 'CHANGE_LAN') {
        return {...state,lan:action.value}
    }else if (action.type === 'LOGIN_SUCCESS') {
        return {...state,userInfo:action.value}
    }else if (action.type === 'LOGIN_FAIL' || action.type === 'LOGINOUT_SUCCESS') {
        return {...state,userInfo:{}}
    }
    return state;
}

export default combineReducers({
    store
})
