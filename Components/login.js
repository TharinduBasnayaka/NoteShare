/* eslint-disable prettier/prettier */



import React from 'react';
import { View, TextInput, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';


function login() {

    const [data, setData] = React.useState({
        userName: '',
        password: '',
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };
    // const [initializing, setInitializing] = React.useState(true);
    // const [user, setUser] = React.useState();

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    }



    return (
        <ScrollView>
            <View style={styles.Logo}>
                <Image source={require('../Assets/LOGO.png')} />
            </View>
            <View style={styles.textContainer}>
                <TextInput style={styles.userName} placeholder="User Name" />
                <TextInput style={styles.password} placeholder="Password" />
            </View>
            <View style={styles.log}><Button title="Login" onPress={() => Alert.alert('Login button pressed')} /></View>
            <View style={styles.log}><Button title="SignUp" onPress={() => Alert.alert('signup button pressed')} /></View>

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
});

export default login;

