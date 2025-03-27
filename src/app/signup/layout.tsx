// src/app/signup/layout.tsx
import React from 'react';
import './layout.css'; // Arquivo CSS para o layout

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="signup-layout">
      {/* Cabeçalho */}
      <header className="signup-header">
        <h1>Fediverso - Cadastro</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>
      
      {/* Conteúdo principal */}
      <main className="signup-main">
        {children}  {/* Aqui vai o conteúdo da página de signup */}
      </main>

      {/* Rodapé */}
      <footer className="signup-footer">
        <p>&copy; 2025 Fediverso - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default SignupLayout;
