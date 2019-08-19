import React from 'react';
import {View} from 'react-native';

import NewButton from './NewButton';
import NewInput from './NewInput';

// import { ajaxGsListPageData,GsSearch } from '../actions/actions';
// import Util from '../libs/libs';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {placeholder,title}=this.props
        return (
            <View style={styles.search}>
                <NewInput placeholder={placeholder} ref={(e) => {this.newInput = e;}} style={styles.NewInput} round />
                <NewButton title={title} style={styles.searchBtn} textStyle={styles.searchBtnText} onPress={this.props.search} />
            </View>
        );
    }
}
export default Search;

const styles = {
    search: {
        flexDirection: 'row',
        padding:10,
    },
    NewInput: {
        marginRight:10,
        height:40,
    },
    searchBtn: {
        width:80,
        height:40,
        backgroundColor:'#2795ee'
    },
    searchBtnText: {
        color:'#fff'
    }
}
