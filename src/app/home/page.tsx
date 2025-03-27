'use client'; // Indica que este é um componente de cliente

import { useState, useEffect } from 'react';
import { createPost, getPosts, likePost, Post } from '@/lib/posts'; // Importar o tipo Post
import styles from './home.module.css'; // Estilos da página

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]); // Lista de posts com o tipo Post
  const [newPost, setNewPost] = useState(''); // Conteúdo do novo post
  const [error, setError] = useState(''); // Mensagem de erro

  // Carrega os posts ao iniciar a página
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (err: unknown) {
        setError('Erro ao carregar posts');
      }
    };
    fetchPosts();
  }, []);

  // Função para criar um novo post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return; // Não cria post vazio

    try {
      const createdPost = await createPost(newPost);
      setPosts([createdPost, ...posts]); // Adiciona o novo post ao feed
      setNewPost('');
    } catch (err: unknown) {
      setError('Erro ao criar o post');
    }
  };

  // Função para curtir um post
  const handleLikePost = async (postId: string) => {
    try {
      await likePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (err: unknown) {
      setError('Erro ao curtir o post');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.feed}>
        <h2 className={styles.title}>Feed de Notícias</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Formulário para criar um novo post */}
        <form onSubmit={handleCreatePost} className={styles.form}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="O que você está pensando?"
            required
            className={styles.textarea}
          />
          {/* Botão de postar */}
          <button type="submit" className={styles.button}>Postar</button>
        </form>

        {/* Lista de posts */}
        <div className={styles.posts}>
          {posts.length === 0 ? (
            <p className={styles.noPosts}>Nenhum post encontrado.</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className={styles.post}>
                <div className={styles.postHeader}>
                  <span className={styles.username}>{post.username}</span>
                </div>
                <p className={styles.postContent}>{post.content}</p>
                <p className={styles.postLikes}>Curtidas: {post.likes}</p>
                {/* Botão de curtir */}
                <button onClick={() => handleLikePost(post.id)} className={styles.button}>
                  Curtir
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Nova seção */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sobre a Rede Social</h2>
        <p className={styles.sectionContent}>
          Bem-vindo à nossa rede social! Aqui você pode compartilhar seus pensamentos, interagir com outros usuários e explorar o Fediverso.
        </p>
      </div>
    </div>
  );
}