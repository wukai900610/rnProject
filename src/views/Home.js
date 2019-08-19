import React, {Component}  from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Drawer, Header, Left, Body, Button,Title,Icon } from 'native-base';
import Util from '../libs/libs';
import Layout  from '../components/Layout';
import Banner from '../components/Banner';
import MainSearch from '../components/Search';
import SideBar from '../components/SideBar';
import NewButton from '../components/NewButton';

import {strings} from '../language/I18n.js';

import {connect} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
    }

    closeDrawer(){
        this.drawer._root.close()
    };
    openDrawer(){
        this.drawer._root.open()
    };

    search(){
        const { navigation} = this.props;
        let keyword = this.mainSearch.newInput.state.text;
        // console.log(keyword)
        keyword && navigation.navigate('MatchupExpoList',{keyword:keyword});
    }

    componentDidMount(){
        const { navigation} = this.props;
        // navigation.navigate('Login');
    }

    render() {
        const { navigation,defaultEx,exhibitions} = this.props;
        let exhibition = Util.getExhibitionConf(defaultEx,exhibitions);

        return (
            <Layout>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar />}
                    openDrawerOffset={0.3}
                    panCloseMask={0.3}
                    tapToClose={true}
                    onClose={() => this.closeDrawer()} >
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body style={{alignItems:'center'}}>
                        </Body>
                    </Header>
                    <Banner domain={exhibition.domain} url='/api/b2bbanner'></Banner>
                    <MainSearch title={strings('home.title')} placeholder={strings('home.mainSearchPlaceholder')} ref={(e) => {this.mainSearch = e;}} search={()=>{this.search()}} />
                </Drawer>
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
