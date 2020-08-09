/* eslint-disable prettier/prettier */


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '636145459355-b6k284ro1qb743icot8k0rnplu0i7t05.apps.googleusercontent.com',
});

//Screens and components of the app
import Login from './src/Components/login';
import Signup from './src/Components/signup';
import Home from './src/Components/home';
import Profile from './src/Screens/profile';
//first yr------------------------------------------------
import FirstYr from './src/Screens/firstYr/firstYr';
import Fnotes from './src/Screens/firstYr/firstNotes';
import Fpp from './src/Screens/firstYr/firstPP';

//second yr-------------------------------------------------------
import SecondYr from './src/Screens/secondYr/secondyr';
import Snotes from './src/Screens/secondYr/secondNotes';
import Spp from './src/Screens/secondYr/secondPP';


//third yr-------------------------------------------------------------
import ThirdYr from './src/Screens/thirdYr/thirdYr';

import Tnotes from './src/Screens/thirdYr/thirdNotes';
import Tpp from './src/Screens/thirdYr/thirdPP';

//--------------------------------------------------------------------






const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  let uid;
  let displayName;
  let photoUrl;
  let email;





  useEffect(() => {
    function onAuthStateChanged(User) {
      setUser(User);
      console.log(user);
      if (initializing) setInitializing(false);
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //console.log(subscriber);
    return subscriber; // unsubscribe on unmount
  }, [user, initializing]);

  if (initializing) return null;

  const userSignOut = () => {
    auth().signOut().then(() => {
      Alert.alert(user.displayName + ' ' + 'signed Out');
      setUser(null);
    });
  };


  if (user != null) {
    let uid1 = user.uid;
    let displayName1 = user.displayName;
    let photoUrl1 = user.photoURL;
    let email1 = user.email;
    //console.log('url' + photoUrl1);
    displayName = displayName1;
    uid = uid1;
    photoUrl = photoUrl1;
    email = email1;
  }





  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();




  const HomeStackScreens = () => (
    < HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={Home} options={{ title: 'HOME', headerRight: () => (<Button style={styles.signoutbtn} title="signout" onPress={() => userSignOut()} />), headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="FirstYr" component={FirstYr} options={{ title: '1st Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Fnotes" component={Fnotes} options={{ title: '1st Year Notes', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Fpp" component={Fpp} options={{ title: '1st Year Past Papers', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />

      <HomeStack.Screen name="SecondYr" component={SecondYr} options={{ title: '2nd Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Snotes" component={Snotes} options={{ title: '2nd Year Notes', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Spp" component={Spp} options={{ title: '2nd Year Past Papers', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />

      <HomeStack.Screen name="ThirdYr" component={ThirdYr} options={{ title: '3rd Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Tnotes" component={Tnotes} options={{ title: '3rd Year Notes', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Tpp" component={Tpp} options={{ title: '3rd Year Past Papers', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />

      <HomeStack.Screen name="Profile" component={Profile} initialParams={{ uid, displayName, photoUrl, email }} options={{ title: 'Profile', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
    </ HomeStack.Navigator >
  );

  const AuthStackScreens = () => (
    <AuthStack.Navigator>
      <AuthStack.Screen name="LOGIN" component={Login} options={{ headerShown: false, headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <AuthStack.Screen name="SIGN UP" component={Signup} options={{ headerShown: false, headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      {/* <HomeStack.Screen name="Home" component={Home} options={{ title: 'HOME', headerRight: () => (<Button style={styles.signoutbtn} title="signout" onPress={() => userSignOut()} />), headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} /> */}
    </AuthStack.Navigator>
  );




  return (


    <NavigationContainer>
      <SafeAreaView style={styles.container} >

        {user ? <HomeStackScreens /> : <AuthStackScreens />}

      </SafeAreaView>
    </NavigationContainer >

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signoutbtn: {
    marginRight: '0.3%',
  },
}
);

export default App;
