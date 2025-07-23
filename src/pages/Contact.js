import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import '../pages/styles/Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_jzk3oka',
      'template_qsrkbuq',
      form.current,
      'JMi4bqspYuGoiYVQq'
    )
      .then(() => {
        alert('Message sent successfully!');
        e.target.reset();
      }, (error) => {
        alert('Failed to send message. Please try again.');
        console.error(error.text);
      });
  };

  return (
    <motion.div
      className="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-info">
        <h2>Contact Me</h2>
        <h4>Let's work together</h4>
        <p>Let's build something great together! I'm excited to hear your ideas and collaborate on exciting frontend development projects.</p>
        <ul>
          <li><FaPhoneAlt /> +91 98765 43210</li>
          <li><FaEnvelope /> infosphere.support@email.com</li>
          <li><FaMapMarkerAlt /> Hyderabad, Telangana, India</li>
        </ul>
        <div className="contact-icons">
          <a href="mailto:infosphere@gmail.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        </div>
      </div>

      <div className="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="from_name" placeholder="Your Name" required />
          <input type="email" name="from_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit" className="send">Send</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
