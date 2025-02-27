import { useState } from "react";

export default function useSignUpController() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp= async () => {
    try {
      const response = await fetch('http://10.0.2.2:5225/api/Customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign Up successful:', data);
      } else {
        console.error('Sign Up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
  };
}
