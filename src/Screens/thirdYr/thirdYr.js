/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ThirdYr({ navigation }) {
    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.Logo}>
                    <Image source={require('../../../Assets/LOGO.png')} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.buttonText1}> Select Your Materials</Text>

                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tnotes')}><Text style={styles.buttonText}>Notes</Text></TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tpp')}><Text style={styles.buttonText}>Past Papers</Text></TouchableOpacity>
                </LinearGradient>

                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tqa')}><Text style={styles.buttonText}>Q & A's</Text></TouchableOpacity>
                </LinearGradient>
            </View>
        </ScrollView>
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
    footter: {
        marginTop: '15%',
    }

});

export default ThirdYr;
