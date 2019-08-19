import React,{Component}  from 'react';
import {View} from 'react-native';
// import { Container, Content, List, ListItem, Text, Spinner } from 'native-base';
import CustomList  from '../components/List';
import Util from '../libs/libs';

import {connect} from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        const {navigation} = this.props;
        // console.log(navigation)
        // console.log(navigation.state.params.keyword)
    }

    _getData = () = >{
        Util.ajax.post(url, params).then((response) => {
            dispatch(loginSuccess(response.data));
            _this.setState({
                status:'success',
            },()=>{
                
            });
        }).catch((e)=>{
            dispatch(loginFail());
            setTimeout(()=>{
                _this.setState({
                    status:'fail',
                });
            },500);
        });
    }

    _onRefresh = () => {
        const {dispatch} = this.props;
        dispatch()
    };

    _loadMore = () => {
        const {dispatch} = this.props;
        console.log('_loadMore')
    };

    _onPressItem = (id: string) => {
        console.log(id)
    };

    render() {
        return (
            <View style={{flex:1}}>
                <CustomList onRefresh={this._onRefresh} loadMore={this._loadMore} onPressItem={this._onPressItem} />
            </View>
        );
    }
}
function mapStateToProps(state) {
    return state.store
}

export default connect(mapStateToProps)(App);

const styles = {

}
