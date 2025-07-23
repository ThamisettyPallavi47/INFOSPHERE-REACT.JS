
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import '../pages/styles/Category.css';
import { motion } from 'framer-motion';

export default function Category() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=100')
    
      .then(async (res) => {
        const users = await axios.get('https://jsonplaceholder.typicode.com/users');
       
        const categories = ['finance', 'technology', 'health', 'education', 'politics', 'business', 'travel', 'sports', 'lifestyle', 'science', 'books'];

        const mapped = res.data.map((post, index) => {
          const author = users.data.find(u => u.id === post.userId) || { id: 0, name: "Unknown" };
          const randomCategory = categories[index % categories.length];
          return {
            ...post,
            author,
            publishDate: new Date().toLocaleDateString(),
            image: `https://picsum.photos/seed/${post.id}/400/200`,
            category: randomCategory
          };
        });

        setPosts(mapped);
        setAnimationKey(prev => prev + 1);
      });
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.category === categoryName &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to page 1 on filter
  }, [posts, categoryName, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setAnimationKey(prev => prev + 1); // retrigger animation
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

      {/* Pagination */}
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
