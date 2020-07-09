import { useState, useEffect } from 'react';
import Link from "next/link";
import { MainLayout } from '../components/MainLayout';

export default function Posts({ posts: serverPosts }) {
  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:4200/posts`);
      const posts = await response.json();
      setPosts(posts);
    }

    if (!serverPosts) {
      load();
    }
  }, []);

  if (!posts) {
    return <MainLayout>
      <p>Loading</p>
    </MainLayout>
  }

  return <MainLayout>
    <h1>Posts</h1>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/post/[id]`} as={`/post/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </MainLayout>
}

Posts.getInitialProps = async ({ req }) => {
  if (!req) {
    return { posts: null }
  }

  const response = await fetch('http://localhost:4200/posts');
  const posts = await response.json();

  return {
    posts
  }
}
