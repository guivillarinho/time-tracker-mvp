import React from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
// Certifique-se de que o arquivo de estilo global App.css ou index.css carregue o Tailwind CSS

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700">Time Tracker MVP</h1>
        <p className="mt-2 text-xl text-gray-500">Comece a mapear o tempo do seu time</p>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        <section className="flex-1">
          <RegisterForm />
        </section>
        <section className="flex-1">
          <LoginForm />
        </section>
      </main>

      <footer className="mt-10 text-sm text-gray-400">
        MVP v0.1 - Semana 1: Setup e Autenticação
      </footer>
    </div>
  );
}

export default App;
