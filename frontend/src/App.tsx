import React, { useState, useEffect } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import TimerForm from './components/TimerForm';

// Opcional: Adicionar um componente para listar atividades futuras
// import ActivityList from './components/ActivityList'; 

const App: React.FC = () => {
  // Estado para controlar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Estado para armazenar dados básicos do usuário logado (ex: id, nome)
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  // Função para verificar a existência do token no localStorage e status de autenticação
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
      // Em um projeto real, decodificaríamos o token aqui para obter os dados do usuário.
      // Por enquanto, vamos simular:
      const dummyUser = {
        id: 'user-simulado-id',
        name: 'Usuário Logado'
      };
      setUser(dummyUser);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Efeito que executa a verificação de autenticação na montagem do componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Renderiza a saudação
  const greeting = user?.name ? `Olá, ${user.name}!` : 'Bem-vindo(a)!';

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-800">
          Time Tracker MVP
        </h1>
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium hidden sm:inline">{greeting}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-200"
            >
              Sair
            </button>
          </div>
        )}
      </header>

      <main className="w-full max-w-4xl">
        {isAuthenticated ? (
          // ----------------------------------------
          // CONTEÚDO PRINCIPAL (LOGADO)
          // ----------------------------------------
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">{greeting} - Registro de Tempo</h2>
            <TimerForm />

            {/* Próximo Passo: Lista e Gráficos */}
            {/* <ActivityList /> */}
          </div>
        ) : (
          // ----------------------------------------
          // FORMULÁRIOS DE AUTENTICAÇÃO (DESLOGADO)
          // ----------------------------------------
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-sm">
              <LoginForm onAuthSuccess={checkAuthStatus} />
            </div>
            <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-sm">
              <RegisterForm onAuthSuccess={checkAuthStatus} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
