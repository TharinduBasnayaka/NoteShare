/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Screens/profile';





const Btab = createBottomTabNavigator();

export default function home({ navigation }) {

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.Logo}>
                    <Image source={require('../Assets/LOGO.png')} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.buttonText1}> Select Your Academic Year</Text>

                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('FirstYr')}><Text style={styles.buttonText}>1st Year</Text></TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('SecondYr')}><Text style={styles.buttonText}>2nd Year</Text></TouchableOpacity>
                </LinearGradient>

                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('ThirdYr')}><Text style={styles.buttonText}>3rd Year</Text></TouchableOpacity>
                </LinearGradient>

            </View>
            <View>
                <Btab.Navigator>
                    <Btab.Screen name="Profile" component={Profile} />
                    <Btab.Screen name="Home" component={home} />
                </Btab.Navigator>
            </View>

        </ScrollView >
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    bottomContainer: {


        justifyContent: 'center',
        alignItems: 'center',

    },
    Logo: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttons: {
        alignItems: 'center',
        width: '85%',
        marginTop: '3%',
        borderRadius: 20,
        fontSize: 30,
        height: '15%',
        padding: 20,

    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        width: '85%',
        marginTop: '3%',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    buttonText1: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#000000',
        backgroundColor: 'transparent',
    },


});
