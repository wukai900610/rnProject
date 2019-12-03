import React,{Fragment,Component}  from 'react';
import {
  View,
} from 'react-native';
import { Content,Button,Input,Text,Toast } from 'native-base';
import Layout  from '../../../components/Layout';

import {strings} from '../../../language/I18n.js';

import Util from '../../../libs/libs';
import NewInput from '../../../components/NewInput';

export default class App extends Component {
    constructor(props) {
        super(props);
        let {navigation} = this.props;

        this.inputs = {}
        this.state = {
            editable:navigation.state.params.id ? false : true,
            tableData:{},
        }
    }

    renderSubmit(){
        let {navigation} = this.props;

        if(navigation.state.params.id){
            if(this.state.editable){
                return (
                    <Fragment>
                        <Button style={{marginBottom:10}} block light onPress={()=>{this.setState({editable:false})}}>
                            <Text>取消</Text>
                        </Button>
                        <Button block info onPress={()=>{this.submit()}}>
                            <Text>提交</Text>
                        </Button>
                    </Fragment>
                )
            }else{
                return (
                    <Button block info onPress={()=>{this.setState({editable:true})}}>
                        <Text>修改</Text>
                    </Button>
                )
            }
        }else{
            return (
                <Button block info onPress={()=>{this.submit()}}>
                    <Text>提交</Text>
                </Button>
            )
        }

    }

    submit(){
        let {navigation} = this.props;

        let form = {};
        for(var key in this.inputs){
            form[key] = this.inputs[key].state.text
        }
        console.log(form);
        console.log(this.inputs);

        return false;
        Util.ajax({
            method: navigation.state.params.id ? 'put' : 'post',
            url: '/B2BSupply',
            data: form
        }).then((response)=>{
            navigation.goBack();
            Toast.show({
                text: navigation.state.params.id ? '修改成功' : '添加成功',
                position:'top',
                type:'success'
            })
        })
    }

    componentDidMount(){
        let _this = this;
        const { navigation } = this.props;
        // 公司展会列表
        if(navigation.state.params.id){
            Util.ajax({
                method: 'get',
                url:'/b2bsupply/get',
                params:{
                    id: navigation.state.params.id
                }
            }).then((response)=>{
                console.log(response.data);
                _this.setState({
                    tableData:response.data[0]
                });
            })
        }
    }

    render() {
        const { tableData,editable } = this.state;

        return (
            <Layout>
                <Content>
                    <View style={styles.content}>
                        <View style={styles.block}>
                            <NewInput ref={(e) => {this.inputs.Name = e;}} label={strings('form.CompanyName')} editable={editable} placeholder={strings('form.CompanyName')} defaultText={tableData.Name} rule='*2-30' required={true} />
                            <NewInput ref={(e) => {this.inputs.ManName = e;}} label={strings('form.ContactPerson')} editable={editable} placeholder={strings('form.ContactPerson')} defaultText={tableData.ManName} rule='*2-30' required={true} />
                        </View>
                        <View style={styles.block}>
                            <Text>{strings('form.Mobilephone')}</Text>
                            <NewInput ref={(e) => {this.inputs.ManPhoneCountryCode = e;}} label={strings('form.CountryCode')} editable={editable} placeholder={strings('form.CountryCode')} defaultText={tableData.ManPhoneCountryCode} />
                            <NewInput ref={(e) => {this.inputs.ManPhone = e;}} label={strings('form.Mobilephone')} editable={editable} placeholder={strings('form.Mobilephone')} defaultText={tableData.ManPhone} rule='phone' required={true} />
                        </View>
                        <View style={styles.block}>
                            <Text>{strings('form.ContactSoftware')}</Text>
                            <NewInput ref={(e) => {this.inputs.ManWeChat = e;}} label={strings('form.WeChat')} editable={editable} placeholder={strings('form.WeChat')} defaultText={tableData.ManWeChat} />
                            <NewInput ref={(e) => {this.inputs.ManFacebook = e;}} label={strings('form.Facebook')} editable={editable} placeholder={strings('form.Facebook')} defaultText={tableData.ManFacebook} required={true} />
                            <NewInput ref={(e) => {this.inputs.ManWhatsapp = e;}} label={strings('form.Whatsapp')} editable={editable} placeholder={strings('form.Whatsapp')} defaultText={tableData.ManWhatsapp} required={true} />
                        </View>
                        <View style={styles.block}>
                            <NewInput ref={(e) => {this.inputs.WebSite = e;}} label={strings('form.Website')} editable={editable} placeholder={strings('form.Website')} defaultText={tableData.WebSite} />
                            <NewInput ref={(e) => {this.inputs.Description = e;}} label={strings('form.CompanyDescription')} editable={editable} placeholder={strings('form.CompanyDescription')} defaultText={tableData.Description} />
                            <NewInput ref={(e) => {this.inputs.Description = e;}} label={strings('form.Summary')} editable={editable} placeholder={strings('form.Summary')} defaultText={tableData.Summary} />
                        </View>

                        {this.renderSubmit()}
                    </View>
                </Content>
            </Layout>
        );
    }
}

const styles = {
    content:{
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        backgroundColor:'#fff'
    },
    block:{
        marginBottom:25
    }
};
