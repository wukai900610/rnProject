import React,{Fragment,Component}  from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Content,Button,Input,Text,Toast } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Picker from 'react-native-picker';

import Layout  from '../../../components/Layout';

import {strings} from '../../../language/I18n.js';

import Util from '../../../libs/libs';
import NewInput from '../../../components/NewInput';

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
            avatarSource:require('../../../static/upload.png'),
            pickerData:[],
            category:{
                data:[],
                text:''
            }
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

    _photoShow(){
        let _this = this;
        const options = {
            title: strings('form.OfferPhoto'),
            takePhotoButtonTitle:strings('tool.takePhotoButtonTitle'),
            chooseFromLibraryButtonTitle:strings('tool.chooseFromLibraryButtonTitle'),
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log(response);
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
                _this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    _pickerShow(){
        Picker.init({
            pickerData: this.state.pickerData,
            selectedValue: [],
            pickerConfirmBtnText:strings('form.confirm'),
            pickerCancelBtnText:strings('form.cancel'),
            pickerTitleText:strings('form.select'),
            // pickerToolBarBg: [232, 232, 232, 1],
            pickerBg:[245,245,245,1],
            // pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            onPickerSelect: (data) => {
                // console.log(data);
            },
            onPickerConfirm: (data) => {
                console.log(data)
                // JSON.stringify(data)

                this.setState({
                    category:{
                        ...this.state.category,
                        text: data.toString()
                    }
                });
            }
        });
        Picker.show();
    }

    getCategory(level) {
        let that = this
        // 组合分类树
        let get = function(level) {
            return new Promise((resolve, reject) => {
                Util.ajax({
                    method: 'get',
                    url: '/B2BCategory/GetList',
                    params: {
                        CLevel: level
                    }
                }).then(result => {
                    resolve(result.data)
                })
            })
        }
        return Promise.all([get(1), get(2), get(3)]).then(function(values) {
            let level1 = values[0]
            let level2 = values[1]
            let level3 = values[2]

            // 三级目录合成到二级目录
            level2.map((item) => {
                item.children = []
                level3.map((item2) => {
                    if (item.ID == item2.ParentID && item2.Name != 'N/A') {
                        item.children.push(item2)
                    }
                })
                // 没有3级目录 可以选择2级目录
                if (item.children.length == 0) {
                    delete item.children
                }
            })
            // 二级目录合成到一级目录
            level1.map((item) => {
                item.children = []
                level2.map((item2) => {
                    if (item.ID == item2.ParentID) {
                        item.children.push(item2)
                    }
                })
            })
            // console.log(level1);

            var pickerData = [];
            level1.map((item,index)=>{
                pickerData[index] = {};
                pickerData[index][item.Name] = [];
                item.children && item.children.map((item2,index2)=>{
                    pickerData[index][item.Name][index2] = {};
                    pickerData[index][item.Name][index2][item2.Name] = [];
                    item2.children && item2.children.map(item3=>{
                        pickerData[index][item.Name][index2][item2.Name].push(item3.Name)
                    })
                })
            })

            that.setState({
                pickerData:pickerData,
                category:{
                    ...that.state.category,
                    data:level1
                }
            })
        });
    }

    componentDidMount(){
        let _this = this;
        const { navigation } = this.props;

        // 获取分类列表
        this.getCategory();

        if(navigation.state.params.id){
            Util.ajax({
                method: 'get',
                url:'/b2boffer/get',
                params:{
                    id: navigation.state.params.id
                }
            }).then((response)=>{
                // console.log(response.data[0]);
                _this.setState({
                    tableData:response.data[0],
                    avatarSource:{uri:(Util.domain + response.data[0].Img)}
                });
            })
        }
    }

    componentWillUnmount(){
        Picker.hide();
    }

    render() {
        const { tableData,editable,avatarSource,category } = this.state;

        return (
            <Layout>
                <Content>
                    <View style={styles.content}>
                        <View style={styles.block}>
                            <NewInput ref={(e) => {this.inputs.Name = e;}} label={strings('form.OfferName')} editable={editable} placeholder={strings('form.OfferName')} defaultText={tableData.Name} rule='*2-30' required={true} />

                            <TouchableOpacity onPress={()=>{this._photoShow()}}>
                                <Text>{strings('form.OfferPhoto')}:</Text>
                                <Image source={avatarSource} style={{marginTop:10,width:64,height:48}} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{this._pickerShow()}}>
                                <Text>{strings('form.OfferCategory')}:{category.text}</Text>
                            </TouchableOpacity>

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
