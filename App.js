
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import auth from '@react-native-firebase/auth';
import AuthContext from './src/Context/authContext';
import Firestore from '@react-native-firebase/firestore';


import Login from './src/Components/login';
import Signup from './src/Components/signup';
import Home from './src/Components/home';
import FirstYr from './src/Screens/firstYr';
import SecondYr from './src/Screens/secondyr';
import ThirdYr from './src/Screens/thirdYr';




const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return null;

  const userSignOut = () => {
    auth().signOut().then(() => setUser(null));
  };

  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();

  const HomeStackScreens = () => (
    < HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={Home} options={{ title: 'HOME', headerRight: () => (<Button title="signout" onPress={() => userSignOut()} />), headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="FirstYr" component={FirstYr} options={{ title: 'First Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="SecondYr" component={SecondYr} options={{ title: 'Second Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
      <HomeStack.Screen name="ThirdYr" component={ThirdYr} options={{ title: 'Third Year Learning Materials', headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#0a0063' } }} />
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
}
);

export default App;
