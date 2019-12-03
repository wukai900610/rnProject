import React,{Fragment,Component}  from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { Content,Card,CardItem,Body,Thumbnail,Button,Input,Text,Toast } from 'native-base';
import Layout  from '../../../components/Layout';

import I18n,{strings} from '../../../language/I18n.js';

import Util from '../../../libs/libs';
import NewInput from '../../../components/NewInput';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData:[],
        }
    }

    componentDidMount(){
        let _this = this;
        const { navigation } = this.props;
        // 公司展会列表
        if(navigation.state.params.id){
            Util.ajax({
                method: 'get',
                url:'/B2BSupply/GetMyList',
                params:{
                    page: 1,
                    size: 10,
                    Title: '',
                    IsCheck: '',
                    id: ''
                }
            }).then((response)=>{
                _this.setState({
                    tableData:response.data
                });
            })
        }
    }

    renderList(){
        const { navigation } = this.props;
        let list = [];
        this.state.tableData.map((item,index)=>{
            list.push(
                <TouchableOpacity key={index} onPress={()=>{navigation.navigate('CompanyDetail',{id:item.ID})}}>
                    <CardItem>
                        <Thumbnail style={{marginRight:10}} source={{uri: Util.domain + item.Img}} />
                        <Body>
                            <Text>{I18n.locale == 'zh' ? item.Title : item.TitleEn}</Text>
                            <Text note>{item.Description}</Text>
                        </Body>
                    </CardItem>
                </TouchableOpacity>
            );
        });

        return list;
    }

    render() {
        const { navigation } = this.props;

        return (
            <Layout>
                <Content>
                    <View style={styles.content}>
                        <Card style={{flex: 0}}>
                            {this.renderList()}
                        </Card>
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
