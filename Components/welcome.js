
/* eslint-disable prettier/prettier */



import React from 'react';
import { View, StyleSheet, Image, Alert, Text, TouchableOpacity, Button } from 'react-native';


const welcome = () => {
    return (
        <View >
            <View style={styles.Logo}>
                <Image source={require('../Assets/LOGO.png')} />
            </View>
            {/* <TouchableOpacity >
                <Text style={styles.start}>Get Started</Text>
            </TouchableOpacity> */}
            <View style={styles.start}>
                <Button title="Get Started" onPress={() => Alert.alert("Start Button Pressed")} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({

    Logo: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 100,
    },
    start: {

        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingLeft: 40,
        paddingRight: 40,
        color: '#197591',
        borderRadius: 20,

    }



});

// eslint-disable-next-line eol-last
export default welcome;