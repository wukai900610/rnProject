import React,{Component}  from 'react';
import {View} from 'react-native';
import { Container, Content, List, ListItem, Text, Spinner } from 'native-base';
import NewButton  from '../components/NewButton';
import Util from '../libs/libs';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRendList:false
        };
    }

    showNum(item){
        if(item.num > 0){
            return(
                <Text style={{fontWeight:'bold',color:'#333'}}>{item.num}</Text>
            )
        }else{
            return(
                <Text style={{fontWeight:'bold',color:'#333'}}></Text>
            )
        }
    }

    renderList(){
        let list = [];
        let { navigation } = this.props;

        this.props.data.children.map((item,index)=>{
            list.push(<ListItem itemDivider key={index} onPress={()=>{
                navigation.navigate('MatchupExpoList',{Name:item.Name,ID:item.ID,CLevel:item.CLevel})}}>
                <Text style={{fontWeight:'bold',color:'#333'}}>{item.Name}</Text>
            </ListItem>);

            item.children.map((item2,index2)=>{
                list.push(<ListItem key={index+'_'+index2}>
                    <NewButton onPress={()=>{
                        navigation.navigate('MatchupExpoList',{Name:item2.Name,ID:item2.ID,CLevel:item2.CLevel})}} textStyle={{color:'#666'}} title={item2.Name}/>
                        {this.showNum(item2)}
                </ListItem>);
            });
        });

        return (
        <Container>
            <Content>
                {list}
            </Content>
        </Container>);
    }

    renderSpinner(){
        return (<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Spinner color='#666' /></View>);
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isRendList:true
            });
        },100)
    }

    render() {
        return (
            <View style={{flex:1}}>
                {
                    this.state.isRendList ? this.renderList() :  this.renderSpinner()
                }
            </View>
        );
    }
}
export default App;

const styles = {
}
