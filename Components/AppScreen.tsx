import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Stack';
import useLogInController from '../Controller/LogInController';

type AppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'App'>;

export default function AppScreen() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const { email, setEmail, password, setPassword, isLoading, handleLogIn } = useLogInController();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <Text style={styles.title}>Investory!</Text>
      </View>

      <View style={styles.logInContainer}>
        <Text style={styles.textLogin}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
          placeholderTextColor="#ccc"
        />

        <Text style={styles.textLogin}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
          placeholderTextColor="#ccc"
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(60, 119, 174)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    alignItems: 'center',
  },
  logInContainer: {
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 100, 
    height: 100,
    resizeMode: 'contain', 
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 37,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  button: {
    height: 45,
    width: '80%', // Igual aos inputs
    backgroundColor: '#1E1E1E', // Preto escuro
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
  textLogin: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#fff',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
  loader: {
    marginTop: 15,
  },
  linksContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginTop: 8,
  },
});
