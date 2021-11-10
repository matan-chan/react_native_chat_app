import {Dimensions } from 'react-native';


export const styles= 
{

    item_view: {
        width: '100%',
        height: 70,
        flexDirection: 'row'
    },
    item_button: {
        borderRadius:40,
        marginLeft: 5,
        marginTop:10,
        height:50,
        width:50,     
      },
      item_image: {
        height:50,
        width:50,
        borderRadius:40,
      },
      item_text: {
        top:15,
        fontSize:25 
      },
    top_bar: {
        width: '100%',
        height: 80,
        flexDirection: "row",
    },
    back_button: {
        borderRadius:40,
        height:45,
        width:45,
        marginTop:30,
        marginLeft:10,
        alignItems: 'center',
    },
    chat_room_image: {
        marginLeft: 10,
        backgroundColor: 'white',
        marginTop:28,
        marginRight:10,
        height:45,
        width:45,
        borderRadius:40,
        
    },
    title_button: {
        width:Dimensions.get('window').width-120,
        height: 56,
        top:24,
    },
    title_view: {       
        width:'100%',
        height:'100%',
    },
    title_text: {
        color:'white',
        fontSize:22,
        marginLeft:15,
        marginRight:15,
        marginTop:10,
    },
    send_button: {
        borderRadius:40,
        height:50,
         width:50,
         marginStart:10,
         marginEnd:5,
        alignItems: 'center',
    },
    text_input: {
        height: 50,
        width:Dimensions.get('window').width-70,
        borderRadius:20,
        paddingHorizontal:15,
    },
    footer: {
        width: '100%',
        height: 53,
        flexDirection: "row",
        bottom:0,
    },
    
    text_input: {
        borderRadius:20,
        paddingHorizontal:15,
    },
    color_picker_overlay: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height+500,
        position:"absolute",
        backgroundColor:'rgba(0, 0, 0, 0.9)',
    },
    popup_text: {
        top:'15%' ,zIndex:100,position:'absolute',color:'white',fontSize:25
    },
    popup_container: {
        zIndex:100,backgroundColor:'#111',position:'absolute',borderRadius:40,alignItems:'center',flexDirection:'column'
    },
    popup_textinput: {
        color:'white',width:'90%', height:'19%', top:'60%' ,zIndex:100,backgroundColor:'black',position:'absolute',borderRadius:40,paddingHorizontal:10,fontSize:20
    },
  }

