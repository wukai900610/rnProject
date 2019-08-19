/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component}  from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import Layout  from '../components/Layout';

export default class App extends Component {
    constructor(props) {
        super(props);

        let {list} = this.props;
        this.state = {
            list:list
        };
    }

    // 列表刷新
    // _onRefresh = () => {
    //     let _this = this;
    //     _this.setState({
    //         ..._this.state,
    //         list:{
    //             ..._this.state.list,
    //             refreshing:true,
    //         }
    //     });
    //     setTimeout(()=>{
    //         _this.setState({
    //             ..._this.state,
    //             list:{
    //                 ..._this.state.list,
    //                 refreshing:false,
    //                 data:_this.getData()
    //             }
    //         },()=>{
    //             console.log(this.state.list)
    //             });
    //     },2000);
    // };
    // 列表加载更多
    // _loadMore = () => {
    //     console.log('_loadMore')
    // };

    // 列表项点击
    // _onPressItem = (id: string) => {
    //     console.log(id)
    // };

    // 列表项渲染
    _renderItem = ({item}) => {
        return (
            <View style={styles.listItem} onPress={this.props.onPressItem}>
                <View style={styles.listItemBox}>
                    <Text>{item.id}---{item.title}</Text>
                </View>
            </View>
        )
    };

    componentDidMount(){
        // 初始化数据
        // this.setState({
        //     ...this.state,
        //     list:{
        //         ...this.state.list,
        //         data:this.getData()
        //     }
        // })
    }

    // getData(){
    //     let data = [];
    //     for(let i =0;i<22;i++){
    //         let item = {
    //             title:'index'+i,
    //             id:'id'+i
    //         };
    //         data.push(item);
    //     }
    //
    //     return data;
    // }

    render() {
        const {navigation} = this.props;
        return (
            <Layout>
                <FlatList
                style={styles.scrollView}
                data={this.state.list.data}
                extraData={this.state}
                keyExtractor={ (item, index) => item.id}
                refreshing={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.list.refreshing}
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor={"#ffffff"}
                        onRefresh={() => {this.props.onRefresh()}}
                    />
                }
                renderItem={this._renderItem}
                onEndReached={this.props.loadMore}
                onEndReachedThresholdnumber ={0.25}
                ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#f00'}}/>)}
                />
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex:1,
        backgroundColor: '#ececec',
    },
    listItem:{
        paddingLeft:10,
        paddingRight:10,
        height:30,
        backgroundColor:'#ccc',
        justifyContent :'center',
    },
    listItemBox:{
        fontSize:22
    }
});
