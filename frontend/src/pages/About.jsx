import React from 'react';
import bgwoman from "../assets/bg-woman.jpg";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <div style={styles.overlay} />
        <img src={bgwoman} alt="Background" style={styles.bgImage} />
      </div>
      <div style={styles.textSection}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.subtitle}>Innovating the Future of Tech & Design</p>
        <p style={styles.content}>
          We are a passionate team dedicated to pushing the boundaries of innovation.
          With creativity and expertise, we transform ideas into reality.
        </p>
        <button style={styles.ctaButton}>Learn More</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    color: 'white',
    overflow: 'hidden',
  },
  imageSection: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'scale(1.1)',
    transition: 'transform 1.5s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.9))',
    zIndex: 1,
  },
  textSection: {
    flex: 1,
    padding: '80px',
    backgroundColor: '#0f1624',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: '4rem',
    fontWeight: '700',
    marginBottom: '20px',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '1.8rem',
    fontWeight: '300',
    marginBottom: '30px',
    color: '#75e6da',
  },
  content: {
    fontSize: '1.2rem',
    lineHeight: '1.7',
    maxWidth: '480px',
    marginBottom: '40px',
  },
  ctaButton: {
    padding: '14px 40px',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0f1624',
    backgroundColor: '#75e6da',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    alignSelf: 'flex-start',
  },
};

export default About;
