import React,{Component}  from 'react';
import {View, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import Util from '../libs/libs';

class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height:this.props.height || 160,
            banner:[]
        };
    }

    rendPic(item){
        if(item.src){
            return (
                <Image source={{uri: item.src}} style={{width:'100%',height:'100%'}}/>
            )
        }else{
            return (
                <Text style={styles.text}>{item.name}</Text>
            )
        }
    }

    getData(){
        let _this = this;
        Util.ajax.get(_this.props.domain+this.props.url).then((response) => {
            _this.setState({
                banner:[{
                    src:_this.props.domain + response.data.Banner,
                    name:'Banner',
                },{
                    src:_this.props.domain + response.data.Banner2,
                    name:'Banner2',
                }],
            });
        });
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.domain && this.props.domain !== nextProps.domain){
            this.getData();
        }
    }

    componentDidMount(){
        this.getData();
    }

    render() {
        return (
            <View style={{...styles.banner,height:this.state.height}}>
                <Swiper
                    // hasFloatingParent={true}
                    height={this.state.height}
                    autoplay={false}
                    loop={true}
                    showsPagination={true}
                    title={false}
                    paginationStyle={{
                        bottom: 10, left: null, right: 10
                    }}
                    >
                    {
                        this.state.banner.map((item,index)=>
                            <View
                                style={styles.slide}
                                key={index}
                                title={<Text>{item.name}</Text>}>
                                {
                                    this.rendPic(item)
                                }
                            </View>
                        )
                    }
                </Swiper>
            </View>
        );
    }
}
export default Banner;

const styles = {
    banner: {
        marginBottom:30,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
}
