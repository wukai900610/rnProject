import React from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    PixelRatio,
    Dimensions
} from 'react-native';
import { Drawer, Button,Title,Icon,Text, Spinner,Toast } from 'native-base';

import {connect} from 'react-redux';
import {logoutSuccess} from '../actions/actions';

const {height, width} = Dimensions.get('window');

import Util from '../libs/libs';
import Layout  from '../components/Layout';
import {strings} from '../language/I18n.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status:'',
            navLevel1:[
                {
                    title:'参展报名',
                    type:'czbm',
                    ico:require('../static/serviceHallPageIco1.png')
                },{
                    title:'报名信息',
                    type:'bmxx',
                    ico:require('../static/serviceHallPageIco2.png')
                }
            ],
            navLevel2:[
                {
                    title:'全部公司',
                    type:'jbxx',
                    ico:require('../static/serviceHallPageIco4.png')
                },
                {
                    title:'添加公司',
                    type:'jbxx',
                    ico:require('../static/serviceHallPageIco4.png')
                }
            ],
            navLevel3:[
                {
                    title:'全部产品',
                    type:'jbxx',
                    ico:require('../static/serviceHallPageIco4.png')
                },
                {
                    title:'添加产品',
                    type:'jbxx',
                    ico:require('../static/serviceHallPageIco4.png')
                }
            ],
            navLevel4:[
                {
                    title:'全部商机',
                    type:'jbxx',
                    ico:require('../static/serviceHallPageIco4.png')
                },
                {
                    title:'添加商机',
                    type:'jbxx',
                    ico:require('../static/serviceHallPageIco4.png')
                }
            ],
            navLevel5:[
                {
                    title:'待回复',
                    type:'task',
                    ico:require('../static/serviceHallPageIco5.png')
                },
                {
                    title:'已回复',
                    type:'task',
                    ico:require('../static/serviceHallPageIco5.png')
                },
                {
                    title:'主动邀约',
                    type:'task',
                    ico:require('../static/serviceHallPageIco5.png')
                }
            ],
            navLevel6:[
                {
                    title:'发件箱',
                    type:'task',
                    ico:require('../static/serviceHallPageIco5.png')
                },
                {
                    title:'收件箱',
                    type:'task',
                    ico:require('../static/serviceHallPageIco5.png')
                }
            ]
        };
    }

    goToPage(detailItem){
        const { navigation } = this.props;

        navigation.navigate('Other');
    }

    logout(){
        this.setState({
            status:'loading',
        });

        let _this = this;
        const {navigation,dispatch,defaultEx,exhibitions} = this.props;
        let exhibition = Util.getExhibitionConf(defaultEx,exhibitions);
        let url = exhibition.domain + '/api/WebUser/Logout';

        Util.ajax.get(url).then((response) => {
            dispatch(logoutSuccess());
            _this.setState({
                status:'success',
            },()=>{
                Toast.show({
                    text: strings('logout.success'),
                    position: 'top',
                    type: 'success',
                    textStyle: { fontSize: 13 }
                });
            });
        }).catch((e)=>{
            setTimeout(()=>{
                _this.setState({
                    status:'fail',
                });
            },500);
        });
    }

    renderLogoutBtn(){
        const { userInfo } = this.props;
        if(userInfo.Ticket){
            return (<Button style={{marginBottom:10}} block danger rounded onPress={()=>{this.logout()}}>
                {this.state.status == 'loading' && (<Spinner color='#666' size="small" />)}
                <Text>{strings('logout.btn')}</Text>
            </Button>)
        }
    }

    renderNavLevel(data){
        let navLevelArr=[];
        data.map((item,index)=>{
            navLevelArr.push(
                <TouchableOpacity style={styles.navItem} key={index} onPress={()=>{this.goToPage(item)}}>
                    <Image source={item.ico} style={styles.navImg} />
                    <Text style={{fontSize:12}}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            )
        });

        return navLevelArr;
    }

    render() {
        const { navigation } = this.props;
        let {navLevel1,navLevel2,navLevel3,navLevel4,navLevel5,navLevel6} = this.state;
        return (
            <Layout>
                <ScrollView style={styles.serviceHallPage}>
                    <Image source={require('../static/serviceHallPage.png')} style={styles.banner} />

                    <View style={{marginLeft:5,marginRight:5}}>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>自办展参展管理</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel1)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>公司管理</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel2)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>产品管理</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel3)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>商机管理</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel4)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>配对邀约管理</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel5)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>联系信管理</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel6)
                                }
                            </View>
                        </View>
                        {
                            this.renderLogoutBtn()
                        }
                    </View>
                </ScrollView>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return state.store
}

export default connect(mapStateToProps)(App);

const styles = {
    serviceHallPage: {
        backgroundColor:'#f7f7f7'
    },
    banner:{
        marginBottom:10,
        width:1920 / PixelRatio.get(),
        height: 400 / PixelRatio.get()
    },
    navLevel:{
        flex:1,
        // justifyContent: 'space-between',
        marginBottom:5,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff'
    },
    navLevelTitle:{
        marginBottom:10,
        paddingLeft:15,
        fontSize:14
    },
    navLevelTitleText:{
        fontSize:13
    },
    navLevelBox:{
        flex:1,
        flexDirection: 'row',
    },
    navItem:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:15,
        paddingRight:15,
    },
    navImg:{
        marginBottom:10,
        width:100 / PixelRatio.get(),
        height: 100 / PixelRatio.get()
    }
}
