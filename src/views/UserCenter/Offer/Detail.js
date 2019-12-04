import React,{Fragment,Component}  from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Content,Button,Input,Text,Toast } from 'native-base';
import Layout  from '../../../components/Layout';

import {strings} from '../../../language/I18n.js';

import Util from '../../../libs/libs';
import NewInput from '../../../components/NewInput';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return{
            title:params.name,
        }
    };

    constructor(props) {
        super(props);
        let {navigation} = this.props;

        this.inputs = {}
        this.state = {
            editable:navigation.state.params.id ? false : true,
            tableData:{},
            avatarSource:require('../../../static/upload.png')
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

    selectPhoto(){
        const options = {
            title: strings('form.OfferPhoto'),
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);

            if (response.didCancel) {
                console.log('取消');
            } else if (response.error) {
                console.log('错误: ', response.error);
            } else {
                const source = {
                    uri: response.uri
                };

                // base64
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    componentDidMount(){
        let _this = this;
        const { navigation } = this.props;

        if(navigation.state.params.id){
            Util.ajax({
                method: 'get',
                url:'/b2boffer/get',
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
        const { tableData,editable,avatarSource } = this.state;

        return (
            <Layout>
                <Content>
                    <View style={styles.content}>
                        <View style={styles.block}>
                            <NewInput ref={(e) => {this.inputs.Name = e;}} label={strings('form.OfferName')} editable={editable} placeholder={strings('form.OfferName')} defaultText={tableData.Name} rule='*2-30' required={true} />

                            <TouchableOpacity onPress={()=>{this.selectPhoto()}}>
                                <Image source={avatarSource} style={{marginTop:10,width:64}} />
                            </TouchableOpacity>
                            {/*<NewInput ref={(e) => {this.inputs.ManName = e;}} label={strings('form.OfferCategory')} editable={editable} placeholder={strings('form.OfferCategory')} defaultText={tableData.ManName} rule='*2-30' required={true} />*/}

                            <NewInput ref={(e) => {this.inputs.Description = e;}} label={strings('form.OfferDescription')} editable={editable} placeholder={strings('form.OfferDescription')} defaultText={tableData.Description} rule='*2-30' required={true} />
                            <NewInput ref={(e) => {this.inputs.Summary = e;}} label={strings('form.Summary')} editable={editable} placeholder={strings('form.Summary')} defaultText={tableData.Summary} rule='*2-30' required={true} />
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
