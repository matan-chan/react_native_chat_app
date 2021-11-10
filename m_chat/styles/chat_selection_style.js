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
    image_overlay: {
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height+500,
      position:"absolute",
      backgroundColor:'rgba(0, 0, 0, 0.9)',

    },
    popup_image: {
      flex: 1,
    
    },
  }

