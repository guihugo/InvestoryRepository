import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useLogInController from '../Controller/LogInController';

export default function LogIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogIn,
  } = useLogInController();


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log In</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(57, 120, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 40,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 20,
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'rgb(57, 120, 255)',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 15,
  },
});
