import React, { useState } from 'react';
// import '../../styles/AdminDashboard.css';
import '../pages/styles/AdminDashboard.css'; // optional CSS styling

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      title,
      category,
      author,
      image,
      content,
      date: new Date().toLocaleDateString(),
    };

    console.log('New Blog Post:', newBlog);
    alert('Blog added (Dummy Only). Check console for blog data.');

    // Clear the form
    setTitle('');
    setCategory('');
    setAuthor('');
    setImage('');
    setContent('');
  };

  return (
    <div className="admin-dashboard">
      <h2>Add New Blog Post</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
