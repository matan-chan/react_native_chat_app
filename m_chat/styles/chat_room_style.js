import {Dimensions } from 'react-native';


export const styles= 
{
    others_message_triange: {
        top:-22.5,
        height:35,
        width:35,
        transform: [{ rotate: '-45deg'}],
        borderBottomColor:'transparent',
        borderTopColor:'transparent',
        borderBottomWidth:35,
        borderTopWidth:35,
        borderLeftWidth:35
    },
    others_message_container: {
        left:30,
        marginTop:20,
         flexDirection: "row"
    },
    others_message_view: {
        maxWidth:Dimensions.get('window').width-100,
        minWidth:150,
        borderRadius:30,
        borderTopLeftRadius:0,
        marginLeft:-45
    },
    others_message_user_name: {
        color:'white',
        fontSize:14,
        marginEnd:'auto',
        marginStart:15
        ,marginTop:10
    },
    others_message_text: {
        color:'white',
        fontSize:14,
        marginStart:15,
        marginEnd:15,
    },
    others_message_time: {
        color:'white',
        fontSize:10,
        marginStart:'auto',
        marginEnd:10,
        marginBottom:10
    }, 
    my_message_triange: {
        top:-22.5,
        marginLeft:-45,
        height:35,
        width:35,
        transform: [{ rotate: '225deg'}],
        borderBottomColor:'transparent',
        borderTopColor:'transparent',
        borderBottomWidth:35,
        borderTopWidth:35,
        borderLeftWidth:35
    },
    my_message_container: {
        right:30,
        marginTop:20,
        flexDirection:'row-reverse'
    },
    my_message_view: {
         maxWidth:Dimensions.get('window').width-100,
         minWidth:150,
         borderRadius:30,
         borderTopRightRadius:0
    },
    my_message_user_name: {
        fontSize:14,
        marginEnd:15,
        marginStart:'auto',
        marginTop:10
    },
    my_message_text: {
        fontSize:14,
        marginStart:15,
        marginEnd:15
    },
    my_message_time: {
        fontSize:10,
        marginEnd:'auto',
        marginStart:10,
        marginBottom:10
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
  }

