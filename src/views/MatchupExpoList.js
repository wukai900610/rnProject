import React,{Component}  from 'react';
import {View} from 'react-native';
// import { Container, Content, List, ListItem, Text, Spinner } from 'native-base';
import CustomList  from '../components/List';
import Util from '../libs/libs';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        let {navigation} = this.props;
        // console.log(navigation)
        // console.log(navigation.state.params.keyword)
    }

    render() {
        return (
            <View style={{flex:1}}>
                <CustomList />
            </View>
        );
    }
}
export default App;

const styles = {

}
