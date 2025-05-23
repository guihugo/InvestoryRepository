import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Stack"; // Certifique-se de importar corretamente as rotas

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function useIdController() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp>();

    const fetchUserByEmail = async (email: string) => {
        console.log("fetchUserByEmail", email);

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://10.0.2.2:5225/login/${email}`, { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log( response.status);

            if (!response.ok) {
                throw new Error("User not found");
            }

            const data = await response.json();
            setUserData(data);

            if (data) {
                navigation.navigate('Home', { userData: data });
            }
        } catch (err) {
            setError("User not found or API error.");
        } finally {
            setLoading(false);
        }
    };

    return { userData, loading, error, fetchUserByEmail };
}
