import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


export default function App() {
  function takePhoto (){
    console.log("lorem ipsum")
  }

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#e0edf7",
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});