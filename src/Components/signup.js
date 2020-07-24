/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Image, Button, Alert, Text, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function Signup({ navigation }) {

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [visible, setVisible] = useState(true);
    const Toast = ({ visible, message }) => {
        if (visible) {
            ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
            return null;
        }
        return null;
    };
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
                firestore().collection('Users').doc(res.user.uid).set({ uid: res.user.uid }).then(
                    navigation.pop()
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
        <ScrollView >
            <View style={styles.container}>
                <View style={{ paddingTop: '10%' }}>
                    <Image source={require('../../Assets/LOGO.png')} />
                </View>
            </View>
            <Toast style={{ backgroundColor: '#888888' }} visible={visible} message="We recommend you to use Google mail to sign Up" />
            <View style={styles.textContainer}>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.userName} placeholder="Your Name" onChangeText={() => setVisible(false)} />
                    <TextInput style={styles.userName} placeholder="User Name" />
                    <TextInput style={styles.password} placeholder="Password" secureTextEntry={true} />
                    <TextInput style={styles.Repassword} placeholder="Re enter Password" secureTextEntry={true} />
                </View>

            </View>
            <View style={styles.log}><Button title="SignUp" onPress={() => Alert.alert('signup button pressed')} /></View>
            <View style={styles.log}><Button title="SignUp using google account" onPress={() => Alert.alert('signup using google button pressed')} /></View>
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


});

export default Signup;
