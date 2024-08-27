import { Text, View, TouchableOpacity, Button, StyleSheet, ImageBackground, Linking } from "react-native";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TextInput } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store'; // Import SecureStore

export default function App() {
  const [usernameSignupText, setUsernameSignupText] = useState('')
  const [passwordSignupText, setPasswordSignupText] = useState('')
  //const [emailText, setEmailText] = useState('')

  const [usernameText, setUsernameText] = useState('')
  const [passwordText, setPasswordText] = useState('')

  const [signupButtonText, setSignupButtonText] = useState('Sign up')
  const [loginButtonText, setLoginButtonText] = useState('Login')


  // Replace with your actual Discord invite link
 const discordHandlePress = () => {
  const discordInviteLink = 'https://discord.gg/FJDZxpYm7D';
  Linking.openURL(discordInviteLink).catch((err) => console.error('An error occurred', err));
 }

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


  const sendSignupInfoToServer = async () => {
    try {
      console.log("Sending username sign up: " + usernameSignupText)

      console.log("Sending password sign up: " + passwordSignupText)
      
      const response = await fetch('https://actual-cool-grubworm.ngrok-free.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': "skipepicly"
        },
        body: JSON.stringify({
          username: usernameSignupText,
          //email: emailText,
          password: passwordSignupText,
        })
      })

      const data = await response.json();

      setSignupButtonText(data.message)

      // Set the response from the server
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const sendLoginInfoToServer = async () => {
    try {
      console.log("Sending username login: " + usernameText)

      console.log("Sending password login: " + passwordText)
      
      const response = await fetch('https://actual-cool-grubworm.ngrok-free.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': "skipepicly"
        },
        body: JSON.stringify({
          username: usernameText,
          password: passwordText,
        })
      })

      const data = await response.json();
      
      if (data.access_token){
        await SecureStore.setItemAsync('access_token', data.access_token); // Store JWT securely
      }

      setLoginButtonText(data.message)

      // Set the response from the server
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <ImageBackground source={require("../assets/images/account-background.jpg")} style={styles.imageBackground}>
      <View style={styles.overlay}>
        <View style={styles.viewone}>
          <Text style={styles.titletext}>Create an account</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            placeholderTextColor={'#ffffff'}
            onChangeText={text => setUsernameSignupText(text)}
          ></TextInput>
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            placeholderTextColor={'#ffffff'}
            onChangeText={text => setPasswordSignupText(text)}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={sendSignupInfoToServer}>
            <Text style={styles.buttonText}>{signupButtonText}</Text>
          </TouchableOpacity>
          <Text style={styles.titletexttwo}>Login</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            placeholderTextColor={'#ffffff'}
            onChangeText={text => setUsernameText(text)}
          ></TextInput>
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            placeholderTextColor={'#ffffff'}
            onChangeText={text => setPasswordText(text)}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={sendLoginInfoToServer}>
            <Text style={styles.buttonText}>{loginButtonText}</Text>
          </TouchableOpacity>
          <Text style={{color: "#ffffff", textAlign: "center", fontFamily: "LondonBetween"}} onPress={discordHandlePress}>Please join our Discord server to talk to like minded people!</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#dbe9f4",
  },
  viewone: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'LondonBetween',
    color: "#ffffff",
    fontSize: 20
  },
  textinput: {
    height: 40,
    color: "#ffffff",
    marginTop: 35,
    borderColor: "#ffffff",
    borderWidth: 2,
    width: 160,
    borderRadius: 15,
    textAlign: "center",
  },
  titletext: {
    color: '#ffffff',
    fontFamily: 'LondonBetween',
    fontSize: 30,
    marginTop: 40,
  },
  titletexttwo: {
    color: '#ffffff',
    fontFamily: 'LondonBetween',
    fontSize: 30,
    marginTop: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // or 'contain', 'stretch', etc.
    justifyContent: 'center', // Align overlay vertically
    alignItems: 'center',     // Align overlay horizontally
  },
  overlay: {
    width: 300,
    height: 700,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
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
    borderColor: "#ffffff",
    height: 40,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});