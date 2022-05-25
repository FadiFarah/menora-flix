import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Endpoint from '../constants/endpoints';
import { setIsUserAuthenticated } from '../redux/slices/userAuthenticationSlice';


export default function UserAuthenticationScreen() {
    const userAuthentication: boolean = useSelector((state: any)=>state.reducerUserAuthenticationSlice.value);
    const dispatch = useDispatch();
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [isFirstTime, setIsFirstTime] = useState(true);

    const handleLoginClick = () => {
        axios.post(Endpoint.authenticateUserEndpoint, {userName: usernameInput, password: passwordInput})
            .then((response) => {
                if(response.data.status === "error") {
                    setServerErrorMessage(response.data.error);
                }
                else {
                    setServerErrorMessage("");
                    
                    AsyncStorage.setItem("auth", response.data.data)
                        .then((response) => {
                            dispatch(setIsUserAuthenticated(true));
                        })
                        .catch((error) => {
                            console.log(error);
                        })

                    AsyncStorage.setItem("isFirstTime", "false")
                        .then((response) => {})
                        .catch((error) => {});
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const usernameValidator = () => {
        const userNameRegex = new RegExp('[a-zA-Z]{8,}', 'gm').test(usernameInput);
        if(userNameRegex) {
            setUsernameErrorMessage("");
        }
        else {
            setUsernameErrorMessage("User name should be a atleast 8 characters with no numbers included");
        }
    }

    const passwordValidator = () => {
        const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$', 'gm').test(passwordInput);
        if(passwordRegex) {
            setPasswordErrorMessage("");
        }
        else {
            if(passwordInput.length < 6) {
                setPasswordErrorMessage("Password should be a minimum of six characters");
            }
            else {
                setPasswordErrorMessage("Password should contain at least one uppercase letter, one lowercase letter, one number and one special character");
            }
        }
    }

    useEffect(() => {
        AsyncStorage.getItem("isFirstTime")
            .then((result) => {
                if(result) {
                    setIsFirstTime(false);
                }
            })
    })

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Menora Flix</Text>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>{isFirstTime ? 'Sign in' : 'Login'}</Text>
                <TextInput onBlur={usernameValidator} value={usernameInput} onChangeText={(txt) => setUsernameInput(txt)} style={styles.loginInput} placeholder='username' placeholderTextColor={'#6a6a6a'} keyboardType='default'></TextInput>
                {usernameErrorMessage.length > 0 && <Text style={styles.validationErrorMessage}>{usernameErrorMessage}</Text>}
                <TextInput onBlur={passwordValidator} value={passwordInput} onChangeText={(txt) => setPasswordInput(txt)} secureTextEntry={true} style={styles.loginInput} placeholder='password' placeholderTextColor={'#6a6a6a'} keyboardType='default'></TextInput>
                {passwordErrorMessage.length > 0 && <Text style={styles.validationErrorMessage}>{passwordErrorMessage}</Text>}
            </View>
            <TouchableOpacity onPress={handleLoginClick} style={styles.button}>
                <Text style={styles.buttonText}>{isFirstTime ? 'Sign in' : 'Login'}</Text>
            </TouchableOpacity>
            <Text style={styles.serverErrorMessage}>{serverErrorMessage}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    padding: 30
  },
  titleContainer: {
    marginTop: 100
  },
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    color: 'red'
  },
  loginContainer: {
    display: 'flex',
    alignContent: 'space-around',
    marginTop: 50,
    width: '100%'
  },
  loginTitle: {
    color: 'white',
    fontSize: 40,
    marginBottom: 10
  },
  loginInput: {
    backgroundColor: '#515151',
    color: 'white',
    height: 70,
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 50
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    padding: 15,
    fontSize: 20
  },
  validationErrorMessage: {
      color: 'red'
  },
  serverErrorMessage: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
      width: '90%'
  }
});
