import React, {Component}  from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {Content,ListItem,Separator,Text,Toast,Button} from 'native-base';
import {connect} from 'react-redux';
import {changeExhibition,changeLan} from '../actions/actions';
import {strings} from '../language/I18n.js';

class App extends Component {
    constructor(props) {
        super(props);

        const {exhibitions} = this.props;

        this.state = {
            exhibitions:exhibitions,
        };
    }

    // 改变当前自办展
    _changeExhibition(itemName){
        const {dispatch} = this.props;
        dispatch(changeExhibition(itemName));
        // 提示切换成功
        Toast.show({
            text: strings('changeExhibition'),
            position: 'top',
            type: 'success',
            textStyle: { fontSize: 13 }
        })
    }

    // 改变语言
    _changeLan(lan){
        const {dispatch,navigation} = this.props;
        dispatch(changeLan(lan));

        console.log(this.props)
    }

    renderExhibitionList(){
        const {defaultEx} = this.props;
        let index = 0;
        var arr = [];
        for(let i in this.state.exhibitions){
            let item = this.state.exhibitions[i];
            if(index == this.state.exhibitions.length -1){
                if(i == defaultEx){
                    arr.push(<ListItem key={index} last selected>
                        <TouchableOpacity onPress={()=>{this._changeExhibition(i)}}>
                            <Text style={{fontSize:13}}>{strings('exhibitionInfo.'+i+'.title')}</Text>
                        </TouchableOpacity>
                    </ListItem>);
                }else{
                    arr.push(<ListItem key={index} last>
                        <TouchableOpacity onPress={()=>{this._changeExhibition(i)}}>
                            <Text style={{fontSize:13}}>{strings('exhibitionInfo.'+i+'.title')}</Text>
                        </TouchableOpacity>
                    </ListItem>);
                }
            }else{
                if(i == defaultEx){
                    arr.push(<ListItem key={index} selected>
                        <TouchableOpacity onPress={()=>{this._changeExhibition(i)}}>
                            <Text style={{fontSize:13}}>{strings('exhibitionInfo.'+i+'.title')}</Text>
                        </TouchableOpacity>
                    </ListItem>);
                }else{
                    arr.push(<ListItem key={index}>
                        <TouchableOpacity onPress={()=>{this._changeExhibition(i)}}>
                            <Text style={{fontSize:13}}>{strings('exhibitionInfo.'+i+'.title')}</Text>
                        </TouchableOpacity>
                    </ListItem>);
                }
            }

            index++;
        }

        return arr;
    }

    render() {
        return (
            <View style={styles.sideBar}>
                <Content>
                    <Separator bordered>
                        <Text style={{fontSize:14}}>{strings('exhibitionInfo.title')}</Text>
                    </Separator>
                    {
                        this.renderExhibitionList()
                    }
                </Content>
                <View style={styles.buttonBox}>
                    <Button style={styles.button} block light rounded onPress={()=>{this._changeLan('en')}}>
                        <Text>english</Text>
                    </Button>
                    <Button style={styles.button} block light rounded onPress={()=>{this._changeLan('zh')}}>
                        <Text>中文</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state.store
}

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
    sideBar:{
        flex:1,
        backgroundColor:'#fff'
    },
    buttonBox:{
        paddingBottom:10,
        paddingLeft:10,
        flexDirection:'row',
        alignSelf:'center',
    },
    button:{
        marginRight:10,
        flex:1
    }
});
