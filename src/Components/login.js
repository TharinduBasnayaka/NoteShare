/* eslint-disable prettier/prettier */



import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, ScrollView, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';



function Login({ navigation }) {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    const onLogin = () => {
        if (userName.length <= 0) {
            setErrorMsg('Enter  your email');
        } else if (password.length <= 0) {
            setErrorMsg("Password field can't be empty");
        } else {
            firebase.auth().signInWithEmailAndPassword(userName, password).then(
                (user) => {
                    if (user != null) {
                        navigation.navigate('Home');
                    } else {
                        Alert.alert("you're not logged in");
                    }
                }
            ).catch(
                error => {
                    if (error.code === 'auth/invalid-email') {
                        setErrorMsg('That email address is invalid!');
                    } else if (error.code === 'auth/user-not-found') {
                        setErrorMsg('You are not registered. Signup now!');
                    } else if (error.code === 'auth/wrong-password') {
                        setErrorMsg('Invaid password');
                    }
                }
            );
        }

    };

    return (
        <ScrollView>
            <View style={styles.Logo}>
                <Image source={require('../../Assets/LOGO.png')} />
            </View>
            <View style={styles.textContainer}>
                <TextInput style={styles.userName} placeholder="User Name" autoCapitalize="none" autoCorrect={false} value={userName} onChangeText={text => setUsername(text)} />
                <TextInput style={styles.password} placeholder="Password" autoCapitalize="none" autoCorrect={false} secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <View style={styles.log}><Button title="Login" onPress={() => onLogin()} /></View>
            <TouchableOpacity style={styles.signupword} onPress={() => navigation.navigate('SIGN UP')} pressMagnification={2.0} >
                <Text>New Here?Sign Up instead</Text>
            </TouchableOpacity>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    Logo: {

        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        width: '100%',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {

        borderRadius: 20,
        paddingLeft: 100,
        margin: 5,
        height: 50,
        width: '80%',
        borderWidth: 1,
        fontSize: 14,

    },
    password: {
        height: 50,
        width: '80%',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 100,
        fontSize: 14,

    },
    log: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingRight: 40,

    },
    signupword: {
        paddingTop: 10,
        paddingLeft: '28%',
        color: '#0448bd',
        fontSize: 16,
    },
    errorMsg: {
        color: 'red',
    },
});

export default Login;

