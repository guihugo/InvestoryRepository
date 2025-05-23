import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Components/SignUp';
import RecoveryPassword from './Components/RecoveryPassword';
import Home from './Components/Home';
import AppScreen from './Components/AppScreen';

export type RootStackParamList = {
  App: undefined;
  SignUp: undefined;
  RecoveryPassword: undefined;
  Home: {userData: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen
        name="App"
        component={AppScreen}
        options={{ title: 'Welcome', headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'Sign Up',  headerShown: false }}
      />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={{ title: 'Recovery Password',  headerShown: false  }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home',  headerShown: false  }}
      />
    </Stack.Navigator>
  );
}
