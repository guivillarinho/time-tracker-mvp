import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// ------------------------------------
// Interfaces (Tipos de Dados)
// ------------------------------------
interface IFormData {
    name: string;
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

const RegisterForm: React.FC = () => {
    // Tipagem do estado com a interface IFormData
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState<string>('');

    const { name, email, password } = formData;

    // Tipagem do evento de mudança
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Tipagem do evento de submissão
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Processando...');

        try {
            // Tipagem da resposta de sucesso
            const response = await axios.post<IAuthResponse>(
                `${API_URL}/register`,
                { name, email, password }
            );

            // Se o registro for bem-sucedido, o token estará em response.data
            localStorage.setItem('token', response.data.token);
            setMessage('✅ Registro e login bem-sucedidos! Token armazenado.');

            console.log('Dados do Usuário:', response.data.user);

        } catch (err) {
            // Tratamento e tipagem do erro
            const error = err as AxiosError<IErrorResponse>;

            const errorMsg = error.response?.data?.msg
                ? `Erro: ${error.response.data.msg}`
                : '❌ Erro desconhecido ao registrar. Tente novamente.';

            setMessage(errorMsg);
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Registro</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                    Registrar
                </button>
                <p className={`text-sm mt-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            </form>
        </div>
    );
}

export default RegisterForm;
