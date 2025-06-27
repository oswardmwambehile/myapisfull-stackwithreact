import React from 'react';
import bgwoman from '../assets/bg-woman.jpg';

const Contact = () => {
  return (
    <div style={styles.container}>
      <img src={bgwoman} alt="Contact Background" style={styles.bgImage} />
      <div style={styles.overlay} />

      <div style={styles.formContainer}>
        <h2 style={styles.title}>Contact Us</h2>
        <p style={styles.subtitle}>Let’s build something great together</p>

        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.input} />
          <input type="email" placeholder="Your Email" style={styles.input} />
          <textarea placeholder="Message" rows="5" style={styles.textarea}></textarea>
          <button style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    color: 'white',
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 22, 36, 0.8)',
    zIndex: 1,
  },
  formContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '600px',
    margin: '100px auto',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#75e6da',
    textAlign: 'center',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
  },
  textarea: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    resize: 'vertical',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#75e6da',
    border: 'none',
    color: '#0f1624',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Contact;
