import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

// style
// textStyle
// onPress

class newButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    rendTitle(){
        if(typeof this.props.icon == 'object'){
            return (
                <View style={{flexDirection:'row',alignItems: 'center',paddingRight:5}}>
                    <Text style={[styles.buttonText,this.props.textStyle]}>{this.props.title}</Text>
                    {this.props.icon}
                </View>
            );
        }else{
            return (
                <Text style={[styles.buttonText,this.props.textStyle]}>{this.props.title}</Text>
            );
        }
    }

    render() {
        return (
            <TouchableOpacity {...this.props} style={[styles.button,this.props.style]} onPress={this.props.onPress}>
                {this.rendTitle()}
            </TouchableOpacity>
        );
    }
}
export default newButton;

const styles = {
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius:5,
    },
    buttonText: {
        paddingLeft:10,
        paddingRight:10,
        color:'#333',
        fontSize:14
    }
}
