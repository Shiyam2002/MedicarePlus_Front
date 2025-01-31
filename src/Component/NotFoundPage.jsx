import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Optional if using React Router

class NotFound extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" style={styles.link}>
          Go back to Home
        </Link>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#343a40',
  },
  message: {
    fontSize: '1.5rem',
    color: '#6c757d',
    marginBottom: '1rem',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFound;
