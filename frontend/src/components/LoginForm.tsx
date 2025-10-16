import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// ------------------------------------
// Interfaces (Tipos de Dados)
// ------------------------------------
interface ILoginData {
    email: string;
    password: string;
}

interface IAuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface IErrorResponse {
    msg: string;
}

// Interface para as propriedades do componente (adicionando onAuthSuccess)
interface LoginFormProps {
    onAuthSuccess: () => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onAuthSuccess }) => {
    const [formData, setFormData] = useState<ILoginData>({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState<string>('');

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Processando...');

        try {
            const response = await axios.post<IAuthResponse>(
                `${API_URL}/login`,
                { email, password }
            );

            localStorage.setItem('token', response.data.token);
            setMessage('✅ Login bem-sucedido!');

            console.log('Dados do Usuário:', response.data.user);
            onAuthSuccess(); // Chama a função para notificar o App

        } catch (err) {
            const error = err as AxiosError<IErrorResponse>;

            const errorMsg = error.response?.data?.msg
                ? `Erro: ${error.response.data.msg}`
                : '❌ Erro desconhecido ao logar. Verifique as credenciais.';

            setMessage(errorMsg);
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Acessar</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
                >
                    Entrar
                </button>
                <p className={`text-sm mt-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            </form>
        </div>
    );
}

export default LoginForm;
