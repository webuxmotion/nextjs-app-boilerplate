import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { MainLayout } from '../../components/MainLayout';

export default function Post({ post: serverPost }) {
  const [post, setPost] = useState(serverPost);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:4200/posts/${router.query.id}`);
      const post = await response.json();
      setPost(post);
    }

    if (!serverPost) {
      load();
    }
  }, []);

  if (!post) {
    return <MainLayout>
      <p>Loading</p>
    </MainLayout>
  }

  return <MainLayout>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
    <Link href={'/posts'}><a>Back to all posts</a></Link>
  </MainLayout>
}

Post.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return { post: null }
  }
  const response = await fetch(`http://localhost:4200/posts/${query.id}`);
  const post = await response.json();

  return {
    post
  }
}
