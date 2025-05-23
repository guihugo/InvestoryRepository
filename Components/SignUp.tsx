import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useSignUpController from '../Controller/SignUpController';
import { useCustomerController } from '../Controller/CustomerController';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Stack';

type AppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUp() {
  const navigation = useNavigation<AppScreenNavigationProp>();

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    loading: registering,
    error: registerError,
  } = useSignUpController();

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleCreateCustomer,
    loading: creatingCustomer,
    error: customerError,
  } = useCustomerController();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back-arrow.png')} style={styles.imageBack} />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.title}>Create your Account </Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {registerError && <Text style={styles.errorText}>{registerError}</Text>}
        {customerError && <Text style={styles.errorText}>{customerError}</Text>}

        <TouchableOpacity
          style={[styles.button, (registering || creatingCustomer) && styles.disabledButton]}
          onPress={() => handleRegister(firstName, lastName)}
          disabled={registering || creatingCustomer}
        >
          {registering || creatingCustomer ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(60, 119, 174)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  topContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 110,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  imageBack: {
    width: 30,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    height: 45,
    width: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  signUpContainer: {
    width: '80%',
    alignItems: 'center',
  },
  buttonBack: {
    height: 45,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
