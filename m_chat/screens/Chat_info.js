import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StatusBar, Image, TouchableHighlight, FlatList, I18nManager, TextInput, LogBox, Animated, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './../styles/chat_info_style';
import AsyncStorage from '@react-native-async-storage/async-storage'

I18nManager.allowRTL(false);
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function Chat_info({ route,navigation }) {
  const [mode, setMode] = useState({});
  const [new_uri, set_new_uri] = useState('');
  const [initialElements , set_initialElements ] = useState([])
  const x = useRef(new Animated.Value(Dimensions.get('window').width/2)).current
  const y = useRef(new Animated.Value(Dimensions.get('window').height/2)).current
  const width = useRef(new Animated.Value(0)).current
  const height = useRef(new Animated.Value(0)).current
  const visable = useRef(new Animated.Value(-1)).current
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);
  useEffect(() => {
    var arr = []
    for (let i = 0; i < route.params.group.members.length; i++) {
      arr.push({key: i, name:route.params.group.members[i]});     
    }
    set_initialElements(arr)    
    load_lanes()
  },[]);

  const pressHandler = () => { }

  const go_back = () => {
    navigation.goBack()
  }

  const load_lanes = async() => {
    var value = JSON.parse(await AsyncStorage.getItem('settings'))
    var mode_ ={}
    if(value.mode=='dark') mode_ = value.dark_theme
    else if(value.mode=='light') mode_ = value.light_theme
    else if(value.mode=='custom') mode_ = value.custom_theme
    setMode(mode_)
  }

  const open_text_input = () => {
      width.setValue(0)
      height.setValue(0)
      x.setValue(Dimensions.get('window').width/2)
      y.setValue(Dimensions.get('window').height/2)
      let des_w = Dimensions.get('window').width*5/6
      let des_h = Dimensions.get('window').height*0.1875
      visable.setValue(-1)
      Animated.timing(x, {
        toValue:Dimensions.get('window').width/2-des_w/2,
        delay:0,
        duration: 200,
        useNativeDriver: false
      }).start();
      Animated.timing(y, {
        toValue:Dimensions.get('window').height/2-des_h/2,
        delay:0,
        duration: 200,
        useNativeDriver: false
      }).start();
      Animated.timing(width, {
        toValue: des_w,
        delay:0,
        duration: 200,
        useNativeDriver: false
      }).start();
      Animated.timing(height, {
        toValue: des_h,
        delay:0,
        duration: 100,
        useNativeDriver: false
      }).start();
      Animated.timing(visable, {
        toValue: 1,
        delay:0,
        duration: 1,
        useNativeDriver: false
      }).start();
    
  }

  const close_text_input = () => {
    Animated.timing(x, {
      toValue:Dimensions.get('window').width/2,
      delay:0,
      duration: 200,
      useNativeDriver: false
    }).start();
    Animated.timing(y, {
      toValue:Dimensions.get('window').height/2,
      delay:0,
      duration: 200,
      useNativeDriver: false
    }).start();
    Animated.timing(width, {
      toValue: 0,
      delay:0,
      duration: 200,
      useNativeDriver: false
    }).start();
    Animated.timing(height, {
      toValue: 0,
      delay:0,
      duration: 100,
      useNativeDriver: false
    }).start();
    Animated.timing(visable, {
      toValue: -1,
      delay:200,
      duration: 1,
      useNativeDriver: false
    }).start();
 

  }
  const change_group_profile = (text) => {/*ik it doesnt work i have ran out of time 😔*/}
  
  const renderItem = ({ item }) => {  
    return (
    <TouchableHighlight  key={item.key}  onPress={() => pressHandler()} underlayColor= {mode.chat_info_member_item_underlayColor}>     
      <View style={[styles.item_view,{backgroundColor: mode.chat_info_member_item_backgroundcolor,}]} >
        <TouchableHighlight key={item.key} onPress={() => pressHandler()} style={styles.item_button } underlayColor= {mode.chat_selection_item_image_underlayColor}>          
          <Image  style={styles.item_image } source={{uri: 'https://images2.imgbox.com/b6/06/h47AfDRZ_o.png'}} />
        </TouchableHighlight>
        <View>
          <Text style={[styles.item_text,{color: mode.chat_info_member_item_text_color,}]}>  {item.name}</Text>   
        </View>
      </View>
    </TouchableHighlight>
    );
  }
  
  return (
    <View style={{flex: 1, backgroundColor: mode.chat_info_backgroundcolor,}}>
      <View style={{flex: 1, backgroundColor: mode.chat_info_backgroundcolor,}}>
        <StatusBar animated={true} backgroundColor = {mode.StatusBar_backgroundcolor} barStyle={'light-content'} />
        <View style={[{ backgroundColor: mode.header_backgroundcolor},styles.top_bar]}>
          <TouchableHighlight onPress={() => go_back()} style={styles.back_button}  underlayColor= {mode.chat_back_button_underlayColor}>
            <Ionicons name="arrow-back-outline" size={25} style={{top:8,color:mode.chat_room_back_button} }  />
          </TouchableHighlight>   
        </View>
        <TouchableHighlight onPress={() => open_text_input()}  underlayColor= {mode.edit_group_image_underlayColor}>
          <Image style={{width:'100%',height:250}} source={{uri:route.params.group.c_img}} />
        </TouchableHighlight>
        <FlatList data={initialElements} renderItem={renderItem} />
      </View>

      <AnimatedTouchable  onPress={() => close_text_input()} style={[{zIndex:visable},styles.color_picker_overlay]} underlayColor= {'rgba(0, 0, 0, 0.9)'}>
        <Animated.View style={[{zIndex:visable,width:width, height:height, top:y ,left:x},styles.popup_container]}>
          <Text  style={styles.popup_text}>add image`s uri:</Text>
          <TextInput ronChangeText ={ (text) => set_new_uri(text)} onSubmitEditing={(text) => change_group_profile(text)}style={styles.popup_textinput}  ></TextInput>
        </Animated.View>
      </AnimatedTouchable>
    </View>
  );
}
