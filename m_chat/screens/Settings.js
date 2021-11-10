import React, { useState, useEffect,useRef } from 'react';
import {Text, View, StatusBar, TouchableHighlight, Dimensions, FlatList, I18nManager, LogBox,Animated,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/settings_style';
import {ColorPicker} from 'react-native-color-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

I18nManager.allowRTL(false);
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function Chat_room({ navigation }) {
  const [mode, setMode] = useState({});
  const [preferences, set_preferences] = useState({});
  const [editable_mode, set_editable_mode] = useState([]);
  const [list_refs, set_list_refs] = useState([]);
  const [focused_param, set_focused_param] = useState('');
  const [focused_color, set_focused_color] = useState();
  const [dark_button, set_dark_button] = useState('lightgray');
  const [light_button, set_light_button] = useState('lightgray');
  const [custom_button, set_custom_button] = useState('lightgray');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);
  const left = useRef(new Animated.Value(0)).current
  const top = useRef(new Animated.Value(0)).current
  const size = useRef(new Animated.Value(0)).current
  const visable = useRef(new Animated.Value(-1)).current
 

  useEffect(() => {load_lanes()},[]);

  const pressHandler = () => {}

  const load_lanes = async() => {
    var value = JSON.parse(await AsyncStorage.getItem('settings'))
    set_preferences(value)
    if(value.mode=='dark'){
      setMode(value.dark_theme)
      set_dark_button('white')
    }
    else if(value.mode=='light'){
      setMode(value.light_theme)
      set_light_button('white')
    }
    else if(value.mode=='custom'){
      setMode(value.custom_theme)
      set_custom_button('white')
    }   
    var keys = [];
    for(var k in value.custom_theme) keys.push({'name':k,'value':value.custom_theme[k]});
    set_editable_mode(keys)
  }

  const change_color = async(color) => {
    preferences.custom_theme[focused_param]=color
    await AsyncStorage.setItem('settings', JSON.stringify(preferences))
    for (let i = 0; i < editable_mode.length; i++) {
      if(editable_mode[i].name==focused_param)  editable_mode[i].value=color
    }
    set_focused_color(color)
  }

  const select_mode = async(color) => {
    set_dark_button('lightgray')
    set_light_button('lightgray')
    set_custom_button('lightgray')
    if(color=='dark'){
      preferences.mode='dark'
      set_dark_button('white')
      setMode(preferences.dark_theme)
    }
    else if(color=='light'){
      preferences.mode='light'
      set_light_button('white')
      setMode(preferences.light_theme)
    }
    else if(color=='custom'){
      preferences.mode='custom'
      set_custom_button('white')
      setMode(preferences.custom_theme)
    }  
    await AsyncStorage.setItem('settings', JSON.stringify(preferences))
  }

  const close_color_picker = () => {
    list_refs[focused_param].measure(
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

  const open_color_picker = (item_ref,value) => {
    set_focused_param(item_ref)
    set_focused_color(value)
    list_refs[item_ref].measure(
      (width, height, px, py, fx, fy) => {
        left.setValue(fx+20)
        top.setValue(fy+20)
        size.setValue(40)
        visable.setValue(-1)
        Animated.timing(left, {
          toValue: Dimensions.get('window').width/2-175,
          duration: 200,
          useNativeDriver: false
        }).start();
        Animated.timing(top, {
          toValue: Dimensions.get('window').height/2-175,
          duration: 200,
          useNativeDriver: false
        }).start();
        Animated.timing(size, {
          toValue: 350,
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
      /*
                <View style={{height:40,width:80,backgroundColor:'red',top:30,borderBottomStartRadius:10,borderTopStartRadius:10}}> 
          </View>
          <View style={{height:40,width:80,backgroundColor:'yellow',top:30,}}> 
          </View>
          <View style={{height:40,width:80,backgroundColor:'green',top:30,borderBottomEndRadius:10,borderTopEndRadius:10,}}> 
          </View>
           */
  }

  return (
    <View style={{flex: 1,}}>     
      <StatusBar translucent={true} animated={true} backgroundColor = {mode.StatusBar_backgroundcolor} barStyle={'light-content'} />
      <View style={[styles.header_view,{ backgroundColor: mode.header_backgroundcolor}]}>
        <TouchableHighlight onPress={() => navigation.openDrawer()} style={styles.menu_button}  underlayColor= {mode.menu_button_underlayColor}>
          <Ionicons name="menu-outline" size={25} style={{top:8}} color={mode.chat_selection_menu_button} />
        </TouchableHighlight> 
        <View style={styles.triple_slider}> 
          <TouchableHighlight onPress={() => select_mode('dark')} style={[{backgroundColor:dark_button},styles.dark_button]}> 
            <Ionicons name="moon-outline" size={20} style={{top:8}} color={'black'} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => select_mode('light')} style={[{backgroundColor:light_button},styles.light_button]}> 
            <Ionicons name="sunny-outline" size={20} style={{top:8}} color={'black'} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => select_mode('custom')} style={[{backgroundColor:custom_button},styles.custom_button]}> 
            <Ionicons name="brush-outline" size={20} style={{top:8}} color={'black'} />
          </TouchableHighlight>              
        </View>
      </View>

      <FlatList data={editable_mode} renderItem={({item}) =>       
          <TouchableHighlight ref={(ref) => list_refs[item.name] = ref} key={item.name}  onPress={() => pressHandler(item)} underlayColor= {mode.chat_item_underlayColor}>     
            <View style={[styles.item_view,{backgroundColor: mode.chat_item_backgroundcolor,}]} >
              <TouchableHighlight key={item.name} onPress={() => open_color_picker(item.name,item.value)} style={styles.item_button } underlayColor= {mode.chat_item_image_underlayColor}>          
                <View  style={[styles.color_item_example,{backgroundColor:item.value}]}>
                </View>
              </TouchableHighlight>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.item_text,{color: mode.chat_item_text_color,flexShrink: 1}]}>  {item.name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          }
        />
      
      <AnimatedTouchable  onPress={() => close_color_picker()} style={[{zIndex:visable},styles.color_picker_overlay]} underlayColor= {'rgba(0, 0, 0, 0.9)'}>
        <AnimatedTouchable  style={{width:size, height:size, top:top ,left:left,backgroundColor:mode.color_picker_backgroundColor,borderRadius:20}}  onPress={() => console.log('placeholder')}  >
          <ColorPicker defaultColor={'#53aa33'}  oldColor={focused_color}  onColorSelected={color =>change_color(color)}  style={{flex:1}} />
        </AnimatedTouchable>
      </AnimatedTouchable>

    </View>
  );
}



