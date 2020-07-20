/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TextInput, ScrollView, StyleSheet, Image, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';


function signup() {
    // auth()
    //     .createUserWithEmailAndPassword('test1@gmail.com', '123456789')
    //     .then(() => {
    //         console.log('User account created & signed in!');
    //     })
    //     .catch(error => {
    //         if (error.code === 'auth/email-already-in-use') {
    //             console.log('That email address is already in use!');
    //         }

    //         if (error.code === 'auth/invalid-email') {
    //             console.log('That email address is invalid!');
    //         }

    //         console.error(error);
    //     });

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={{ paddingTop: '10%' }}>
                    <Image source={require('../Assets/LOGO.png')} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.userName} placeholder="Your Name" />
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

export default signup;
