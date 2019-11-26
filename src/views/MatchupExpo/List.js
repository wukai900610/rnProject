import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import CustomList  from '../../components/List';
import Util from '../../libs/libs';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { navigation} = this.props;
        let params = navigation.state.params;
        let myRequest = [{// 来自关键词
            url:'/B2BKeyWords/Get',
            payload:{
                KeyWords: params.keyword,
                type: 'product',
                page: 1,
                size: 10,
            }
        },{// 来自目录
            url:'/B2BKeyWords/GetByCatelogID',
            payload:{
                CatelogID: params.ID,
                CLevel: params.CLevel,
                type: 'product',
                page: 1,
                size: 10,
            }
        }]
        this.state = {
            myRequest:params.from == 'home' ? myRequest[0] : myRequest[1]
        };
    }

    // 列表项渲染
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPressItem(item)}>
                <View style={styles.listItem}>
                    <Image style={styles.pic} source={{uri: 'http://b2b.nigeriatex.com' + item.Img}}/>

                    <View style={styles.info}>
                        <Text style={styles.title}>{item.Name}</Text>
                        <Text style={styles.desc}>{item.Description}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    };

    // 列表项点击
    _onPressItem = (item) => {
        const { navigation} = this.props;
        let {myRequest} = this.state;

        navigation.navigate('MatchupExpoDetail',{title:item.Name,ID:item.ID,type:myRequest.payload.type});
    };

    componentDidMount(){
        // let {navigation} = this.props;
        // console.log(navigation.state.params.keyword)
    }

    render() {
        let {myRequest} = this.state;

        return (
            <View style={{flex:1}}>
                <CustomList url={myRequest.url} params={myRequest.payload} renderItem={this._renderItem} />
            </View>
        );
    }
}
export default App;

const styles = {
    listItem: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop:10,
        marginBottom:10,
        flexDirection:'row'
    },
    pic: {
        marginRight:15,
        width:120,
        height:120
    },
    info: {
        flex:1,
    },
    title: {
        lineHeight:20,
        fontSize: 18
    },
    desc: {
        lineHeight:20,
        fontSize: 14
    },
}
