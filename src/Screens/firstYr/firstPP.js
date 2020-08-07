/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet, Image, FlatList, ActivityIndicator, SafeAreaView, AppRegistry, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';


export default class Firstpp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docArray: [],
            isLoading: true,
            isDownloaded: false,
            permissionGranted: false,

        };
        this.docDownload = this.docDownload.bind(this);
        this.download_permission = this.download_permission.bind(this);
    }

    //getting firestore data and set it to array
    componentDidMount() {


        firestore().collection('First_pp').get().then(querySnapShot => {
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
                    const task = storage().ref(`firstpp/${res.name}`).putFile(res.uri);
                    task.on('state_changed', taskSnapshot => {
                        Alert.alert(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });

                    task.then(async () => {
                        console.log('Document uploaded to the bucket!');
                        const downURl = await storage().ref('firstpp').child(`${res.name}`).getDownloadURL();
                        firestore()
                            .collection('First_pp')
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
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => this.docDownload(item.downURL, item.name)}>
                <Image source={require('../../../Assets/pdf.png')} style={styles.imgStyle} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    download_permission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'File Access Permission',
                    message: 'NoteShare want to access files to download document',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                    buttonNeutral: 'Ask me later',
                },

            );
            return granted;

        } catch (error) {
            console.log(error);
            Alert.alert('ERROR');

        }

    }

    docDownload = async (docUrl, name) => {
        let Permission = this.download_permission();

        if (Permission === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({ permissionGranted: true });
        }

        RNFS.downloadFile({
            fromUrl: docUrl,
            toFile: `${RNFS.ExternalStorageDirectoryPath}/Download/${name}`,
        }).promise.then((res) => {
            this.setState({ isDownloaded: true });
            if (this.state.isDownloaded === true) {

                console.log('downloaded successfully to' + `${RNFS.ExternalStorageDirectoryPath}/${name}`);
                Alert.alert('File downloaded successfully to' + `${RNFS.ExternalStorageDirectoryPath}/${name}`);
            }
        });
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
                    />

                    <View style={styles.uploadbtn}>
                        <Button title="Upload Document" onPress={() => this.Document_Upload()} />
                    </View>


                </SafeAreaView>
        );
    }
}
AppRegistry.registerComponent('Firstpp', () => Firstpp);
const styles = StyleSheet.create({
    container: {
        flex: 1,



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
