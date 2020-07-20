/* eslint-disable prettier/prettier */



import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, ScrollView, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';



function Login({ navigation }) {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const onLogin = () => {
        Alert.alert(userName, password);
        firebase.auth().signInWithEmailAndPassword(userName, password).then(
            (user) => {
                Alert.alert(user + 'signed in');
                if (user = !null) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert("you're not logged in");
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    };

    // const signout = () => {
    //     firebase.auth().signOut().then(
    //         (user) => { Alert.alert(user + 'signed out'); }
    //     );
    // };

    return (
        <ScrollView>
            <View style={styles.Logo}>
                <Image source={require('../Assets/LOGO.png')} />
            </View>
            <View style={styles.textContainer}>
                <TextInput style={styles.userName} placeholder="User Name" autoCapitalize="none" autoCorrect={false} value={userName} onChangeText={text => setUsername(text)} />
                <TextInput style={styles.password} placeholder="Password" autoCapitalize="none" autoCorrect={false} value={password} onChangeText={text => setPassword(text)} />
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
    }
});

export default Login;

