/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component}  from 'react';
import { Container, Header, Content, List, ListItem, Text, TouchableOpacity } from 'native-base';
import Layout  from '../../components/Layout';

import {strings} from '../../language/I18n.js';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        return (
            <Layout>
                <Content>
                    <ListItem>
                        <Text>{strings('settings.edit')}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>{strings('settings.reset')}</Text>
                    </ListItem>
                    <ListItem onPress={()=>{navigation.navigate('About')}} last>
                        <Text>{strings('settings.about')}</Text>
                    </ListItem>
                </Content>
            </Layout>
        );
    }
}

const styles = {
};
