import React, {useState, useEffect} from 'react';
import {Text, View, StatusBar, Image, TouchableHighlight, FlatList, I18nManager, TextInput, LogBox} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './../styles/chat_room_style.js';
import AsyncStorage from '@react-native-async-storage/async-storage'

I18nManager.allowRTL(false);
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function Chat_room({ route,navigation }) {
  const [mode, setMode] = useState({});
  const [text_msg, set_text_msg] = useState('');
  const [FlatList_ref, set_FlatList_ref] = useState('');
  const [textInput_ref, set_textInput_ref] = useState('');
  const [initialElements , set_initialElements ] = useState([])
  const [user_name, set_user_name] = useState('');

  useEffect(() => {
    var arr = []
    for (let i = 0; i < route.params.group.times.length; i++) {
      arr.push({key: i, name:route.params.group.senders[i], time:route.params.group.times[i], text:route.params.group.messages[i]});     
    }
    set_initialElements(arr)    
    load_lanes()
  },[]);

  const pressHandler = () => {
    navigation.goBack()
  }

  const go_to_info = () => {
    navigation.push('chat_info', { group: route.params.group })
  }

  const load_lanes = async() => {
    var value = JSON.parse(await AsyncStorage.getItem('settings'))
    var mode_ ={}
    if(value.mode=='dark') mode_ = value.dark_theme
    else if(value.mode=='light') mode_ = value.light_theme
    else if(value.mode=='custom') mode_ = value.custom_theme
    setMode(mode_)
    set_user_name(value.name)
  }

  const addElement = async() => { 
    if(text_msg!='')
    {
      const date = new Date()
      var time = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()
      var newArray = [...initialElements , {key: initialElements.length+1, name:user_name, time:time, text:text_msg}];
      set_initialElements(newArray);
      FlatList_ref._listRef._scrollRef.scrollToEnd({ animating: true });
      textInput_ref.clear()
      let response = await fetch("http://192.168.14.59:8080/add_message", {
        body: JSON.stringify({
          id: route.params.group.key,
          message: text_msg,
          sender: name,
          time: time,
        }),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      });
    }
   
  }

  const renderItem = ({ item }) => {  
    if(user_name!=item.name){
      return(
        <View style={styles.others_message_container}>
          <View style={[styles.others_message_triange,{borderColor:mode.chat_room_others_message_backgroundcolor}]}>
          </View>
          <View style={[styles.others_message_view,{backgroundColor:mode.chat_room_others_message_backgroundcolor}]}>
            <Text style={[styles.others_message_user_name,{color:mode.chat_room_text_color}]}>{item.name}</Text>
            <Text style={[styles.others_message_text,{color:mode.chat_room_text_color}]} >{item.text}</Text>
            <Text style={[styles.others_message_time,{color:mode.chat_room_text_color}]} >{item.time}</Text>
          </View>
       </View>
      );
    }
    return(
      <View style={styles.my_message_container}>
          <View style={[styles.my_message_triange,{borderColor:mode.chat_room_my_message_backgroundcolor}]}>
          </View>
          <View style={[styles.my_message_view,{backgroundColor:mode.chat_room_my_message_backgroundcolor}]}>
            <Text style={[styles.my_message_user_name,{color:mode.chat_room_text_color}]}>{item.name}</Text>
            <Text style={[styles.my_message_text,{color:mode.chat_room_text_color}]} >{item.text}</Text>
            <Text style={[styles.my_message_time,{color:mode.chat_room_text_color}]} >{item.time}</Text>
          </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: mode.chat_room_backgroundColor,}}>
      <StatusBar animated={true} backgroundColor = {mode.StatusBar_backgroundcolor} barStyle={'light-content'} />
      <View style={[{ backgroundColor: mode.header_backgroundcolor},styles.top_bar]}>
        <TouchableHighlight onPress={() => pressHandler()} style={styles.back_button}  underlayColor= {mode.chat_back_button_underlayColor}>
          <Ionicons name="arrow-back-outline" size={25} style={{top:8,color:mode.chat_room_back_button} }  />
        </TouchableHighlight>
        <Image style={styles.chat_room_image} source={{uri:route.params.group.c_img}} />
        <TouchableHighlight onPress={() => go_to_info()} style={styles.title_button}  underlayColor= {mode.chat_title_underlayColor}>
          <View style={[styles.title_view,{backgroundColor: mode.chat_selection_header,}]}>
            <Text style={styles.title_text}>{route.params.group.c_name}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <FlatList ref={(ref) => set_FlatList_ref(ref)} data={initialElements} renderItem={renderItem} />

      <View style={styles.footer}>
        <TouchableHighlight onPress={() => addElement()} style={[styles.send_button,{backgroundColor: mode.chat_send_button_background}] }  underlayColor= {mode.send_button_underlayColor}>
            <Ionicons name="arrow-back-outline" size={40} style={{top:5} } color= {mode.chat_send_button_color} />
        </TouchableHighlight>
        <TextInput ref={input => { set_textInput_ref(input) }} onSubmitEditing={() => addElement()} onChangeText ={ (text) =>{ set_text_msg(text)}} style={[styles.text_input,{color: mode.chat_room_text_input_txt_color,backgroundColor: mode.chat_room_text_input}]} ></TextInput>
      </View>

    </View>
  );
}



