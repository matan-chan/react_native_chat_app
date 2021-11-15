import React, {useState, useEffect, useRef} from 'react';
import {Text, View, FlatList, TouchableHighlight, StatusBar, Image, Animated, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as pref from '../config.json';
import {styles} from './../styles/chat_selection_style.js';
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Chat_selection({ navigation }) {
  const [mode, setMode] = useState({});
  const isFocused = useIsFocused();
  const [list_refs, set_list_refs] = useState([]);
  const [focused_image, set_focused_image] = useState('');
  const [focused_image_uri, set_focused_image_uri] = useState();
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);
  const left = useRef(new Animated.Value(0)).current
  const top = useRef(new Animated.Value(0)).current
  const size = useRef(new Animated.Value(0)).current
  const visable = useRef(new Animated.Value(-1)).current
  const [groups , set_groups ] = useState([])
  useEffect(() => {load_lanes()},[isFocused]);

  const load_lanes = async() => {
    check=await AsyncStorage.getItem('settings')
    if(check==null) await AsyncStorage.setItem('settings', JSON.stringify(pref))  
    var value = JSON.parse(await AsyncStorage.getItem('settings'))
    var mode_ ={}
    if(value.mode=='dark') mode_ = value.dark_theme
    else if(value.mode=='light') mode_ = value.light_theme
    else if(value.mode=='custom') mode_ = value.custom_theme
    setMode(mode_)
    chats_loader(value.name)
  }

  function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  
  const chats_loader = async(name) => {
    let response = await fetch("http://111.111.11.11:8080/get_users_chats", {
        body: JSON.stringify({
          name: name,
        }),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      });
    let data = await response.json();
  
    data.forEach( obj => renameKey( obj, '_id', 'key' ) );
    set_groups(data)
  }

  const get_into_chat = (item) => {
      navigation.push('chat_room', { group: item })
  }

  const close_image = () => {
    list_refs[focused_image].measure(
      (width, height, px, py, fx, fy) => {
        Animated.timing(left, {
          toValue: fx+20,
          delay:0,
          duration: 200,
          useNativeDriver: false
        }).start();
        Animated.timing(top, {
          toValue: fy+20,
          delay:0,
          duration: 200,
          useNativeDriver: false
        }).start();
        Animated.timing(size, {
          toValue: 40,
          delay:100,
          duration: 100,
          useNativeDriver: false
        }).start();
        Animated.timing(visable, {
          toValue: -1,
          delay:0,
          duration: 400,
          useNativeDriver: false
        }).start();
      });
  }

  const open_image = (item_ref,uri) => {
    set_focused_image(item_ref)
    set_focused_image_uri(uri)
    list_refs[item_ref].measure(
      (width, height, px, py, fx, fy) => {
        left.setValue(fx+20)
        top.setValue(fy+20)
        size.setValue(40)
        visable.setValue(-1)
        Animated.timing(left, {
          toValue: Dimensions.get('window').width/2-125,
          duration: 200,
          useNativeDriver: false
        }).start();
        Animated.timing(top, {
          toValue: Dimensions.get('window').height/2-125,
          duration: 200,
          useNativeDriver: false
        }).start();
        Animated.timing(size, {
          toValue: 250,
          delay:100,
          duration: 100,
          useNativeDriver: false
        }).start();
        Animated.timing(visable, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start();
      });
  }

  return ( 
    <View style={styles.main_view}>
       <View style={styles.main_view}>
          <StatusBar translucent={true} animated={true} backgroundColor = {mode.StatusBar_backgroundcolor} barStyle={'light-content'} />
          <View style={[styles.header_view,{ backgroundColor: mode.header_backgroundcolor}]}>
            <TouchableHighlight onPress={() => navigation.openDrawer()} style={styles.menu_button}  underlayColor= {mode.menu_button_underlayColor}>
              <Ionicons name="menu-outline" size={25} style={{top:8} } color={mode.chat_selection_menu_button} />
            </TouchableHighlight>
          </View>
          <FlatList data={groups} renderItem={({item}) =>       
            <TouchableHighlight ref={(ref) => list_refs[item.key] = ref} key={item.key}  onPress={() => get_into_chat(item)} underlayColor= {mode.chat_item_underlayColor}>     
              <View style={[styles.item_view,{backgroundColor: mode.chat_item_backgroundcolor,}]} >
                <TouchableHighlight key={item.key} onPress={() => open_image(item.key,item.c_img)} style={styles.item_button } underlayColor= {mode.chat_selection_item_image_underlayColor}>          
                  <Image  style={styles.item_image } source={{uri: item.c_img}} />
                </TouchableHighlight>
                <View>
                  <Text style={[styles.item_text,{color: mode.chat_item_text_color,}]}>  {item.c_name}</Text>
                  <Text style={{color: mode.chat_item_text_color, top:10, fontSize:15,marginStart:0}}>   {item.senders[item.senders.length - 1]}: {item.messages[item.messages.length - 1]}</Text>
                </View>
                <Text style={{color: mode.chat_item_text_color, top:5, fontSize:15,marginStart:'auto' }}>{item.times[item.times.length - 1]}  </Text>
              </View>
            </TouchableHighlight>
            }
          />
        </View>
       
      <AnimatedTouchable  onPress={() => close_image()} style={[{zIndex:visable},styles.image_overlay]} underlayColor= {'rgba(0, 0, 0, 0.9)'}>
        <AnimatedTouchable  style={{width:size, height:size, top:top ,left:left}}  onPress={() => console.log('placeholder')}  >
          <Image  style={styles.popup_image} source={{uri:focused_image_uri}} />
        </AnimatedTouchable>
      </AnimatedTouchable>
    </View>
  );
}

