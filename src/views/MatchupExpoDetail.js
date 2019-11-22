import React,{Component}  from 'react';
import {View} from 'react-native';
import { Container, Content, List, ListItem, Text, Spinner } from 'native-base';
import NewButton  from '../components/NewButton';
import Util from '../libs/libs';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        let {navigation} = this.props;
        Util.ajax.get('/b2b' + navigation.state.params.type + '/get', {
            params:{
                id: navigation.state.params.ID
            }
        }).then((response)=>{
            this.classData = response.data[0]
            console.log(this.classData);
        })
    }

    render() {
        let {navigation} = this.props;

        return (
            <View style={{flex:1}}>
                <Text style={styles.title}>{navigation.state.params.title}</Text>
            </View>
        );
    }
}
export default App;

const styles = {

}
