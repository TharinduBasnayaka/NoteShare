/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class Thirdpp extends Component {

    constructor() {
        super();
        this.state = {
            docArray: [],
            isLoading: true,

        };
    }

    //getting firestore data and set it to array
    componentDidMount() {
        firestore().collection('Third_pp').get().then(querySnapShot => {
            let docs = [];
            querySnapShot
                .forEach(documentSnapShot => {
                    docs.push({
                        ...documentSnapShot.data(),
                        key: Math.random(),
                    });
                    // console.log(doc);
                    this.setState({ docArray: docs });
                    this.setState({ isLoading: false });
                });


        }).catch(error => {
            console.log(error);
        });


    }


    Document_Upload = async () => {

        setTimeout(async () => {
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                });


                setTimeout(() => {
                    const task = storage().ref(`thirdpp/${res.name}`).putFile(res.uri);
                    task.on('state_changed', taskSnapshot => {
                        Alert.alert(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

                    });

                    task.then(async () => {
                        console.log('Document uploaded to the bucket!');
                        const downURl = await storage().ref('thirdpp').child(`${res.name}`).getDownloadURL();
                        firestore()
                            .collection('Third_pp')
                            .doc(res.name)
                            .set({ downURL: downURl, name: res.name })
                            .then(() =>
                                Alert.alert(res.name + ' Added'),
                                Alert.alert('Refresh to view newly added document'),
                                this.setState({ isLoading: true }),
                                setTimeout(() => {
                                    this.setState({ isLoading: false });
                                }, 3000)

                            );
                    });



                }, 3000);
            }
            catch (error) {
                if (DocumentPicker.isCancel(error)) {
                    Alert.alert('Canceled');
                } else {
                    console.log('unknown error' + error);
                }
            }

        }, 3000);
    }

    renderItem = ({ item }) => {
        console.log(item.downURL);
        return (

            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={require('../../../Assets/pdf.png')} style={styles.imgStyle} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {



        console.log(this.state.docArray);


        return (
            this.state.isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#2003fc" />

                </View>
                :
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.docArray}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.key.toString()}
                        showsVerticalScrollIndicator={false}
                        refreshing={true}
                    />

                    <View style={styles.uploadbtn}>
                        <Button title="Upload Document" onPress={() => this.Document_Upload()} />
                    </View>


                </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',




    },
    uploadbtn: {


        width: '80%',
        borderRadius: 30,
        backgroundColor: '#2f91fa',
        color: '#ffffff',
        marginBottom: '5%',
        marginLeft: '10%',

    },

    imgStyle: {
        width: 70,
        height: 70,
        margin: 5,
    },


});
