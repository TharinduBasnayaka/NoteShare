/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';







function Profile({ route }) {
    let { uid } = route.params;
    let { displayName } = route.params;
    let { photoUrl } = route.params;
    let { email } = route.params;

    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState(displayName);
    const [errMsg, setErrMsg] = React.useState('');

    console.log(name);
    //console.log(uid);
    console.log(photoUrl);

    const changeProfile = async () => {
        setTimeout(async () => {
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.images],
                });
                setTimeout(() => {
                    const task = storage().ref(`UserImages/${uid}/${res.name}`).putFile(res.uri);
                    task.on('state_changed', taskSnapshot => {
                        Alert.alert(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });

                    task.then(async () => {
                        console.log('Image uploaded to the bucket!');
                        const photoURl = await storage().ref('UserImages').child(`${uid}/${res.name}`).getDownloadURL();

                        const update = {
                            photoURL: photoURl,
                        };
                        await auth().currentUser.updateProfile(update);

                        firestore()
                            .collection('Users')
                            .doc(uid)
                            .update({ photoURL: photoURl })
                            .then(() =>
                                Alert.alert('Profile image changed'),
                                Alert.alert('profile picure will change next time you login'),




                            );
                    });

                }, 1000);
            } catch (error) {
                console.log(error);
            }

        }, 1000);


    };

    const modelPopUp = () => {
        setVisible(true);
    };

    const changeName = async () => {
        if (name.length <= 0) {
            setErrMsg("Name can't be empty");
        } else {
            const update = {
                displayName: name,
            };
            await auth().currentUser.updateProfile(update);
            firestore()
                .collection('Users')
                .doc(uid)
                .update({ Name: name })
                .then(() =>
                    Alert.alert('Display Name changed'),
                    Alert.alert('Changed name will be displayed next time you login'),




                );


        }
        setVisible(false);
    };



    return (


        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ alignSelf: 'center' }}>

                    <View style={styles.profileImage}>
                        {photoUrl ?
                            <Image style={styles.image} source={{ uri: photoUrl }} />
                            :
                            <Image style={styles.image} source={require('../../Assets/profile_default.png')} />
                        }
                    </View>

                    <View style={styles.changeProfilepic} >
                        <TouchableOpacity style={{ fontSize: 14, alignSelf: 'center' }} onPress={() => changeProfile()}>
                            <Text style={{ color: '#e81022', fontSize: 14, fontWeight: 'bold' }}>Change profile picture</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.name}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#272729' }}>{displayName}</Text>
                    </View>
                    <Modal animationType="slide" transparent={true} visible={visible} >
                        <View style={styles.ModelView}>
                            <TextInput placeholder="Enter Name" value={name} onChangeText={(val) => setName(val)} />
                            <TouchableOpacity onPress={() => changeName()}>
                                <Text style={{ color: '#e81022', fontSize: 14, fontWeight: 'bold' }}>Change Name</Text>
                            </TouchableOpacity>
                            <Text style={styles.errorMsg}>{errMsg}</Text>
                        </View>
                    </Modal>
                    <View style={styles.changeProfilepic} >
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => modelPopUp()}>
                            <Text style={{ color: '#e81022', fontSize: 14, fontWeight: 'bold' }}>Change Display Name</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.name}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Email: {email}</Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    profileImage: {
        marginTop: 20,
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 2,
    },
    changeProfilepic: {
        //marginLeft: '8%',

    },
    name: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 18,
    },
    ModelView:
    {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    errorMsg: {
        color: 'red',
    },
}

);
export default Profile;
