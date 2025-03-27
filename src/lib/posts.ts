export interface Post {
    id: string;
    username: string;
    content: string;
    created_at: string;
    likes: number; // Adicionado contador de curtidas
  }
  
  export interface Comment {
    id: string;
    postId: string;
    username: string;
    content: string;
    created_at: string;
  }
  
  const posts: Post[] = [
    { id: '1', username: 'user1', content: 'Este é o primeiro post!', created_at: '2025-03-27', likes: 5 },
    { id: '2', username: 'user2', content: 'Olá, mundo!', created_at: '2025-03-27', likes: 2 },
  ];
  
  const comments: Comment[] = []; // Simulação de banco de dados de comentários
  
  export async function getPosts(): Promise<Post[]> {
    // Simulação de busca de posts
    return posts;
  }
  
  export async function createPost(content: string): Promise<Post> {
    // Simulação de criação de um novo post
    const newPost = { id: Date.now().toString(), username: 'currentUser', content, created_at: new Date().toISOString(), likes: 0 };
    posts.unshift(newPost);
    return newPost;
  }
  
  export async function likePost(postId: string): Promise<void> {
    // Simulação de curtir um post
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.likes += 1;
    }
  }
  
  export async function getComments(postId: string): Promise<Comment[]> {
    // Retorna os comentários de um post específico
    return comments.filter((comment) => comment.postId === postId);
  }
  
  export async function addComment(postId: string, content: string): Promise<Comment> {
    const newComment = {
      id: Date.now().toString(),
      postId,
      username: 'currentUser',
      content,
      created_at: new Date().toISOString(),
    };
    comments.push(newComment);
    return newComment;
  }
  
  export async function editPost(postId: string, newContent: string): Promise<Post | null> {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.content = newContent;
      return post;
    }
    return null;
  }
  
  export async function deletePost(postId: string): Promise<void> {
    const index = posts.findIndex((p) => p.id === postId);
    if (index !== -1) {
      posts.splice(index, 1);
    }
  }  