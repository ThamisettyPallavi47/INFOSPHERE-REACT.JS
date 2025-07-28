import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import About from './About';
import Contact from './Contact';
import '../pages/styles/Home.css';
import { motion } from 'framer-motion';

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    async function fetchDummyBlogs() {
      try {
        // Fetch dummy posts only for Featured Articles
        const dummyPostsRes = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
        const usersRes = await axios.get('https://jsonplaceholder.typicode.com/users');
        

        const dummyPosts = dummyPostsRes.data.map(post => {
          const author = usersRes.data.find(user => user.id === post.userId) || { id: 0, name: "Unknown" };
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            author,
            publishDate: new Date().toLocaleDateString(),
            image: `https://picsum.photos/seed/${post.id}/400/200`
          };
        });

        setFeaturedPosts(dummyPosts);
        setAnimationKey(prev => prev + 1);

      } catch (error) {
        console.error('Error fetching dummy blogs:', error);
      }
    }

    fetchDummyBlogs();
  }, []);

  return (
    <div id="home" className="home">
      <section className="welcome-banner">
        <h1>Welcome to Infosphere</h1>
        <p>Your trusted source for insightful blogs and up-to-date news across all your favorite categories.</p>
        <div className="banner-highlights">
          <span>🌐 Latest Trends</span>
          <span>📝 Expert Articles</span>
          <span>📊 Data-Driven Insights</span>
        </div>
      </section>
      
      <section id="trending-categories" className="trending-categories">
        <h2>Trending Categories</h2>
        <CategoryList />
      </section>

      <section className="featured-articles">
        <h2>Featured Articles</h2>
        <div className="blog-list">
          {featuredPosts.map((post, index) => {
            const middleIndex = Math.floor(featuredPosts.length / 2);
            const isMiddle = index === middleIndex;
            const initialY = isMiddle ? 100 : -100;

            return (
              <motion.div
                key={`${post.id}-${animationKey}`}
                initial={{ opacity: 0, y: initialY }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
              >
                <BlogCard post={post} />
              </motion.div>
            );
          })}
        </div>
      </section>

     

      <section id="about-us-home" className="about-us-home">
        <About />
      </section>

      <section id="contact-us-home" className="contact-us-home">
        <Contact />
      </section>
    </div>
  );
}
