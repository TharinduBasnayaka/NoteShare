/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


export default class FirstNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            singleFileOBJ: '',
        };
    }

    Document_Upload = async () => {

        setTimeout(async () => {
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                });
                this.setState({ singleFileOBJ: res });
                // console.log(res.name);
                // console.log(res.type);
                // console.log(res.uri);



                setTimeout(() => {
                    const task = storage().ref(`firstSubjectdoc/${res.name}`).putFile(res.uri);
                    task.on('state_changed', taskSnapshot => {
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });

                    task.then(async () => {
                        console.log('Document uploaded to the bucket!');
                        const downURl = await storage().ref('firstSubjectdoc').child(`${res.name}`).getDownloadURL();
                        firestore().collection('First_subject').doc(res.name).set({ downURL: downURl, name: res.name }).then(() => console.log('doc url added'));
                    });



                }, 3000);








            }
            catch (error) {
                if (DocumentPicker.isCancel(error)) {
                    Alert.alert('Canceled');
                } else {
                    console.log("unknown error" + error);
                }
            }

        }, 3000);
    }

    render() {
        return (
            <View>
                <Button title="Upload Documnet" onPress={() => this.Document_Upload()} />
            </View>
        )
    }
}
