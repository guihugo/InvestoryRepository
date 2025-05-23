import { useState } from "react";
import { useCustomerController } from "./CustomerController";

export default function useSignUpController() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleCreateCustomer } = useCustomerController();

  const handleRegister = async (firstName: string, lastName: string) => {
    setLoading(true);
    setError(null);
    const requestBody = JSON.stringify({ email, password });

    console.log("Request Body:", requestBody);

    try {
      const response = await fetch("http://10.0.2.2:5225/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
        
      });
      
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      console.log("Sign Up successful");

      handleCreateCustomer(firstName, lastName, email);

    } catch (err) {
      console.error("Error:", err);
      setError("Registration failed. Please try again.");
      
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    loading,
    error,
  };
}
