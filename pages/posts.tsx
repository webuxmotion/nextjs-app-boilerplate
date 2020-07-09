import { useState, useEffect } from 'react';
import Link from "next/link";
import { MainLayout } from '../components/MainLayout';
import { MyPost } from '../interfaces/post';
import { NextPageContext } from 'next';

interface PostsPageProps {
  posts: MyPost[]
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts`);
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

Posts.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { posts: null }
  }

  console.log('process.env.API_URL', process.env.API_URL);

  const response = await fetch(`${process.env.API_URL}`);
  const posts: MyPost[] = await response.json();

  return {
    posts
  }
}
