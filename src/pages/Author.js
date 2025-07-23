import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import '../pages/styles/Author.css';

export default function Author() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAuthorAndPosts() {
      const authorRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      const postsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      const postsWithMeta = postsRes.data.map(post => ({
        ...post,
        author: authorRes.data,
        publishDate: new Date().toLocaleDateString(),
        image: `https://picsum.photos/seed/${post.id}/400/200`
      }));

      setAuthor(authorRes.data);
      setPosts(postsWithMeta);
    }
    fetchAuthorAndPosts();
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div className="author-page">
      <h2>About {author.name}</h2>
      <p>Email: {author.email}</p>
      <p>Phone: {author.phone}</p>
      <p>Website: {author.website}</p>

      <h3>Posts by {author.name}</h3>
      <div className="blog-list">
        {posts.map(post => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
