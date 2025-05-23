import { useState } from "react";

export function useCustomerController() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateCustomer = async (firstName: string, lastName: string, email: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://10.0.2.2:5225/api/Customer/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email}),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create customer: ${response.status} - ${errorText}`);
            }

            console.log("Customer created successfully");

        } catch (err) {
            console.error("Customer creation error:", err);
            setError("Failed to create customer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        handleCreateCustomer,
        loading,
        error,
    };
}
