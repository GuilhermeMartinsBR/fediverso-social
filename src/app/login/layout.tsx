// src/app/login/layout.tsx
import React from 'react';

export default function LoginLayout({
  children, // O conteúdo da página, como o formulário de login
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Fediverso - Login</h1>
      </header>

      <main>
        {children}  {/* Aqui vai o conteúdo da página de login */}
      </main>

      <footer>
        <p>&copy; 2025 Fediverso</p>
      </footer>
    </div>
  );
}