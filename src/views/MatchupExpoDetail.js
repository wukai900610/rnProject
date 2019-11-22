import React,{Component}  from 'react';
import {View,Image,Text} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Util from '../libs/libs';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classData:{
                Img:''
            }
        };
    }

    componentDidMount(){
        let {navigation} = this.props;
        Util.ajax.get('/b2b' + navigation.state.params.type + '/get', {
            params:{
                id: navigation.state.params.ID
            }
        }).then((response)=>{
            this.setState({
                classData:{
                    ...response.data[0],
                    Img:'http://b2b.nigeriatex.com' + response.data[0].Img
                }
            });
        })
    }

    render() {
        // let {navigation} = this.props;
        let {classData} = this.state;
        return (
            <View style={{flex:1}}>
                <Image style={styles.pic} source={{uri:classData.Img}}/>
                <View style={styles.info}>
                    <Text style={styles.Description}>Description:{classData.Description}</Text>
                    <HTMLView value={classData.Summary} stylesheet={styles.article} />
                </View>
            </View>
        );
    }
}
export default App;

const styles = {
    pic:{
        alignItems:'center',
        height:400
    },
    info:{
        flex:1,
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#fff'
    },
    Description:{
        lineHeight:20
    },
    article:{

    }
}
