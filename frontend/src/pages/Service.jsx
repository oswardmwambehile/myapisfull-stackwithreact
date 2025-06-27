import React from 'react';
import bgwoman from '../assets/bg-woman.jpg';

const services = [
  { icon: "🛠️", title: "Development", description: "We create fast, scalable software." },
  { icon: "🎨", title: "Design", description: "Crafting beautiful, user-focused designs." },
  { icon: "🚀", title: "Deployment", description: "CI/CD, devops, and cloud solutions." },
  { icon: "🔒", title: "Security", description: "End-to-end security implementation." },
];

const Service = () => {
  return (
    <div style={styles.container}>
      <img src={bgwoman} alt="Service Background" style={styles.bgImage} />
      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.title}>Our Services</h1>
        <p style={styles.subtitle}>Modern, Scalable, Secure</p>

        <div style={styles.cards}>
          {services.map((srv, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.icon}>{srv.icon}</div>
              <h2 style={styles.cardTitle}>{srv.title}</h2>
              <p style={styles.cardDesc}>{srv.description}</p>
            </div>
          ))}
        </div>
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
    top: 0,
    left: 0,
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '80px 20px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '50px',
    color: '#75e6da',
    textAlign: 'center',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    padding: '30px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.3rem',
    marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '1rem',
    color: '#ddd',
  },
};

export default Service;
