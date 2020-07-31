
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
//import { Provider } from 'react-redux';
import auth from '@react-native-firebase/auth';
//import AuthContext from './src/Context/authContext';
//import Firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '636145459355-b6k284ro1qb743icot8k0rnplu0i7t05.apps.googleusercontent.com',
});

//Screens and components of the app
import Login from './src/Components/login';
import Signup from './src/Components/signup';
import Home from './src/Components/home';
//first yr------------------------------------------------
import FirstYr from './src/Screens/firstYr/firstYr';
import Fnotes from './src/Screens/firstYr/firstNotes';
import Fpp from './src/Screens/firstYr/firstPP';
import Fqa from './src/Screens/firstYr/firstQA';
//second yr-------------------------------------------------------
import SecondYr from './src/Screens/secondYr/secondyr';
import Snotes from './src/Screens/secondYr/secondNotes';
import Spp from './src/Screens/secondYr/secondPP';
import Sqa from './src/Screens/secondYr/secondQA';

//third yr-------------------------------------------------------------
import ThirdYr from './src/Screens/thirdYr/thirdYr';
import Tqa from './src/Screens/thirdYr/thirdQA';
import Tnotes from './src/Screens/thirdYr/thirdNotes';
import Tpp from './src/Screens/thirdYr/thirdPP';
//--------------------------------------------------------------------






const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(User) {
    setUser(User);
    console.log(User);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return null;

  const userSignOut = () => {
    auth().signOut().then(() => {
      Alert.alert(user.displayName + ' ' + 'signed Out');
      setUser(null);
    });
  };

  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();

  const HomeStackScreens = () => (
    < HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={Home} options={{ title: 'HOME', headerRight: () => (<Button style={styles.signoutbtn} title="signout" onPress={() => userSignOut()} />), headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="FirstYr" component={FirstYr} options={{ title: '1st Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Fnotes" component={Fnotes} options={{ title: '1st Year Notes', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Fpp" component={Fpp} options={{ title: '1st Year Past Papers', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Fqa" component={Fqa} options={{ title: "Q & A's", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="SecondYr" component={SecondYr} options={{ title: '2nd Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Snotes" component={Snotes} options={{ title: '2nd Year Notes', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Spp" component={Spp} options={{ title: '2nd Year Past Papers', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Sqa" component={Sqa} options={{ title: "Q & A's", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="ThirdYr" component={ThirdYr} options={{ title: '3rd Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Tnotes" component={Tnotes} options={{ title: '3rd Year Notes', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Tpp" component={Tpp} options={{ title: '3rd Year Past Papers', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="Tqa" component={Tqa} options={{ title: "Q & A's", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
    </ HomeStack.Navigator >
  );

  const AuthStackScreens = () => (
    <AuthStack.Navigator>
      <AuthStack.Screen name="LOGIN" component={Login} options={{ headerShown: false, headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <AuthStack.Screen name="SIGN UP" component={Signup} options={{ headerShown: false, headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
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
    paddingRight: '0.3%',
  },
}
);

export default App;
