// src/lib/auth.ts
import { createClient } from '@supabase/supabase-js';

// Certifique-se de que suas variáveis de ambiente estão definidas corretamente.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criação do cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função de SignUp (Cadastro)
export async function signUp(email: string, password: string, username: string) {
  try {
    // Criação do usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (authError) throw authError;

    // Se a autenticação for bem-sucedida, cria o perfil na tabela 'profiles'
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username,
          actor_url: `https://seudominio.com/actor/${username}`,
        });

      if (profileError) throw profileError;
    }

    return authData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Erro no cadastro');
  }
}

// Função de SignIn (Login)
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Erro no login');
  }
}

// Função de SignOut (Logout)
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Erro no logout');
  }
}

export async function login(email: string, password: string): Promise<void> {
  // Simulação de lógica de autenticação
  if (email === 'test@example.com' && password === 'password') {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Credenciais inválidas'));
  }
}