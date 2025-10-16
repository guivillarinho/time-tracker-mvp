import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';

// Interfaces
interface IActivityData {
    title: string;
    description: string;
    activityTypeName: string; // Enviamos o nome, o backend encontra ou cria o tipo
}

interface IErrorResponse {
    msg: string;
}

const API_URL = 'http://localhost:5000/api/activities';

const TimerForm: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0); // Tempo em segundos
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [formData, setFormData] = useState<IActivityData>({
        title: '',
        description: '',
        activityTypeName: 'Desenvolvimento', // Valor inicial para o MVP
    });
    const [message, setMessage] = useState<string>('');
    // CORRIGIDO: Usando 'number' para referenciar timers do navegador
    const timerRef = useRef<number | null>(null);

    // Efeito para o Cronômetro
    useEffect(() => {
        if (isRunning) {
            // O timer é um intervalo de 1 segundo que incrementa o estado 'time'
            // O setInterval no navegador retorna um ID numérico (number)
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000) as unknown as number;
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const formatTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const handleStartStop = () => {
        if (isRunning) {
            // Parar o Timer
            setIsRunning(false);
            setMessage('Preencha os detalhes e clique em Salvar Atividade.');
        } else {
            // Iniciar o Timer
            setStartTime(new Date()); // Define o horário de início
            setTime(0);
            setMessage('');
            setIsRunning(true);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveActivity = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!startTime || isRunning) {
            setMessage('🚫 Por favor, pare o timer antes de salvar.');
            return;
        }
        if (time < 5) {
            setMessage('🚫 O tempo registrado é muito curto (mínimo 5 segundos).');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('🚫 Você precisa estar logado para registrar atividades.');
            return;
        }

        try {
            const endTime = new Date();

            const payload = {
                ...formData,
                startTime: startTime.toISOString(), // Envia como string ISO
                endTime: endTime.toISOString(),     // Envia como string ISO
            };

            const response = await axios.post(
                API_URL,
                payload,
                {
                    headers: {
                        // Envia o JWT para a rota protegida
                        'x-auth-token': token,
                    },
                }
            );

            setMessage(`✅ Atividade "${response.data.title}" registrada com sucesso! Tipo: ${response.data.activityType.name}`);

            // Resetar estado
            setTime(0);
            setStartTime(null);
            setFormData({ ...formData, title: '', description: '' });

        } catch (err) {
            const error = err as AxiosError<IErrorResponse>;
            const errorMsg = error.response?.data?.msg || '❌ Falha ao salvar atividade. Verifique o console.';
            setMessage(errorMsg);
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">Registro de Tempo (Cronômetro)</h2>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-5xl font-mono text-gray-800">{formatTime(time)}</div>
                <button
                    onClick={handleStartStop}
                    className={`px-6 py-2 rounded-full font-bold transition duration-300 ${isRunning
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                            : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                        }`}
                >
                    {isRunning ? 'PARAR' : (time === 0 ? 'INICIAR' : 'CONTINUAR')}
                </button>
            </div>

            <form onSubmit={handleSaveActivity} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Título da Atividade (ex: Implementação da Feature X)"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    required
                    disabled={isRunning}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-200"
                />
                <textarea
                    placeholder="Descrição (opcional)"
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    disabled={isRunning}
                    rows={3}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-200"
                ></textarea>

                {/* Simulação de Tipos Fixos para o MVP */}
                <select
                    name="activityTypeName"
                    value={formData.activityTypeName}
                    onChange={onChange}
                    disabled={isRunning}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-200"
                >
                    <option value="Desenvolvimento">Desenvolvimento</option>
                    <option value="Reunião">Reunião</option>
                    <option value="Documentação">Documentação</option>
                    <option value="Comunicação">Comunicação/E-mail</option>
                    <option value="Outros">Outros</option>
                </select>

                <button
                    type="submit"
                    disabled={isRunning || time < 5} // Desabilita se o tempo for muito curto
                    className="bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md disabled:bg-gray-400"
                >
                    Salvar Atividade ({formatTime(time)})
                </button>
            </form>

            <p className={`text-sm mt-4 text-center ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
        </div>
    );
};

export default TimerForm;
