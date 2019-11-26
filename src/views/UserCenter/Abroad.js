import React,{Component}  from 'react';
import { Container, Header, Content, List, ListItem, Text, TouchableOpacity } from 'native-base';
import Layout  from '../../components/Layout';

import {strings} from '../../language/I18n.js';

import Util from '../../libs/libs';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData:{}
        }
    }

    componentDidMount(){
        let _this = this;
        const { navigation } = this.props;

        Util.ajax.get('/WebProduct/GetMyList', {
            params:{
                id: navigation.state.params.ID
            }
        }).then((response)=>{
            _this.setState({
                tableData:response.data
            });
        })
    }

    render() {
        const { navigation } = this.props;
        const { tableData } = this.state;
        return (
            <Layout>
                <Content>
                </Content>
            </Layout>
        );
    }
}

const styles = {
};
