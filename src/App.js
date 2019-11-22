import React, {Component} from 'react'
import {Provider} from 'react-redux'

import { Root } from "native-base";
import store from './store/store'
import Router from './router'

import { BackHandler, ToastAndroid, Platform } from 'react-native';

// 关闭黄色警告
console.disableYellowBox = true

export default class App extends Component {
    // onBackAndroid = () => {
    //     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //         BackHandler.exitApp()
    //         return false
    //     }
    //     this.lastBackPressed = Date.now()
    //     ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
    //     return true
    // };

    // componentDidMount() {
    //     if (Platform.OS === 'android') {
    //         BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    // }
    //
    // componentWillUnmount() {
    //     if (Platform.OS === 'android') {
    //         BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    //     }
    // }

    render () {
        return (
            <Provider store={store}>
                <Root>
                    <Router />
                </Root>
            </Provider>
        )
    }
}
