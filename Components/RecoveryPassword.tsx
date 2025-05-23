import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useResetPasswordController from '../Controller/RecoverPasswordController';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Stack';
import { useNavigation } from '@react-navigation/native';

type AppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecoveryPassword'>;

export default function RecoveryPassword() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const {
    email,
    setEmail,
    handleReset,
  } = useResetPasswordController();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back-arrow.png')} style={styles.imageBack} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Reset your Password</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Recover</Text>
      </TouchableOpacity>

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
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
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
  topContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  imageBack: {
    width: 30,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
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
