import React,{Component} from 'react';
import {
    AppRegistry,
    View,
    TextInput,
    ListView,
    Text,
    Image
} from 'react-native';
var Api_url='https://api.github.com/search/repositories?q='; //api
class githubFind extends Component{
    //构造函数
    constructor(props){
        super(props);
        //初始状态
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'red'}}>
                <TextInput style={styles.textInput}
                           placeholder='请输入信息'
                           onEndEditing={(event)=>this.endSeacherContent(evevt)}/>
                <ListView style={styles.ListViewstyle}
                          dataSource={this.state.dataSource}
                          renderRow={(rowData)=>this.renderRow()}
                          showsVerticalScrollIndicator={false}
                >
                </ListView>
            </View>

        )
    }
    //自定义cell 渲染每条数据
    renderRow(rowData){
        return(
            <View style={styles.cellStyle}>
                <View style={styles.infoviewStyle}>
                    <View style={{width:65,height:35,justifyContent:'center',alignItems:'center'}}>
                        <Image source={{uri:rowData.owner.avatar_url}}></Image>
                    </View>
                    <View style={{flex:1,backgroundColor:'gray',marginLeft:5,justifyContent:'space-around'}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>aaaa</Text>
                        <Text style={{fontSize:14}}>ssss</Text>
                    </View>
                </View>
                <View style={styles.line}>
                </View>
            </View>
        )
    }
    //当输入完成后点击reture后下载数据 数据的请求GET方式
    endSeacherContent(event){
       let seacherContent=event.nativeEvent.text.toLowerCase();//转换字符大小写
       let searchURL=Api_url+encodeURIComponent(seacherContent);
        //获取数据相当于AJAX异步请求数据
        fetch(searchURL)
            .then((data)=>data.json()) //将原生的数据转换成json数据
            .then((responseData)=>{
                if(responseData.items){
                    this.setState({dataSource:this.state.dataSource.cloneWithProps(responseData)})
                }
            }).done()
    }
}
const styles=Stylesheet.create({
    textInput:{
        marginTop:30,
        height:30,
        backgroundColor:'#eaeaea',
        marginBottom:5
    },
    cellStyle:{
        width:65,
        height:65
    },
    ListViewstyle:{
        flex:1,
        backgroundColor:'red'
    },
    line:{
        height:1,
        backgroundColor:'rgba(0,0,0,0.2)',
        marginLeft:5,
        marginRight:5
    },
    infoviewStyle:{
        flex:1,
        backgroundColor:'#333',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }

});
AppRegistry.registerComponent('MyProject', () => githubFind);