/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component}  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <StatusBar barStyle="default"  />
                <SafeAreaView style={styles.body}>
                    {this.props.children}
                </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        height:'100%'
    }
});
