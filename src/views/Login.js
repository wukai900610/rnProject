import React, {Component}  from 'react';
import {
    StyleSheet,
    View,
    Image,
    PixelRatio
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

        const { navigation,defaultEx,exhibitions} = this.props;
        let exhibition = Util.getExhibitionConf(defaultEx,exhibitions);
        console.log(exhibition.logo);
        this.state={
            status:'',
            bg:require('../static/loginBg.png'),
            logo:exhibition.logo,
            // logo:exhibition.logo,
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
        let params = {LoginName:'13770974621',LoginPass:'111111'};

        Util.ajax.post('/WebUser/Login', params).then((response) => {
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
                <Image source={this.state.bg} style={styles.bg} />
                <View style={styles.logo}>
                    <Image source={this.state.logo} />
                </View>
                <View style={styles.content}>
                    <Form style={{marginRight:15,marginBottom:10}}>
                        <Item>
                            <Label style={{color:'#fff',fontSize:14}}>{strings('login.LoginName')}</Label>
                            <Input style={{color:'#fff',fontSize:14}} ref={(e) => {this.LoginName = e;}} />
                        </Item>
                        <Item>
                            <Label style={{color:'#fff',fontSize:14}}>{strings('login.LoginPass')}</Label>
                            <Input style={{color:'#fff',fontSize:14}} secureTextEntry={true} ref={(e) => {this.LoginPass = e;}} />
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
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0,
        flex:1,
        justifyContent:'center'
    },
    bg:{
        width:1440 / PixelRatio.get(),
        height: 2560 / PixelRatio.get(),
    },
    logo:{
        position:'absolute',
        top:'25%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    }
});
