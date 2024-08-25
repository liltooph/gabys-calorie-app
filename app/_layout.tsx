import { Stack } from "expo-router";
import 'react-native-gesture-handler'
import drawer, { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { DarkTheme } from "@react-navigation/native";


const DrawerLayout = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    'LondonMM': require('../assets/fonts/LondonMM.ttf'),
    'LondonBetween': require('../assets/fonts/LondonBetween.ttf'),
    // Add more font variants as needed
  });
  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <GestureHandlerRootView onLayout={handleOnLayout} style={{ flex: 1 }}>
    <Drawer screenOptions={{
      drawerStyle: {
        backgroundColor: "#06038D",
      }, drawerLabelStyle: {
        color: "#ffffff",
        fontFamily: 'LondonBetween',
      }, headerTitleStyle: {
        fontFamily: 'LondonBetween',
        color: "#ffffff"
      }, headerStyle: {
        backgroundColor: "#04026f",
      }, headerTintColor: "#ffffff",
      drawerActiveTintColor: '#ff6347', // Color for active icons and text (Tomato color)
      drawerInactiveTintColor: '#ffffff',
    }}>
      <Drawer.Screen name="index" options={{
        drawerLabel: "Camera",
        headerTitle: "Camera",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="camera-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name="photos" options={{
        drawerLabel: "Photos",
        headerTitle: "Photos",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="library-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name="search" options={{
        drawerLabel: "Search",
        headerTitle: "Search",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="search-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name="credits" options={{
        drawerLabel: "Credits",
        headerTitle: "Credits",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="add-circle-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name="account" options={{
        drawerLabel: "Account",
        headerTitle: "Account",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }} />
    </Drawer>
  </GestureHandlerRootView>
}

const styles = StyleSheet.create({
  drawerImage: {
    height: 100,
    width: 200,
    borderRadius: 50,
  },
  darkMode: {
    backgroundColor: "#00000a",
    flex: 1,
  }
})

export default DrawerLayout