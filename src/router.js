import React, {Component}  from 'react';
import {
    Image,
    Text,
    StatusBar,
    PixelRatio,
    Platform
} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
} from 'react-navigation';
import STORE from './store/store';
import {strings} from './language/I18n.js';

import Home from './views/Home/Index.js';
import UserCenter from './views/Home/UserCenter.js';
import MatchupExpo from './views/MatchupExpo/Index.js';
import MatchupExpoList from './views/MatchupExpo/List.js';
import MatchupExpoDetail from './views/MatchupExpo/Detail.js';

import Login from './views/Login.js';
import About from './views/About.js';
import Abroad from './views/UserCenter/Abroad.js';
import Company from './views/UserCenter/Company/Index.js';
import CompanyDetail from './views/UserCenter/Company/CompanyDetail.js';
import Settings from './views/UserCenter/Settings.js';
import Other from './views/UserCenter/Other.js';

// import Util from './libs/libs';
const Root = createMaterialTopTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: (navigate) => ({
            tabBarLabel: (e) => {
                if(e.focused){
                    return (<Text style={{color:'#008ff2',fontSize:12}}>{strings('router.Home')}</Text>);
                }else{
                    return (<Text style={{color:'#999',fontSize:12}}>{strings('router.Home')}</Text>);
                }
            },
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./static/home.png') : require('./static/home-outline.png')} style={styles.tabIco} />
                )
            }
        })
    },
    MatchupExpoRoot: {
        screen: MatchupExpo,
        navigationOptions: (navigate) => ({
            // tabBarLabel: 'Matchup Expo',
            tabBarOnPress:({navigation,defaultHandler})=>{
                navigation.navigate('MatchupExpo');
            },
            tabBarLabel: (e) => {
                return (<Text style={{color:'#999',fontSize:12}}>Matchup Expo</Text>);
            },
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./static/serviceHall.png') : require('./static/serviceHall-outline.png')} style={styles.tabIco} />
                )
            }
        })
    },
    UserCenter: {
        screen: UserCenter,
        navigationOptions: (navigate) => ({
            tabBarLabel: (e) => {
                if(e.focused){
                    return (<Text style={{color:'#008ff2',fontSize:12}}>{strings('router.My')}</Text>);
                }else{
                    return (<Text style={{color:'#999',fontSize:12}}>{strings('router.My')}</Text>);
                }
            },
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./static/about.png') : require('./static/about-outline.png')} style={styles.tabIco} />
                )
            }
        })
    }
}, {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: {
        showIcon: true,
        activeTintColor: '#008ff2',
        inactiveTintColor: '#999',
        indicatorStyle: {
            height: 0
        },
        style: {
            backgroundColor: '#f7f7f7',
        },
        labelStyle:{
            fontSize:12
        }
    }
});

var stackRoutes = {
    Root: {
        screen: Root,
        navigationOptions: {
            header: () => null,
        }
    },
    MatchupExpo: {
        screen: MatchupExpo,
        navigationOptions: {
            title: 'Matchup Expo',
        }
    },
    MatchupExpoList: {
        screen: MatchupExpoList,
        navigationOptions: {
            title: 'Matchup Expo List',
        }
    },
    MatchupExpoDetail: {
        screen: MatchupExpoDetail,
        navigationOptions:({navigation})=>{
            let params = navigation.state.params
            return {
                title:params.title
            };
        }
    },
    Abroad: {
        screen: Abroad,
        params:{
            auth:true,
        },
        navigationOptions: {
            title: '报名信息',
        }
    },
    Company: {
        screen: Company,
        params:{
            auth:true,
        },
        navigationOptions: {
            title: '公司信息',
        }
    },
    CompanyDetail: {
        screen: CompanyDetail,
        params:{
            auth:true,
        },
        navigationOptions: {
            title: '公司详情信息',
        }
    },
    Settings: {
        screen: Settings,
        params:{
            auth:true,
        },
        navigationOptions: {
            title: '设置',
        }
    },
    Other: {
        screen: Other,
        params:{
            auth:true,
        },
        navigationOptions: {
            title: '其他',
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: '登陆',
            header:()=>{
                return Platform.OS === 'ios' && null
            }
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            title: '关于我们',
        }
    }
};

const StacksOverTabs = createStackNavigator(stackRoutes,{
    onTransitionEnd :(transitionProps,prevTransitionProps)=>{
        let routeName;
        // console.log(transitionProps)
        if(transitionProps.scene.route.routes){
            let routeIndex = transitionProps.scene.route.index;
            routeName = transitionProps.scene.route.routes[routeIndex].routeName;
        }else{
            routeName = transitionProps.scene.route.routeName;
        }
        // console.log(routeName);

        if(routeName == 'MatchupExpo'){
            StatusBar.setBackgroundColor('#efefef');
            StatusBar.setBarStyle('dark-content');
        }else if(routeName == 'Login'){
            StatusBar.setBackgroundColor('#010810');
            StatusBar.setBarStyle('light-content');
        }else{
            StatusBar.setBackgroundColor('#324191');
            StatusBar.setBarStyle('light-content');
        }
    }
});

// 需要拦截登录的页面
function checkAuth(routeName){
    let hasAuth = false;
    if(routeName){
        for (var i in stackRoutes) {
            if (i == routeName && stackRoutes[i].params && stackRoutes[i].params.auth) {
                hasAuth = true;
                break;
            }
        }
    }
    return hasAuth;
}

const defaultGetStateForAction = StacksOverTabs.router.getStateForAction;
StacksOverTabs.router.getStateForAction = (action, state) => {
    if(checkAuth(action.routeName)){//拦截判断
        let {Ticket} = STORE.getState().store;
        if(Ticket){//已经登录
            return defaultGetStateForAction(action, state);
        }else{// 跳转登录页
            this.routes = [
                ...state.routes,
                {key: 'id-'+Date.now(), routeName: 'Login', params: { name: action.routeName, params: action.params}},
            ];
            return {
                ...state,
                routes,
                index: this.routes.length - 1,
            };
        }
    }

    return defaultGetStateForAction(action, state);
}

const AppNavigator = createAppContainer(StacksOverTabs);
export default class Router extends Component {
    render() {
        return (<AppNavigator/>);
    }
}

const styles = {
    tabIco: {
        width: 48 / PixelRatio.get(),
        height: 48 / PixelRatio.get()
    }
}
