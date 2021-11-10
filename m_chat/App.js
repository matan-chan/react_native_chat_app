import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chat_selection from './screens/Chat_selection.js';
import Chat_room from './screens/Chat_room.js';
import Chat_info from './screens/Chat_info';
import Settings from './screens/Settings.js';
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function App() {
  const mainStack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [ColorsLoaded, setColorsLoaded] = useState(false);
  const [mode, setMode] = useState({});

  const load_colors = async() => {
    var value = JSON.parse(await AsyncStorage.getItem('settings'))
    if(value.mode=='dark') setMode(value.dark_theme)
    else if(value.mode=='light') setMode(value.light_theme)
    else if(value.mode=='custom') setMode(value.custom_theme)
  }

  const mainStackScreen = () => (
    <mainStack.Navigator  screenOptions={{headerTitleAlign: 'center', 
    headerStyle: { backgroundColor: mode.chat_selection_header ,height:80, },headerTitleStyle: {  },}} >
      <mainStack.Screen name="chat_selection" component={Chat_selection} options={{ headerShown: false,gestureEnabled: true, }} />
      <mainStack.Screen name="chat_room" component={Chat_room}  options={{ headerShown: false,gestureEnabled: true }}/>
      <mainStack.Screen name="chat_info" component={Chat_info}  options={{ headerShown: false,gestureEnabled: true }}/>
    </mainStack.Navigator>
  );

  if (ColorsLoaded) {
    return (
      <NavigationContainer>
      <Drawer.Navigator  initialRouteName="mainStack"   screenOptions={{headerTitleAlign: 'left', drawerStyle: { backgroundColor: mode.menu_backcolor, width: 200}, headerStyle: { backgroundColor: mode.chat_selection_header ,height:80,},}}>
        <Drawer.Screen name="chat selection" component={mainStackScreen} options={{ headerShown: false,gestureEnabled: true,drawerActiveTintColor:mode.menu_button_1_backcolor,drawerInactiveTintColor:mode.menu_button_1_text_color }}/>
        <Drawer.Screen name="settings" component={Settings} options={{ headerShown: false,gestureEnabled: true,drawerActiveTintColor:mode.menu_button_2_backcolor,drawerInactiveTintColor:mode.menu_button_2_text_color }}/>
      </Drawer.Navigator>
  </NavigationContainer>
    );
  } else {
    return (
          <AppLoading 
          startAsync={load_colors} 
          onFinish={() => setColorsLoaded(true)} 
          onError={(err) => console.log(err)}
        />
    );
  }
}
