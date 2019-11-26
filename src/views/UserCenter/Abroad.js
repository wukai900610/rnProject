import React,{Fragment,Component}  from 'react';
import {
  View,
} from 'react-native';
import { Content,Button,Input,Text,Toast } from 'native-base';
import Layout  from '../../components/Layout';

import {strings} from '../../language/I18n.js';

import Util from '../../libs/libs';
import NewInput from '../../components/NewInput';

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
            url: '/WebOrderExhi',
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
                url:'/WebProduct/GetMyList',
                params:{
                    id: navigation.state.params.id
                }
            }).then((response)=>{
                _this.setState({
                    tableData:response.data.from[0]
                });
            })
        }
    }

    render() {
        const { navigation } = this.props;
        const { tableData,editable } = this.state;

        return (
            <Layout>
                <Content>
                    <View style={styles.content}>
                        <View style={styles.block}>
                            <Text>公司名称</Text>
                            <NewInput ref={(e) => {this.inputs.Company = e;}} label="公司名称:" editable={editable} placeholder="公司名称" defaultText={tableData.Company} rule='*2-30' required={true} />
                            <NewInput ref={(e) => {this.inputs.CompanyEn = e;}} label="公司英文名称:" editable={editable} placeholder="公司英文名称" defaultText={tableData.CompanyEn} rule='*2-30' required={true} />
                        </View>
                        <View style={styles.block}>
                            <Text>公司地址</Text>
                            <NewInput ref={(e) => {this.inputs.Address = e;}} label="中文地址:" editable={editable} placeholder="中文地址" defaultText={tableData.Address} />
                            <NewInput ref={(e) => {this.inputs.AddressEn = e;}} label="英文地址:" editable={editable} placeholder="英文地址" defaultText={tableData.AddressEn} />
                            <NewInput ref={(e) => {this.inputs.PostCode = e;}} label="邮编:" editable={editable} placeholder="邮编" defaultText={tableData.PostCode} rule='postCode' />
                        </View>
                        <View style={styles.block}>
                            <Text>联系人</Text>
                            <NewInput ref={(e) => {this.inputs.ManFirstName = e;}} label="姓:" editable={editable} placeholder="姓" defaultText={tableData.ManFirstName} />
                            <NewInput ref={(e) => {this.inputs.ManLastName = e;}} label="名:" editable={editable} placeholder="名" defaultText={tableData.ManLastName} />
                            <NewInput ref={(e) => {this.inputs.ManPosition = e;}} label="职位:" editable={editable} placeholder="职位" defaultText={tableData.ManPosition} />
                        </View>
                        <View style={styles.block}>
                            <Text>手机号</Text>
                            <NewInput ref={(e) => {this.inputs.ManMobileCountryCode = e;}} label="国际代码:" editable={editable} placeholder="国际代码" defaultText={tableData.ManMobileCountryCode} />
                            <NewInput ref={(e) => {this.inputs.ManMobile = e;}} label="手机号:" editable={editable} placeholder="手机号" defaultText={tableData.ManMobile} rule='phone' required={true} />
                        </View>
                        <View style={styles.block}>
                            <Text>电话</Text>
                            <NewInput ref={(e) => {this.inputs.ManTelCountryCode = e;}} label="国际代码:" editable={editable} placeholder="国际代码" defaultText={tableData.ManTelCountryCode} />
                            <NewInput ref={(e) => {this.inputs.ManTelAreaCode = e;}} label="区号:" editable={editable} placeholder="区号" defaultText={tableData.ManTelAreaCode} required={true} />
                            <NewInput ref={(e) => {this.inputs.ManTel = e;}} label="电话号:" editable={editable} placeholder="电话号" defaultText={tableData.ManTel} required={true} />
                            <NewInput ref={(e) => {this.inputs.ManTelExt = e;}} label="分机号:" editable={editable} placeholder="分机号" defaultText={tableData.ManTelExt} />
                        </View>
                        <View style={styles.block}>
                            <Text>传真</Text>
                            <NewInput ref={(e) => {this.inputs.ManFaxCountryCode = e;}} label="国际代码:" editable={editable} placeholder="国际代码" defaultText={tableData.ManFaxCountryCode} />
                            <NewInput ref={(e) => {this.inputs.ManFaxAreaCode = e;}} label="区号:" editable={editable} placeholder="区号" defaultText={tableData.ManFaxAreaCode} />
                            <NewInput ref={(e) => {this.inputs.ManFax = e;}} label="传真号:" editable={editable} placeholder="传真号" defaultText={tableData.ManFax} />
                        </View>
                        <View style={styles.block}>
                            <NewInput ref={(e) => {this.inputs.ManEmail = e;}} label="邮箱:" editable={editable} placeholder="邮箱" defaultText={tableData.ManEmail} rule='email' required />
                            <NewInput ref={(e) => {this.inputs.WebSite = e;}} label="网址:" editable={editable} placeholder="网址" defaultText={tableData.WebSite} />
                            <NewInput ref={(e) => {this.inputs.ManWechat = e;}} label="微信/QQ:" editable={editable} placeholder="微信/QQ" defaultText={tableData.ManWechat} />
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
