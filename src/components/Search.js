import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Item,Picker,Icon,Input } from 'native-base';

class newButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected:''
        }
    }

    onValueChange(value){
        this.setState({
            selected:value
        })
    }

    render() {
        return (
            <View style={{flexDirection:'row'}}>
                <Item style={styles.search}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                </Item>
            </View>
        );
    }
}
export default newButton;

const styles = {
    search: {
        flex:1,
        marginLeft:10,
        marginRight:10,
        borderTopWidth:1,
        borderColor:'#f00',
    }
}
