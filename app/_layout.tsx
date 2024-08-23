import { Stack } from "expo-router";
import 'react-native-gesture-handler'
import drawer, { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const DrawerLayout = () => {
  return <GestureHandlerRootView style={{flex: 1, backgroundColor: 'blue'}}>
    <Drawer>
      <Drawer.Screen name="index" options={{
        drawerLabel: "Camera",
        headerTitle: "Camera",
        drawerIcon: ({size, color}) => (
          <Ionicons name="camera-outline" size={size} color={color}/>
        ),
        }}/>
        <Drawer.Screen name="photos" options={{
        drawerLabel: "Photos",
        headerTitle: "Photos",
        drawerIcon: ({size, color}) => (
          <Ionicons name="library-outline" size={size} color={color}/>
        ),
        }}/>
        <Drawer.Screen name="search" options={{
        drawerLabel: "Search",
        headerTitle: "Search",
        drawerIcon: ({size, color}) => (
          <Ionicons name="search-outline" size={size} color={color}/>
        ),
        }}/>
        <Drawer.Screen name="credits" options={{
        drawerLabel: "Credits",
        headerTitle: "Credits",
        drawerIcon: ({size, color}) => (
          <Ionicons name="add-circle-outline" size={size} color={color}/>
        ),
        }}/>
    </Drawer>
  </GestureHandlerRootView>
}

const styles = StyleSheet.create({
  drawerImage: {
    height: 100,
    width: 200,
    borderRadius: 50,
  },
})

export default DrawerLayout