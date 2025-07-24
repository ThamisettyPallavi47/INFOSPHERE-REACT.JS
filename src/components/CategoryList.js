import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/CategoryList.css';

const categories = [
  { name: 'Finance', img: `${process.env.PUBLIC_URL}/assets/images/finance.jpg` },
  { name: 'Technology', img: `${process.env.PUBLIC_URL}/assets/images/technology.jpg` },
  { name: 'Health', img: `${process.env.PUBLIC_URL}/assets/images/health.jpg` },
  { name: 'Education', img: `${process.env.PUBLIC_URL}/assets/images/education.jpg` },
  { name: 'Politics', img: `${process.env.PUBLIC_URL}/assets/images/politics.jpg` },
  { name: 'Business', img: `${process.env.PUBLIC_URL}/assets/images/business.jpg` },
  { name: 'Travel', img: `${process.env.PUBLIC_URL}/assets/images/travel.jpg` },
  { name: 'Sports', img: `${process.env.PUBLIC_URL}/assets/images/sport.jpg` },
  { name: 'Lifestyle', img: `${process.env.PUBLIC_URL}/assets/images/lifestyle.jpg` },
  { name: 'Food', img: `${process.env.PUBLIC_URL}/assets/images/food.jpg` },
  { name: 'Science', img: `${process.env.PUBLIC_URL}/assets/images/science.jpg` },
  { name: 'Books', img: `${process.env.PUBLIC_URL}/assets/images/book.jpg` },
  { name: 'Magazine', img: `${process.env.PUBLIC_URL}/assets/images/magazine.jpg` },
  { name: 'Entertainment', img: `${process.env.PUBLIC_URL}/assets/images/entertainement.jpg` },
  { name: 'Articles', img: `${process.env.PUBLIC_URL}/assets/images/article.jpg` },
];

export default function CategoryList() {
  return (
    <div className="category-list">
      {categories.map(cat => (
        <Link to={`/category/${cat.name.toLowerCase()}`} key={cat.name} className="category-item">
          <img src={cat.img} alt={cat.name} />
          <h4>{cat.name}</h4>
        </Link>
      ))}
    </div>
  );
}