// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// const BLOGS_FILE = path.join(__dirname, 'blogs.json');

// // Ensure blogs.json exists
// if (!fs.existsSync(BLOGS_FILE)) {
//   fs.writeFileSync(BLOGS_FILE, JSON.stringify([]));
// }

// // GET all blog posts
// app.get('/api/blogs', (req, res) => {
//   fs.readFile(BLOGS_FILE, 'utf8', (err, data) => {
//     if (err) return res.status(500).json({ error: 'Failed to read data' });
//     res.json(JSON.parse(data));
//   });
// });

// // POST a new blog post
// app.post('/api/blogs', (req, res) => {
//   const newBlog = req.body;

//   fs.readFile(BLOGS_FILE, 'utf8', (err, data) => {
//     if (err) return res.status(500).json({ error: 'Failed to read file' });

//     const blogs = JSON.parse(data);
//     const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;
//     const fullBlog = { id: newId, ...newBlog };

//     blogs.push(fullBlog);

//     fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), err => {
//       if (err) return res.status(500).json({ error: 'Failed to write file' });
//       res.status(201).json(fullBlog);
//     });
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const BLOGS_FILE = path.join(__dirname, 'blogs.json');
const AUTHORS_FILE = path.join(__dirname, 'authors.json');

// Ensure blogs.json exists
if (!fs.existsSync(BLOGS_FILE)) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify([]));
}

// Ensure authors.json exists
if (!fs.existsSync(AUTHORS_FILE)) {
  fs.writeFileSync(AUTHORS_FILE, JSON.stringify([]));
}

// GET all blog posts
app.get('/api/blogs', (req, res) => {
  fs.readFile(BLOGS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read blogs data' });
    res.json(JSON.parse(data));
  });
});

// POST a new blog post
app.post('/api/blogs', (req, res) => {
  const newBlog = req.body;

  fs.readFile(BLOGS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read blogs file' });

    const blogs = JSON.parse(data);
    const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;
    const fullBlog = { id: newId, ...newBlog };

    blogs.push(fullBlog);

    fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to write blogs file' });
      res.status(201).json(fullBlog);
    });
  });
});

// GET all authors
app.get('/api/authors', (req, res) => {
  fs.readFile(AUTHORS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read authors data' });
    res.json(JSON.parse(data));
  });
});

// POST a new author
app.post('/api/authors', (req, res) => {
  const newAuthor = req.body;

  fs.readFile(AUTHORS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read authors file' });

    const authors = JSON.parse(data);

    // Prevent duplicate authors by name (case-insensitive)
    if (authors.some(a => a.name.toLowerCase() === newAuthor.name.toLowerCase())) {
      return res.status(400).json({ error: 'Author already exists' });
    }

    authors.push(newAuthor);

    fs.writeFile(AUTHORS_FILE, JSON.stringify(authors, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to write authors file' });
      res.status(201).json(newAuthor);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
