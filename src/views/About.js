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
                <View>
                    <Text>关于我们</Text>
                </View>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
});
