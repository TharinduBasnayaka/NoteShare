/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Welcome from './Components/welcome';
import Login from './Components/login';
import Signup from './Components/signup';
import Home from './Components/home';
import FirstYr from './Screens/firstYr';
import SecondYr from './Screens/secondyr';
import ThirdYr from './Screens/thirdYr';
import Loading from './Components/loading';

const Stack = createStackNavigator();


const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Loading" component={Loading} /> */}
        <Stack.Screen name="LOGIN" component={Login} options={{ headerTintColor: '#09b399' }} />
        <Stack.Screen name="SIGN UP" component={Signup} options={{ headerTintColor: '#09b399' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'HOME', headerTintColor: '#09b399' }} />
        <Stack.Screen name="FirstYr" component={FirstYr} options={{ title: 'First Year Learning Materials', headerTintColor: '#09b399' }} />
        <Stack.Screen name="SecondYr" component={SecondYr} options={{ title: 'Second Year Learning Materials', headerTintColor: '#09b399' }} />
        <Stack.Screen name="ThirdYr" component={ThirdYr} options={{ title: 'Third Year Learning Materials', headerTintColor: '#09b399' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
