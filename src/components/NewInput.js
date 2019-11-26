import React from 'react';
import {View, Text,TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Util from '../libs/libs';

// showClearTextBtn 是否显示清除按钮
// inputChange 事件
// rule 规则
class NewInput extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            status:'',
            editable:this.props.editable || '',
            text:this.props.defaultText || ''
        }
    }

    setText(text){
        // this.setState({
        //     text:text
        // });

        let {rule} = this.props;
        let status = '';
        //规则库
        if(rule){
            if(rule == 'checkPassword'){
                // if(Util.ruleFun[rule](text) && text == this.props.rule.password){
                //     status = 'pass'
                // }else{
                //     status = 'fail'
                // }
            }else{
                if(Util.ruleFun[rule](text)){
                    status = 'pass'
                }else{
                    status = 'fail'
                }
            }
        }

        this.setState({
            text:text,
            status:status
        })

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text,status
            })
        }
    }

    _clearText(){
        let {rule,required} = this.props;
        if(rule !==undefined){
            if(required){
                this.setState({
                    text:'',
                    status:'fail'
                });
            }else{
                this.setState({
                    text:'',
                    status:''
                });
            }
        }else{
            this.setState({
                text:'',
                status:''
            });
        }

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text:'',
                status:''
            })
        }
    }

    renderClearTextBtn(){
        if(this.state.editable != false){
            if(this.props.showClearTextBtn != false){
                if(this.state.text.length > 0){
                    return (
                        <TouchableOpacity style={styles.clearText} onPress={()=>{this._clearText()}}>
                            <Ionicons color='#666' name='ios-trash' size={20}/>
                        </TouchableOpacity>
                    )
                }
            }
        }

    }

    renderIconStatus(status){
        if(this.state.editable != false){
            if(status == 'pass'){
                return (
                    <View style={styles.status}>
                        <Ionicons color='#4caf50' name='md-checkmark-circle' size={20}/>
                    </View>
                )
            }
        }

        // else if(status == 'fail'){
        //     return (
        //         <View style={styles.status}>
        //             <Ionicons color='#ff0000' name='md-close-circle' size={20}/>
        //         </View>
        //     )
        // }
    }

    // 是否是必填项
    _checkRequired(){
        let {rule,required} = this.props;
        let {text,editable} = this.state;
        let status = '';

        if(editable != false){
            if(required){
                if(text == ''){
                    status = 'fail'
                    this.setState({
                        status:status
                    })
                }else{
                    status = 'pass'
                    this.setState({
                        status:status
                    })
                }
            }
        }else{
            this.setState({
                status:status
            })
        }
    }

    componentDidMount(){
        this._checkRequired();
    }

    componentWillReceiveProps(nextProps){
        let {defaultText,editable} = this.props;
        if(!editable && nextProps.defaultText !== defaultText){
            // console.log('defaultText');
            this.setState({
                text:nextProps.defaultText
            },()=>{
                this._checkRequired();
            })
        }

        if(nextProps.editable != editable){
            this.setState({
                editable:nextProps.editable
            },()=>{
                this._checkRequired();
            })
        }
    }

    render() {
        let {status} = this.state;
        let {round,label} = this.props;

        return (
            <View style={[styles.newInput,this.props.style,status=='fail'?styles.fail:'',round?styles.round:'']}>
                <Text style={styles.label}>{label}</Text>
                <TextInput underlineColorAndroid="transparent" autoCapitalize="none" {...this.props} style={styles.inputText} value={this.state.text} autoCorrect={false} onChangeText={(text) => {this.setText(text)}} />

                {this.renderIconStatus(status)}
                {this.renderClearTextBtn()}
            </View>
        );
    }
}
export default NewInput;

const styles = {
    newInput: {
        flex:1,
        height: 45,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#f1f1f1',
        backgroundColor:'#fefefe',
    },
    clearText:{
        justifyContent: 'center',
        marginRight:10
    },
    status:{
        justifyContent: 'center',
        marginRight:10
    },
    label:{
        paddingRight:5,
        color:'#666',
        fontSize:15
    },
    inputText: {
        flex:1,
        padding:0,
        paddingLeft:5,
        color:'#363636',
        fontSize:14
    },
    fail:{
        borderColor:'#f00',
    },
    round:{
        borderRadius:5,
    }
}
