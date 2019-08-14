/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component}  from 'react';
import {
    View,
  StyleSheet,
} from 'react-native';
import { Container, Header,Left,Body,Right,Title, Tab, Tabs, ScrollableTab } from 'native-base';
import Util from '../libs/libs';
import Layout  from '../components/Layout';
import Tab1  from '../views/My';
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
                Util.ajax.get(exhibition.domain+'/api/B2BCategory/GetList',{params:{CLevel: level}}).then((response) => {
                    resolve(response.data)
                });
            })
        }

        Promise.all([get(1), get(2), get(3)]).then(function(values) {
            let level1 = values[0]
            let level2 = values[1]
            let level3 = values[2]
            let tempData = []
            // 三级目录合成到二级目录
            level2.map((item)=>{
              item.children = []
              level3.map((item2)=>{
                    if(item.ID == item2.ParentID){
                        item.children.push(item2)
                    }
                })
            })
            // 二级目录合成到一级目录
            level1.map((item)=>{
              item.children = []
              level2.map((item2)=>{
                    if(item.ID == item2.ParentID){
                        item.children.push(item2)
                    }
                })
            })

            _this.setState({
                category:level1
            });

            // console.log(level1)
        });
    }

    componentDidMount(){
        this.do();
    }

    render() {
        console.log('render')
        return (
            <Layout>
                <Container>
                    <Header hasTabs>
                        <Body style={{alignItems:'center'}}>
                            <Title>Matchup Expo</Title>
                        </Body>
                    </Header>
                    <Tabs renderTabBar={()=> <ScrollableTab />}>
                        {
                            this.state.category.map((item,index)=>
                                <Tab heading={item.Name} key={index}>
                                    <Tab1 />
                                </Tab>
                            )
                        }
                    </Tabs>
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
