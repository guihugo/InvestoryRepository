import { useState } from "react";

export default function useResetPasswordController() {
    const [email, setEmail] = useState('');

    const handleReset = async () => {
        if (!email.trim()) {
            alert("Por favor, insira um email válido.");
            return;
        }

        try {
            const response = await fetch("http://10.0.2.2:5225/forgotPassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar solicitação");
            }

            alert("E-mail de recuperação enviado com sucesso!");
        } catch (error) {
            console.error("Erro:", error);
            alert("Falha ao enviar solicitação. Tente novamente.");
        }
    };

    return { email, setEmail, handleReset };
}
