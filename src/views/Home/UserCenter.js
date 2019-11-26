import React from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    PixelRatio,
    Dimensions
} from 'react-native';
import { Drawer, Header,Right,Body,Button,Title,Icon,Text, Spinner,Toast } from 'native-base';

import {connect} from 'react-redux';
import {logoutSuccess} from '../../actions/actions';

const {height, width} = Dimensions.get('window');

import Util from '../../libs/libs';
import Layout  from '../../components/Layout';
import {strings} from '../../language/I18n.js';

const win = Dimensions.get('window');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status:'',
            navLevel1:[
                {
                    title:'My.ExhibitionManagement.Info',
                    route:'Abroad',
                    ico:require('../../static/serviceHallPageIco2.png')
                }
            ],
            navLevel2:[
                {
                    title:'My.ManageCompanies.Info',
                    route:'jbxx',
                    ico:require('../../static/serviceHallPageIco4.png')
                },
                {
                    title:'My.ManageCompanies.Add',
                    route:'jbxx',
                    ico:require('../../static/serviceHallPageIco4.png')
                }
            ],
            navLevel3:[
                {
                    title:'My.ManageProducts.All',
                    route:'jbxx',
                    ico:require('../../static/serviceHallPageIco4.png')
                },
                {
                    title:'My.ManageProducts.Add',
                    route:'jbxx',
                    ico:require('../../static/serviceHallPageIco4.png')
                }
            ],
            navLevel4:[
                {
                    title:'My.ManageOffers.All',
                    route:'jbxx',
                    ico:require('../../static/serviceHallPageIco4.png')
                },
                {
                    title:'My.ManageOffers.Add',
                    route:'jbxx',
                    ico:require('../../static/serviceHallPageIco4.png')
                }
            ],
            navLevel5:[
                {
                    title:'My.ManageMeetings.New',
                    route:'Other',
                    ico:require('../../static/serviceHallPageIco5.png')
                },
                {
                    title:'My.ManageMeetings.Replied',
                    route:'Other',
                    ico:require('../../static/serviceHallPageIco5.png')
                },
                {
                    title:'My.ManageMeetings.Invitations',
                    route:'Other',
                    ico:require('../../static/serviceHallPageIco5.png')
                }
            ],
            navLevel6:[
                {
                    title:'My.ManageInquiries.Sent',
                    route:'Other',
                    ico:require('../../static/serviceHallPageIco5.png')
                },
                {
                    title:'My.ManageInquiries.Inbox',
                    route:'Other',
                    ico:require('../../static/serviceHallPageIco5.png')
                }
            ]
        };
    }

    goToPage(detailItem){
        const { navigation } = this.props;
console.log(detailItem);
        // navigation.navigate(detailItem.route);
    }

    renderNavLevel(data){
        let navLevelArr=[];
        data.map((item,index)=>{
            navLevelArr.push(
                <TouchableOpacity style={styles.navItem} key={index} onPress={()=>{this.goToPage(item)}}>
                    <Image source={item.ico} style={styles.navImg} />
                    <Text style={{fontSize:12}}>{strings(item.title)}</Text>
                </TouchableOpacity>
            )
        });

        return navLevelArr;
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

    logout(){
        this.setState({
            status:'loading',
        });

        let _this = this;
        const {navigation,dispatch,defaultEx,exhibitions} = this.props;
        let exhibition = Util.getExhibitionConf(defaultEx,exhibitions);

        Util.ajax.get('/WebUser/Logout').then((response) => {
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

    render() {
        const { navigation } = this.props;
        let {navLevel1,navLevel2,navLevel3,navLevel4,navLevel5,navLevel6} = this.state;
        return (
            <Layout>
                <ScrollView style={styles.serviceHallPage}>
                    <Button style={styles.about} onPress={() => {navigation.navigate('Settings')}}>
                        <Icon name='settings' />
                    </Button>
                    <Image source={require('../../static/serviceHallPage.jpg')} style={styles.banner} />

                    <View style={{marginLeft:5,marginRight:5}}>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>{strings('My.ExhibitionManagement.title')}</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel1)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>{strings('My.ManageCompanies.title')}</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel2)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>{strings('My.ManageProducts.title')}</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel3)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>{strings('My.ManageOffers.title')}</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel4)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>{strings('My.ManageMeetings.title')}</Text>
                            </View>
                            <View style={styles.navLevelBox}>
                                {
                                    this.renderNavLevel(navLevel5)
                                }
                            </View>
                        </View>
                        <View style={styles.navLevel}>
                            <View style={styles.navLevelTitle}>
                                <Text style={styles.navLevelTitleText}>{strings('My.ManageInquiries.title')}</Text>
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
    about:{
        position:'absolute',
        right:10,
        top:10,
        backgroundColor:'#4c91d2',
        zIndex:1
    },
    banner:{
        marginBottom:10,
        width:win.width,
        height:400*(win.width)/win.height,
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
