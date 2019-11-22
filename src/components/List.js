/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import Layout from '../components/Layout';
import Util from '../libs/libs';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            params:this.props.params,
            status: '',
        };
    }

    getData() {
        let _this = this;

        _this.setState({
            status: 'loading',
        },()=>{
            Util.ajax.get(_this.props.url, {
                params:this.state.params
            }).then((response) => {
                if(response.data.length > 0){
                    let page = _this.state.params.page + 1;
                    if(response.data.length < _this.state.size){
                        _this.setState({
                            status:'noData',
                            data:_this.state.data.concat(response.data),
                            params:{
                                ..._this.state.params,
                                page:page
                            }
                        });
                    }else{
                        _this.setState({
                            status:'success',
                            data:_this.state.data.concat(response.data),
                            params:{
                                ..._this.state.params,
                                page:page
                            }
                        });
                    }
                }else{
                    _this.setState({
                        status:'noData',
                    });
                }
            });
        });
    }

    // 列表加载更多
    _loadMore = () => {
        let _this = this;

        if(_this.state.status == '' || _this.state.status == 'success'){
            _this.getData();
        }
    };

    _renderFooter(){
        if(this.state.status == 'loading') {
            return (
                <View style={{paddingTop:10,alignItems:'center'}}>
                    <ActivityIndicator />
                    <Text style={{fontSize:14,marginTop:5,marginBottom:5,}}>正在加载更多数据...</Text>
                </View>
            );
        }else if(this.state.status == 'noData'){
            return (
                <View style={{paddingTop:10,alignItems:'center'}}>
                    <Text style={{fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        }else{
            return <View></View>;
        }
    }

    componentDidMount() {
        // 初始化数据
        this._loadMore()
    }

    render() {
        const {navigation} = this.props;
        return (
            <Layout>
                <FlatList
                style={styles.scrollView}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={ (item, index) => item.ID}
                renderItem={this.props.renderItem}
                onEndReached={this._loadMore}
                onEndReachedThresholdnumber ={0.1}
                ListFooterComponent={this._renderFooter.bind(this)}
                ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#f1f1f1'}}/>)}
                />
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    }
});
