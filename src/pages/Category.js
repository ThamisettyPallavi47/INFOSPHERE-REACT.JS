


// category.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import '../pages/styles/Category.css';
import { motion } from 'framer-motion';

const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : process.env.REACT_APP_API_BASE_URL;

export default function Category() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const [dummyRes, usersRes, adminRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts?_limit=500'),
          axios.get('https://jsonplaceholder.typicode.com/users'),
         
          axios.get(`${baseURL}/api/blogs`) // Updated endpoint
        ]);

        const categories = ['finance', 'technology', 'health', 'education', 'politics', 'business', 'travel', 'sports', 'lifestyle', 'science', 'books','food','entertainment','magazine','articles'];

        
        const dummyMapped = dummyRes.data.map((post, index) => {
  const user = usersRes.data.find(u => u.id === post.userId) || { id: 0, name: "Unknown" };
  const randomCategory = categories[index % categories.length];
  return {
    ...post,
    author: {
      id: user.id,
      name: user.name
    },
    publishDate: new Date().toLocaleDateString(),
    image: `https://picsum.photos/seed/${post.id}/400/200`,
    category: randomCategory
  };
});


        
        const adminMapped = adminRes.data.map((post, index) => ({
  ...post,
  author: typeof post.author === 'string' ? { id: 999, name: post.author } : post.author || { id: 999, name: 'Admin' },
  publishDate: post.publishDate || new Date().toLocaleDateString(),
  
  image: post.image && post.image.trim() !== '' ? post.image : `https://picsum.photos/seed/custom${index}/400/200`,
  category: post.category || 'general',
  body: post.body || post.content || '',  // Ensure 'body' exists for BlogCard
}));

        const combinedPosts = [...dummyMapped, ...adminMapped];
        setPosts(combinedPosts);
        setAnimationKey(prev => prev + 1);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllBlogs();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.category?.toLowerCase() === categoryName.toLowerCase() &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to page 1 on filter
  }, [posts, categoryName, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} News</h2>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="blog-list">
        {currentPosts.length === 0 ? (
          <p className="no-posts">No posts found for this category.</p>
        ) : (
          currentPosts.map((post, index) => (
            <motion.div
              key={`${post.id}-${animationKey}`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))
        )}
      </div>

      {filteredPosts.length > postsPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={currentPage === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
