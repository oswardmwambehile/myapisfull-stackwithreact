import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const categoryColors = {
  tech: 'blue',
  life: 'green',
  edu: 'orange',
  news: 'red',
  ent: 'purple',
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  // Get logged-in username and token from localStorage
  const loggedInUsername = (localStorage.getItem('username') || '').toLowerCase().trim();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then((res) => {
        console.log('Post data:', res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.error('Failed to load post:', err);
        setError('Failed to load post');
      });
  }, [id]);

  const handleDelete = () => {
    if (!accessToken) {
      alert('You must be logged in to delete a post.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`http://127.0.0.1:8000/api/posts/${id}/delete/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          alert('Post deleted');
          navigate('/');
        })
        .catch((err) => {
          console.error('Delete error:', err);
          alert('Failed to delete post. Make sure you are authorized.');
        });
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  const authorUsername = post.author
    ? post.author.split('@')[0].toLowerCase().trim()
    : '';

  const isAuthor = loggedInUsername === authorUsername;

  // Premium button styles
  const buttonStyle = {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '40px auto',
        padding: 30,
        background: '#f9f9fb',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 10, color: '#222' }}>{post.title}</h1>
      <p
        style={{
          color: categoryColors[post.category] || '#666',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 20,
        }}
      >
        Category: {post.category}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 10,
            marginBottom: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      )}

      <p
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: 1.6,
          color: '#333',
          fontSize: '18px',
          marginBottom: 25,
        }}
      >
        {post.content}
      </p>

      <small style={{ color: '#555' }}>
        By <strong>{authorUsername || 'Unknown author'}</strong> | Created at:{' '}
        {new Date(post.created_at).toLocaleDateString()}
      </small>

      {isAuthor && (
        <div style={{ marginTop: 30 }}>
          <Link to={`/posts/${id}/edit`} style={{ marginRight: 15 }}>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#007bff',
                color: 'white',
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
            >
              Update
            </button>
          </Link>

          <button
            onClick={handleDelete}
            style={{
              ...buttonStyle,
              backgroundColor: '#dc3545',
              color: 'white',
              boxShadow: '0 4px 12px rgba(220, 53, 69, 0.4)',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#a71d2a')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
