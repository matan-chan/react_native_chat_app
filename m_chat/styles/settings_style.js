import {Dimensions } from 'react-native';


export const styles= 
{
    main_view: {
      flex: 1,
      paddingTop: 0,
      backgroundColor:'#111',
    },
    header_view: {
      width: '100%',
      height: 80,
      flexDirection: "row",
    },
    menu_button: {
      borderRadius:40,
      height:45,
      width:45,
      marginTop:30,
      marginLeft:10,
      alignItems: 'center',
    },
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
      top:10,
      fontSize:20 
    },
    color_picker_overlay: {
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height+500,
      position:"absolute",
      backgroundColor:'rgba(0, 0, 0, 0.9)',
    },

    dark_button: {
      height:40,width:80,borderBottomStartRadius:10,borderTopStartRadius:10,alignItems:'center'
    },
    light_button: {
      height:40,width:80,alignItems:'center'
    },
    custom_button: {
      height:40,width:80,borderBottomEndRadius:10,borderTopEndRadius:10,alignItems:'center'
    },
    color_item_example: {
      height:50,width:50,borderRadius:100
    },
    triple_slider: {
      height:40,width:240,top:30,borderRadius:10,marginStart:'auto',end:10,flexDirection:"row"
    },
    
  }

