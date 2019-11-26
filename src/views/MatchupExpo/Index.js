/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component}  from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Container, Header,Left,Body,Right,Title, } from 'native-base';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Util from '../libs/libs';
import Layout  from '../components/Layout';
import Expolist  from '../components/Expolist';
import {connect} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category:[]
        }
    }

    do(){
        let _this = this;

        const { defaultEx,exhibitions} = this.props;
        let exhibition = Util.getExhibitionConf(defaultEx,exhibitions);

        let get = function (level) {
            return new Promise((resolve, reject)=>{
                Util.ajax.get('/B2BCategory/GetListWithNum',{params:{CLevel: level}}).then((response) => {
                    resolve(response.data)
                });
            })
        }

        Promise.all([get(1), get(2), get(3)]).then(function(values) {
            let level1 = values[0].list
            let num1 = values[0].num
            let level2 = values[1].list
            let num2 = values[1].num
            let level3 = values[2].list
            let num3 = values[2].num
            let tempData = []

            // 匹配数据
            for (var i in num1) {
                level1.map(function(item) {
                    if (item.ID == i) {
                        item.num = num1[i]
                    }
                })
            }
            for (var i in num2) {
                level2.map(function(item) {
                    if (item.ID == i) {
                        item.num = num2[i]
                    }
                })
            }
            for (var i in num3) {
                level3.map(function(item) {
                    if (item.ID == i) {
                        item.num = num3[i]
                    }
                })
            }

            // 三级目录合成到二级目录
            level2.map((item) => {
                item.children = []
                level3.map((item2) => {
                    if (item.ID == item2.ParentID) {
                        item.children.push(item2)
                    }
                })
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
            _this.setState({
                category:level1
            });
        });
    }

    componentDidMount(){
        this.do();
    }

    render() {
        return (
            <Layout>
                <Container>
                    <ScrollableTabView
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar />}
                        tabBarUnderlineStyle={{height:1,backgroundColor:'#3f51b5'}}
                        tabBarActiveTextColor="#3f51b5"
                        tabBarInactiveTextColor ="#ccc"
                    >
                        {
                            this.state.category.map((item,index)=>
                                <Expolist {...this.props} data={item} tabLabel={item.Name} key={index}/>
                            )
                        }
                    </ScrollableTabView>
                </Container>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return state.store
}

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
});
