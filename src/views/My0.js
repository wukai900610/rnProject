/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component}  from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Layout  from '../components/Layout';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <View style={styles.userHead}>

                </View>
                <View style={styles.userBody}>

                </View>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
});
