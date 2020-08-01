/* eslint-disable prettier/prettier */


// import React, { useState } from 'react';
// import { View, Text, Button, Pic } from 'react-native';
// import { utils } from '@react-native-firebase/app';
// import DocumentPicker from 'react-native-document-picker';
// import storage from '@react-native-firebase/storage';


// export default function FirstNotes() {
//     var RNFS = require('react-native-fs');

//     // const [Doc, SetDoc] = useState(null);
//     // const [isUploading, setIsUploading] = useState(true);


//     const docPicker = async () => {

//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.allFiles],

//             });

//             // const UploadDoc = storage().ref('firstSubjectdoc');

//             // let url = res.uri; //The url you received from the DocumentPicker
//             // var uploadUrl = UploadDoc;  // For testing purposes, go to http://requestb.in/ and create your own link
//             // create an array of objects of the files you want to upload
//             var files = [
//                 {
//                     name: res.name,
//                     filename: res.name,
//                     filepath: RNFS.DocumentDirectoryPath + res.name,
//                     filetype: res.type,
//                 },
//             ];

//             var uploadBegin = (response) => {
//                 var jobId = response.jobId;
//                 console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
//             };

//             var uploadProgress = (response) => {
//                 var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
//                 console.log('UPLOAD IS ' + percentage + '% DONE!');
//             };

//             // upload files
//             RNFS.uploadFiles({
//                 toUrl: 'https://console.firebase.google.com/u/0/project/noteshare-871b5/storage/noteshare-871b5.appspot.com/files~2FfirstSubjectdoc',
//                 files: files,
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                 },

//                 begin: uploadBegin,
//                 progress: uploadProgress,
//             }).promise.then((response) => {
//                 if (response.statusCode == 200) {
//                     console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
//                 } else {
//                     console.log('SERVER ERROR');
//                 }
//             })
//                 .catch((err) => {
//                     if (err.description === 'cancelled') {
//                         // cancelled by user
//                     }
//                     console.log(err);
//                 });




//         } catch{ }
//     };
//     setTimeout(() => docPicker, 3000);
//     return (
//         <View>
//             <Button title="Upload pdf" style={{ width: '20%', borderRadius: '20' }}
//                 onPress={() => docPicker()} />
//         </View>
//     );
// }

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import FileUploader from 'react-firebase-file-uploader';
import storage from '@react-native-firebase/storage';

export default function FirstNotes() {
    const [isUploading, setIsUploading] = useState(true);
    return (
        <View>

        </View>
    )
}
