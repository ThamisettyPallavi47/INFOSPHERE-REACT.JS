
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import '../pages/styles/Author.css';

export default function Author() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthorAndPosts() {
      try {
        // Helper function to check if id is a valid dummy user id (1 to 10)
        const isDummyId = () => {
          const numId = Number(id);
          return !isNaN(numId) && numId >= 1 && numId <= 10;
        };

        const isDummyIdCheck = isDummyId();

        if (isDummyIdCheck) {
          // Fetch dummy author from jsonplaceholder
          const authorRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          const dummyPostsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
          // const authorRes = await axios.get(`https://dummyjson.com/users/${id}`);
          // const dummyPostsRes = await axios.get(`https://dummyjson.com/posts?userId=${id}`);
          const backendRes = await axios.get('http://localhost:5000/api/blogs');

          const dummyAuthor = authorRes.data;

          // Dummy posts mapped with author info and ensuring body exists
          const dummyPosts = dummyPostsRes.data.map(post => ({
            ...post,
            author: dummyAuthor,
            publishDate: new Date().toLocaleDateString(),
            image: `https://picsum.photos/seed/${post.id}/400/200`,
            body: post.body || ''  // ensure body is present
          }));

          // Backend posts authored by this dummy author
          const backendPosts = backendRes.data.filter(post => {
            const name = typeof post.author === 'string' ? post.author : (post.author?.name || '');
            return name.toLowerCase() === dummyAuthor.name.toLowerCase();
          }).map((post, index) => ({
            ...post,
            author: dummyAuthor,
            publishDate: post.publishDate || new Date().toLocaleDateString(),
            image: post.image || `https://picsum.photos/seed/backend${index}/400/200`,
            body: post.content || post.body || ''  // ensure body is present
          }));

          setAuthor(dummyAuthor);
          setPosts([...dummyPosts, ...backendPosts]);

        } else {
          // Admin author by name (string)
          // Fetch all authors from backend
          const authorsRes = await axios.get('http://localhost:5000/api/authors');
          // Find the author object matching the URL id (case-insensitive)
          const foundAuthor = authorsRes.data.find(a => a.name.toLowerCase() === id.toLowerCase());

          // Fetch all blogs from backend
          const backendRes = await axios.get('http://localhost:5000/api/blogs');
          // Filter posts that belong to this author
          const filtered = backendRes.data.filter(post => {
            const name = typeof post.author === 'string' ? post.author : (post.author?.name || '');
            return name.toLowerCase() === id.toLowerCase();
          });

          // Format posts and attach author info
          const formattedPosts = filtered.map((post, index) => ({
            ...post,
            author: foundAuthor || { name: id }, // fallback if author details missing
            publishDate: post.publishDate || new Date().toLocaleDateString(),
            image: post.image || `https://picsum.photos/seed/admin${index}/400/200`,
            body: post.content || post.body || '', // ensure body is present
          }));

          setAuthor(foundAuthor || { name: id });
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching author posts:', error);
        setAuthor(null);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthorAndPosts();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!author) return <p>Author not found.</p>;

  return (
    <div className="author-page">
      <h2>About {author.name}</h2>
      {author.email && <p>Email: {author.email}</p>}
      {author.phone && <p>Phone: {author.phone}</p>}
      {author.website && <p>Website: {author.website}</p>}

      <h3>Posts by {author.name}</h3>
      <div className="blog-list">
        {posts.length === 0 ? (
          <p>No posts found for this author.</p>
        ) : (
          posts.map(post => <BlogCard key={post.id} post={post} showFullDescription={true} />)
        )}
      </div>
    </div>
  );
}
