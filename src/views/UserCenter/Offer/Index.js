import React,{Fragment,Component}  from 'react';
import {
  Alert,
  View,
  TouchableOpacity
} from 'react-native';
import { Content,Card,CardItem,Body,Right,Thumbnail,Button,Input,Text,Toast } from 'native-base';
import Layout  from '../../../components/Layout';

import I18n,{strings} from '../../../language/I18n.js';

import Util from '../../../libs/libs';
import NewInput from '../../../components/NewInput';

export default class App extends Component {
    static navigationOptions = ({ navigation }) => {
        return{
            title:strings('My.ManageOffers.title'),
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            tableData:[],
        }
    }

    componentDidMount(){
        let _this = this;

        Util.ajax({
            method: 'get',
            url:'/B2BOffer/GetMyList',
            params:{
                page: 1,
                size: 10,
                Title: '',
                IsCheck: '',
                CatelogID: '',
                Name: '',
                Kind: '',
                ID: ''
            }
        }).then((response)=>{
            _this.setState({
                tableData:response.data
            });
        })
    }

    delete(data){
        Alert.alert(
            '',
            strings('prompt.delete'),
            [
                {text: strings('form.cancel')},
                {text: strings('form.delete'), onPress: () => {
                    // Util.ajax({
                    //     method: 'delete',
                    //     url: '/B2BOffer/Delete',
                    //     params:{
                    //         id: data.ID
                    //     }
                    // }).then(result => {
                    //     let tempData = this.state.tableData
                    //     tempData.map((item,index)=>{
                    //         if(item.ID == data.ID){
                    //             tempData.splice(index,1)
                    //             this.setState({
                    //                 tableData:tempData
                    //             })
                    //         }
                    //     })
                    // })
                }},
            ]
        )
    }

    renderList(){
        const { navigation } = this.props;
        let list = [];
        this.state.tableData.map((item,index)=>{
            list.push(
                <CardItem button key={index} onPress={()=>{navigation.navigate('OfferDetail',{id:item.ID,name:item.Name})}}>
                    <Body>
                        <Text>{item.Name}</Text>
                        <Text note>{item.CategoryName}</Text>
                        <Text note>{new Date(item.AddTime).format('yyyy-MM-dd hh:mm')}</Text>
                    </Body>

                    <Right>
                        <Button small danger onPress={()=>{this.delete(item)}}>
                            <Text>删除</Text>
                        </Button>
                    </Right>
                </CardItem>
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
                        <Card>
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
