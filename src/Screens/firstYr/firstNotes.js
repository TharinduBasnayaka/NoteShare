/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet, ScrollView, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Item, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


export default class FirstNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docArray: [],
            isLoading: true,

        };
    }

    //getting firestore data and set it to array
    componentDidMount() {


        firestore().collection('First_subject').get().then(querySnapShot => {
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
                    const task = storage().ref(`firstSubjectdoc/${res.name}`).putFile(res.uri);
                    task.on('state_changed', taskSnapshot => {
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });

                    task.then(async () => {
                        console.log('Document uploaded to the bucket!');
                        const downURl = await storage().ref('firstSubjectdoc').child(`${res.name}`).getDownloadURL();
                        firestore()
                            .collection('First_subject')
                            .doc(res.name)
                            .set({ downURL: downURl, name: res.name })
                            .then(() =>
                                Alert.alert(res.name + ' Added'),
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
            <View>

                <LinearGradient colors={['#152DDE', '#296AE3', '#09A8F3']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => item.downURL}><Text style={styles.buttonText}>{item.name}</Text></TouchableOpacity>
                </LinearGradient>
            </View>
        );
    }
    render() {



        console.log(this.state.docArray);


        return (
            this.state.isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#2003fc' />

                </View>
                :
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.docArray}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.key.toString()}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.uploadbtn}>
                        <Button title="Upload Document" onPress={() => this.Document_Upload()} />
                    </View>
                    {/* <TouchableOpacity onPress={() => this.Document_Upload()} style={styles.uploadbtn}>
                        <Text>Upload</Text>
                    </TouchableOpacity> */}

                </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    uploadbtn: {


        width: '80%',
        borderRadius: 30,
        backgroundColor: '#2f91fa',
        color: '#ffffff',
        marginBottom: '5%',

    },
    linearGradient: {

        borderRadius: 20,
        width: '100%',
        marginTop: '3%',
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },


});
