'use client';

import { useState } from 'react';

type FormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Suponha que você faça uma requisição de login aqui.
      if (formData.username === 'admin' && formData.password === 'admin') {
        alert('Login bem-sucedido!');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="Usuário"
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Senha"
        required
      />
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
  );
}