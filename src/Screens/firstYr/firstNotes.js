/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button } from 'react-native';
import { utils } from '@react-native-firebase/app';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

export default function firstNotes() {


    const docPicker = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],

            });
            const reference = storage().ref('UserImages');
            const task = reference.putFile(res.uri);

            console.log(
                res.uri,
                // res.type, // mime type
                res.name,
                //res.size
            );

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }

    }
    return (
        <View>
            <Button title="Upload pdf"
                onPress={() => docPicker()} />
        </View>
    )
}
