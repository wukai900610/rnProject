import React,{Fragment,Component}  from 'react';
import {
  View,
} from 'react-native';
import { Content,Button,Input,Text } from 'native-base';
import Layout  from '../../components/Layout';

import {strings} from '../../language/I18n.js';

import Util from '../../libs/libs';
import NewInput from '../../components/NewInput';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editable:false,
            tableData:{},
            // rule:{
            //     Company:{
            //         test:'*2-30'
            //     },
            //     PostCode:{
            //         test:'postCode'
            //     }
            // }
        }
    }

    renderSubmit(){
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
    }

    submit(){
        let {navigation} = this.props;
        console.log(navigation.state.params.id);

        return false;
        Util.ajax.get({
            method: navigation.state.params.id ? 'put' : 'post',
            url: '/WebOrderExhi',
            // data: this.form
        }).then((response)=>{
            if(response.data.from.length > 0){
                _this.setState({
                    tableData:response.data.from[0]
                });
            }
        })
    }

    componentDidMount(){
        let _this = this;
        const { navigation } = this.props;

        Util.ajax.get('/WebProduct/GetMyList', {
            params:{
                id: navigation.state.params.ID
            }
        }).then((response)=>{
            if(response.data.from.length > 0){
                _this.setState({
                    tableData:response.data.from[0]
                });
            }
        })
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
                            <NewInput label="公司名称:" editable={editable} placeholder="公司名称" defaultText={tableData.Company} rule='*2-30' required={true} />
                            <NewInput label="公司英文名称:" editable={editable} placeholder="公司英文名称" defaultText='' rule='*2-30' required={true} />
                        </View>
                        <View style={styles.block}>
                            <Text>公司地址</Text>
                            <NewInput label="中文地址:" editable={editable} placeholder="中文地址" defaultText={tableData.Address} />
                            <NewInput label="英文地址:" editable={editable} placeholder="英文地址" defaultText={tableData.AddressEn} />
                            <NewInput label="邮编:" editable={editable} placeholder="邮编" defaultText={tableData.PostCode} rule='postCode' />
                        </View>
                        <View style={styles.block}>
                            <Text>联系人</Text>
                            <NewInput label="姓:" editable={editable} placeholder="姓" defaultText={tableData.ManFirstName} />
                            <NewInput label="名:" editable={editable} placeholder="名" defaultText={tableData.ManLastName} />
                            <NewInput label="职位:" editable={editable} placeholder="职位" defaultText={tableData.ManPosition} />
                        </View>
                        <View style={styles.block}>
                            <Text>手机号</Text>
                            <NewInput label="国际代码:" editable={editable} placeholder="国际代码" defaultText={tableData.ManMobileCountryCode} />
                            <NewInput label="手机号:" editable={editable} placeholder="手机号" defaultText={tableData.ManMobile} rule='phone' required={true} />
                        </View>
                        <View style={styles.block}>
                            <Text>电话</Text>
                            <NewInput label="国际代码:" editable={editable} placeholder="国际代码" defaultText={tableData.ManTelCountryCode} />
                            <NewInput label="区号:" editable={editable} placeholder="区号" defaultText={tableData.ManTelAreaCode} required={true} />
                            <NewInput label="电话号:" editable={editable} placeholder="电话号" defaultText={tableData.ManTel} required={true} />
                            <NewInput label="分机号:" editable={editable} placeholder="分机号" defaultText={tableData.ManTelExt} />
                        </View>
                        <View style={styles.block}>
                            <Text>传真</Text>
                            <NewInput label="国际代码:" editable={editable} placeholder="国际代码" defaultText={tableData.ManFaxCountryCode} />
                            <NewInput label="区号:" editable={editable} placeholder="区号" defaultText={tableData.ManFaxAreaCode} />
                            <NewInput label="传真号:" editable={editable} placeholder="传真号" defaultText={tableData.ManFax} />
                        </View>
                        <View style={styles.block}>
                            <NewInput label="邮箱:" editable={editable} placeholder="邮箱" defaultText={tableData.ManEmail} rule='email' required />
                            <NewInput label="网址:" editable={editable} placeholder="网址" defaultText={tableData.WebSite} />
                            <NewInput label="微信/QQ:" editable={editable} placeholder="微信/QQ" defaultText={tableData.ManWechat} />
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
