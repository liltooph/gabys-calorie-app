import { Text, View, TouchableOpacity, Button, StyleSheet, Modal, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions, Camera, CameraMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import React, { useState, useEffect, useRef } from "react";
import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { NavigationRouteContext } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store'; // Import SecureStore

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = React.useRef<CameraView>(null)
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");

  const [photo, setPhoto] = useState("");
  const [photoData, setPhotoData] = useState("")

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("Please log in to upload photos!")

  const [response, setResponse] = useState(null);

  const [llamaResponse, setLlamaResponse] = useState("")

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const sendPhotoToServer = async () => {
    try {
      console.log("Photo Location: " + photo)
      const token = await SecureStore.getItemAsync('access_token')

      const response = await fetch('https://actual-cool-grubworm.ngrok-free.app/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': "skipepicly",
        },
        body: JSON.stringify({
          image: photoData,
        })
      });

      const data = await response.json();
      
      const credits = data.credits

      const predictions = Array.isArray(data.predictions) ? data.predictions : [];

      const orderedData = predictions.map((item: { class: any; }) => item.class).join(", ")
      setLlamaResponse(data.ollama_response?.response || "No response provided by Ollama.");

      console.log("data: " + data + " orderedData: " + orderedData)
      console.log("credits: " + credits)

      setModalText("Credits: " + credits)

      setResponse(orderedData); // Set the response from the server
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const checkCredits = async () => {
    try {
        const token = await SecureStore.getItemAsync('access_token')

        const response = await fetch('https://actual-cool-grubworm.ngrok-free.app/checkcredits', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': "skipepicly",
            },
        });

        const data = await response.json();

        if (response.ok) {
            setModalText("Credits: " + data.credits);
        } else {
            setModalText(data.error || 'Failed to fetch credits');
        }
      } catch(error){
        console.log(error)
      }
}

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({ base64: true });
        if (data?.uri != undefined) {
          setPhoto(data.uri);
          if (data.base64 != undefined) {
            setPhotoData(data.base64)
            console.log("photoData set!")
          } else {
            console.log("photoData not set something is wrong")
          }
          const isSecureToken = await SecureStore.getItemAsync("access_token")
          console.log("secure token: " + isSecureToken)
          if (isSecureToken){
            console.log("Secure token found")
            checkCredits()
          } else {
            console.log("Secure token NOT found")
          }
          setModalVisible(true)
        }
        console.log("Photo URI:", photo);
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} flash="off" facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{ uri: photo }} style={styles.imagePreview} />
            <Text>{response}</Text>
            <ScrollView style={styles.scrollView}><Text>{llamaResponse}</Text></ScrollView>
            <Text style={styles.modalText}>{modalText}</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={sendPhotoToServer}
            >
              <Text style={styles.textStyle}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e0edf7",
  },
  scrollView: {
    height: 200, // Adjust height to control the visible area
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Semi-transparent background
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
