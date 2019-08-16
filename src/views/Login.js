import React, {Component}  from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Spinner,Toast } from 'native-base';

import {connect} from 'react-redux';
import {loginSuccess,loginFail} from '../actions/actions';

import Util from '../libs/libs';
import Layout  from '../components/Layout';
import {strings} from '../language/I18n.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            status:'',
        }
    }

    login(){
        this.setState({
            status:'loading',
        });
        let _this = this
        let { navigation } = _this.props
        // let payload = {
        //     username:this.LoginName.state.text,
        //     password:this.LoginPass.state.text,
        // }
        // console.log(this.refs.username)

        // if(!(payload.username && payload.password)){
        //     Toast.show({
        //         text: '请输入用户名或密码',
        //         position: 'top',
        //         type: 'danger',
                    // textStyle: { fontSize: 13 }
        //     })
        //
        //     return false
        // }

        const {dispatch,defaultEx,exhibitions} = this.props;
        let exhibition = Util.getExhibitionConf(defaultEx,exhibitions);
        let url = exhibition.domain + '/api/WebUser/Login';
        let params = {LoginName:'13770974621',LoginPass:'123123'};

        Util.ajax.post(url, params).then((response) => {
            dispatch(loginSuccess(response.data));
            _this.setState({
                status:'success',
            },()=>{
                Toast.show({
                    text: strings('login.success'),
                    position: 'top',
                    type: 'success',
                    textStyle: { fontSize: 13 }
                });
                setTimeout(()=>{
                    navigation.navigate('My');
                },500);
            });
        }).catch((e)=>{
            dispatch(loginFail());
            setTimeout(()=>{
                _this.setState({
                    status:'fail',
                });
            },500);
        });
    }

    render() {
        return (
            <Layout>
                <View style={styles.content}>
                    <Form style={{marginRight:15,marginBottom:10}}>
                        <Item>
                            <Label style={{fontSize:13}}>{strings('login.LoginName')}</Label>
                            <Input ref={(e) => {this.LoginName = e;}} />
                        </Item>
                        <Item>
                            <Label style={{fontSize:13}}>{strings('login.LoginPass')}</Label>
                            <Input secureTextEntry={true} ref={(e) => {this.LoginPass = e;}} />
                        </Item>
                    </Form>
                    <Button style={{marginBottom:10}} block light rounded onPress={()=>{this.login()}}>
                        {this.state.status == 'loading' && (<Spinner color='#666' size="small" />)}
                        <Text>{strings('login.btn')}</Text>
                    </Button>
                </View>
            </Layout>
        );
    }
}
function mapStateToProps(state) {
    return state.store
}

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
    content:{
        marginLeft:10,
        marginRight:10,
        flex:1,
        justifyContent:'center'
    },
});
