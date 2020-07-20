// /* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import Login from './Components/login';
// import Home from './Components/home';


// function Loading() {
//     const [initializing, setInitializing] = useState(true);
//     const [user, setUser] = useState();
//     function onAuthStateChanged(user) {
//         setUser(user);
//         if (initializing) { setInitializing(false); }
//     }
//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber; // unsubscribe on unmount
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//     if (initializing) return null;
//     if (!user) {
//         return (
//             <View>
//                 <Login />
//             </View>

//         );
//     }

//     return (
//         <View>
//             <Home />
//         </View>

//     );
// }

// export default Loading;
