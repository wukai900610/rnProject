import React,{Component}  from 'react';
import {View, Text, Image, PixelRatio, Dimensions} from 'react-native';
import Util from '../libs/libs';
import {strings} from '../language/I18n.js';

const win = Dimensions.get('window');

class Homebottom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.block}>
                    <Image source={require('../static/pic1.png')} style={styles.banner} />
                    <Text style={styles.text}>{strings('home.text1Title')}</Text>
                    <Text style={styles.text}>{strings('home.text1')}</Text>
                </View>
                <View style={styles.block}>
                    <Image source={require('../static/pic2.png')} style={styles.banner} />
                    <Text style={styles.text}>{strings('home.text2Title')}</Text>
                    <Text style={styles.text}>{strings('home.text2')}</Text>
                </View>
                <View style={styles.block}>
                    <Image source={require('../static/pic3.png')} style={styles.banner} />
                    <Text style={styles.text}>{strings('home.text3Title')}</Text>
                    <Text style={styles.text}>{strings('home.text3')}</Text>
                </View>
            </View>
        );
    }
}
export default Homebottom;

const styles = {
    content:{
        marginLeft:10,
        marginRight:10,
    },
    banner:{
        marginBottom:10,
        width:win.width - 20,
        // flex:1,
        height:500*(win.width - 20)/win.height,
        // width:760 / PixelRatio.get(),
        // height: 500 / PixelRatio.get(),
    },
    block:{
        flex:1,
        marginBottom:10,
    },
    text:{
        fontSize:16
    }
}
