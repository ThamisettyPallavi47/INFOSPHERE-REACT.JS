// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../pages/styles/BlogDetails.css';
// import { motion } from 'framer-motion';

// export default function BlogDetails() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [author, setAuthor] = useState(null);

//   // Like, Comment & Share states
//   const [likes, setLikes] = useState(0);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState([]);

//   // Newsletter Subscription state
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // First fetch all backend posts to check if id matches admin blog
//         const backendRes = await axios.get('http://localhost:5000/api/blogs');
//         const backendPost = backendRes.data.find(p => p.id.toString() === id.toString());

//         if (backendPost) {
//           // If found in backend admin posts
//           setPost({
//             ...backendPost,
//             publishDate: backendPost.publishDate || new Date().toLocaleDateString(),
//             image: backendPost.image || `https://picsum.photos/seed/custom${id}/600/300`,
//             body: backendPost.body || backendPost.content || '',
//           });
//           setAuthor({ id: 999, name: backendPost.author || 'Admin' });
//         } else {
//           // Fallback to dummy API post
//           const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
//           const userRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${postRes.data.userId}`);
         

//           setPost({
//             ...postRes.data,
//             publishDate: new Date().toLocaleDateString(),
//             image: `https://picsum.photos/seed/${postRes.data.id}/600/300`,
//           });
//           setAuthor(userRes.data);
//         }
//       } catch (error) {
//         console.error('Error fetching blog details:', error);
//       }
//     }
//     fetchData();
//   }, [id]);

//   if (!post) return <p className="loading">Loading...</p>;

//   // Handlers
//   const handleLike = () => setLikes(likes + 1);

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: post.title,
//         text: post.body.slice(0, 100) + '...',
//         url: window.location.href,
//       }).catch((error) => console.log('Error sharing:', error));
//     } else {
//       alert('Web Share API not supported on your browser. Copy URL: ' + window.location.href);
//     }
//   };

//   const toggleCommentBox = () => setShowCommentBox(!showCommentBox);

//   const sendComment = () => {
//     if (commentText.trim() !== '') {
//       setComments([...comments, commentText.trim()]);
//       setCommentText('');
//       setShowCommentBox(false);
//     }
//   };

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email.trim() !== '') {
//       setSubscribed(true);
//       setEmail('');
//     }
//   };

//   return (
//     <motion.article
//       className="blog-details"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h1>{post.title}</h1>
//       <img src={post.image} alt={post.title} />
//       <p className="blog-meta">
//         By <Link to={`/author/${typeof author?.id === 'number' && author.id >=1 && author.id <=10 ? author.id : author.name}`}>
//   {author?.name}
// </Link>
//   on  {post.publishDate}
//       </p>
//       <p className="blog-body">{post.body}</p>

//       <div className="interactions">
//         <button onClick={handleLike}>👍 Like {likes > 0 && `(${likes})`}</button>
//         <button onClick={handleShare}>🔗 Share</button>
//         <button onClick={toggleCommentBox}>💬 Comment</button>
//       </div>

//       {showCommentBox && (
//         <div className="comment-box">
//           <textarea
//             placeholder="Write your comment here..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//           <button className="send-btn" onClick={sendComment}>
//             Send
//           </button>
//         </div>
//       )}

//       {comments.length > 0 && (
//         <div className="comments-section">
//           <h3>All Comments</h3>
//           {comments.map((comment, index) => (
//             <div key={index} className="comment">{comment}</div>
//           ))}
//         </div>
//       )}

//       <div className="newsletter-section">
//         <h3>Subscribe to our Newsletter</h3>
//         {!subscribed ? (
//           <form onSubmit={handleSubscribe} className="newsletter-form">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <button type="submit">Subscribe</button>
//           </form>
//         ) : (
//           <p className="subscription-success">Thank you for subscribing!</p>
//         )}
//       </div>
//     </motion.article>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/BlogDetails.css';
import { motion } from 'framer-motion';

const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : process.env.REACT_APP_API_BASE_URL;


export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  // Like, Comment & Share states
  const [likes, setLikes] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  // Newsletter Subscription state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // First fetch all backend posts to check if id matches admin blog
        const backendRes = await axios.get(`${baseURL}/api/blogs`);
        const backendPost = backendRes.data.find(p => p.id.toString() === id.toString());

        if (backendPost) {
          // If found in backend admin posts
          setPost({
            ...backendPost,
            publishDate: backendPost.publishDate || new Date().toLocaleDateString(),
            image: backendPost.image || `https://picsum.photos/seed/custom${id}/600/300`,
            body: backendPost.body || backendPost.content || '',
          });
          setAuthor({ id: 999, name: backendPost.author || 'Admin' });
        } else {
          // Fallback to dummy API post
          const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
          const userRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${postRes.data.userId}`);
         

          setPost({
            ...postRes.data,
            publishDate: new Date().toLocaleDateString(),
            image: `https://picsum.photos/seed/${postRes.data.id}/600/300`,
          });
          setAuthor(userRes.data);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    }
    fetchData();
  }, [id]);

  if (!post) return <p className="loading">Loading...</p>;

  // Handlers
  const handleLike = () => setLikes(likes + 1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.body.slice(0, 100) + '...',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported on your browser. Copy URL: ' + window.location.href);
    }
  };

  const toggleCommentBox = () => setShowCommentBox(!showCommentBox);

  const sendComment = () => {
    if (commentText.trim() !== '') {
      setComments([...comments, commentText.trim()]);
      setCommentText('');
      setShowCommentBox(false);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <motion.article
      className="blog-details"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} />
      <p className="blog-meta">
        By <Link to={`/author/${typeof author?.id === 'number' && author.id >=1 && author.id <=10 ? author.id : author.name}`}>
  {author?.name}
</Link>
  on  {post.publishDate}
      </p>
      <p className="blog-body">{post.body}</p>

      <div className="interactions">
        <button onClick={handleLike}>👍 Like {likes > 0 && `(${likes})`}</button>
        <button onClick={handleShare}>🔗 Share</button>
        <button onClick={toggleCommentBox}>💬 Comment</button>
      </div>

      {showCommentBox && (
        <div className="comment-box">
          <textarea
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="send-btn" onClick={sendComment}>
            Send
          </button>
        </div>
      )}

      {comments.length > 0 && (
        <div className="comments-section">
          <h3>All Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="comment">{comment}</div>
          ))}
        </div>
      )}

      <div className="newsletter-section">
        <h3>Subscribe to our Newsletter</h3>
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        ) : (
          <p className="subscription-success">Thank you for subscribing!</p>
        )}
      </div>
    </motion.article>
  );
}
