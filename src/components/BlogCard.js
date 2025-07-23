import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/BlogCard.css';

export default function BlogCard({ post }) {
  const { id, title, body, author, publishDate, image } = post;

  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-content">
        <h3>{title}</h3>
        <p>{body.slice(0, 100)}...</p>
        <p className="blog-meta">
          By <Link to={`/author/${author.id}`}>{author.name}</Link> on {publishDate}
        </p>
        <Link to={`/blog/${id}`} className="read-more">Read more</Link>
      </div>
    </div>
  );
}
