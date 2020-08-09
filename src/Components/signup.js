/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Image, Button, Alert, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



function Signup({ navigation }) {

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSignUp = () => {
        if (name.length <= 0) {
            setErrorMsg('Enter name to proceed');
        } else if (userName.length <= 0) {
            setErrorMsg('Enter Email to proceed');
        } else if (password.length <= 0) {
            setErrorMsg('Enter name to proceed');
        } else if (password !== retypePass) {
            setErrorMsg("Password doesn't match! ");
        } else {

            auth().createUserWithEmailAndPassword(userName, password).then(res => {
                res.user.updateProfile({ displayName: name.toString() });
                firestore().collection('Users').doc(res.user.uid).set({ uid: res.user.uid, Name: name }).then(() => {
                    Alert.alert(userName + ' ' + 'signed up successfully');
                    navigation.navigate('Home');
                }
                );
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMsg('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    setErrorMsg('That email address is invalid!');
                }
            });

        }


    };


    return (
        <ScrollView  >
            <View style={styles.container}>
                <View style={{ paddingTop: '10%' }}>
                    <Image source={require('../../Assets/LOGO.png')} />
                </View>
            </View>

            <View style={styles.textContainer}>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.userName} placeholder="Your Name" val={name} onChangeText={(val) => setName(val)} />
                    <TextInput style={styles.userName} placeholder="User Name" val={userName} onChangeText={(val) => setUserName(val)} autoCapitalize="none" autoCorrect={false} />
                    <TextInput style={styles.password} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(val) => setPassword(val)} autoCapitalize="none" autoCorrect={false} />
                    <TextInput style={styles.Repassword} placeholder="Re enter Password" secureTextEntry={true} onChangeText={(val) => setRetypePass(val)} autoCapitalize="none" autoCorrect={false} />
                    <Text style={styles.errorMsg}>{errorMsg}</Text>
                </View>

            </View>
            <View style={styles.log}><Button title="SignUp" onPress={() => onSignUp()} /></View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',

    },
    userName: {
        alignItems: 'center',
        borderRadius: 20,
        height: 50,
        width: '85%',
        borderWidth: 1,
        fontSize: 14,
        marginBottom: 5,
        paddingLeft: '32%',


    },
    password: {
        height: 50,
        width: '85%',
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 14,
        marginBottom: 5,
        alignItems: 'center',
        paddingLeft: '32%',
    },
    Repassword: {

        height: 50,
        width: '85%',
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 14,
        marginBottom: 5,
        alignItems: 'center',
        paddingLeft: '25%',
    },

    log: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingRight: 40,

    },
    log1: {
        paddingTop: 10,
        marginLeft: '20%',

    },
    errorMsg: {
        color: 'red',
    },


});

export default Signup;
