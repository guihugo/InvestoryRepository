import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { RootStackParamList } from '../Stack';
import { useNavigation } from "@react-navigation/native";
import useTradeController from "../Controller//TradeController";

type LogInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogIn'>;

export default function useLogInController() {
  const navigation = useNavigation<LogInScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogIn = async () => {
    setIsLoading(true); 

    setTimeout(async () => {
      try {
        const response = await fetch('http://10.0.2.2:5225/api/Customer/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Log In successful:', data);

          navigation.navigate('Home', {userData: data} ); 
        } else {
          console.error('Log in failed');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogIn,
  };
}
