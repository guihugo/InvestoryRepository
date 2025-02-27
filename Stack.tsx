import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import AppScreen from './Components/AppScreen';

export type RootStackParamList = {
  App: undefined;
  SignUp: undefined;
  LogIn: undefined;
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
        name="LogIn"
        component={LogIn}
        options={{ title: 'Log In',  headerShown: false  }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home',  headerShown: false  }}
      />
    </Stack.Navigator>
  );
}
