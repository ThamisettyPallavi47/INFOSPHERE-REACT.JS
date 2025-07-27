
import React, { useState, useEffect } from 'react';
import '../pages/styles/AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // New fields
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhone, setAuthorPhone] = useState('');
  const [authorWebsite, setAuthorWebsite] = useState('');

  const [existingAuthors, setExistingAuthors] = useState([]);
  const [isNewAuthor, setIsNewAuthor] = useState(false);

  // Fetch existing authors on component mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/authors');
        const names = res.data.map((a) => a.name.toLowerCase());
        setExistingAuthors(names);
      } catch (err) {
        console.error('Failed to fetch authors:', err);
      }
    };
    fetchAuthors();
  }, []);

  // Detect if author is new when name changes
  useEffect(() => {
    if (author.trim() === '') {
      setIsNewAuthor(false);
      return;
    }
    const isNew = !existingAuthors.includes(author.trim().toLowerCase());
    setIsNewAuthor(isNew);
  }, [author, existingAuthors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBlog = {
      title,
      category,
      author,
      image,
      content,
      date: new Date().toLocaleDateString()
    };

    try {
      // If new author, add author info to DB
      if (isNewAuthor) {
        await axios.post('http://localhost:5000/api/authors', {
          name: author,
          email: authorEmail,
          phone: authorPhone,
          website: authorWebsite
        });
      }

      const response = await axios.post('http://localhost:5000/api/blogs', newBlog);
      console.log('Blog added:', response.data);
      alert('✅ Blog successfully added!');

      // Reset form
      setTitle('');
      setCategory('');
      setAuthor('');
      setImage('');
      setContent('');
      setAuthorEmail('');
      setAuthorPhone('');
      setAuthorWebsite('');
      setIsNewAuthor(false);
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('❌ Failed to add blog. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Add New Blog Post</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        {isNewAuthor && (
          <>
            <input
              type="email"
              placeholder="Author Email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Author Phone"
              value={authorPhone}
              onChange={(e) => setAuthorPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Author Website"
              value={authorWebsite}
              onChange={(e) => setAuthorWebsite(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
