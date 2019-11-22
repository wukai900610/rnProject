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

import CustomList  from '../components/List';
import Util from '../libs/libs';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

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
        navigation.navigate('MatchupExpoDetail',{title:item.Name,ID:item.ID,type:navigation.state.params.type});
    };

    componentDidMount(){
        // let {navigation} = this.props;
        // console.log(navigation.state.params.keyword)
    }

    render() {
        let params = {
            KeyWords: '',
            type: 'product',
            page: 1,
            size: 10,
        }
        return (
            <View style={{flex:1}}>
                <CustomList url="/B2BKeyWords/Get" params={params} renderItem={this._renderItem} />
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
