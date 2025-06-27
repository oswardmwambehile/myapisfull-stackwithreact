import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PostUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });

  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then((res) => {
        const { title, content, category, image } = res.data;
        setFormData({ title, content, category, image: null });
        setImageUrl(image);
      })
      .catch((err) => {
        console.error('Failed to load post:', err);
        setError('Failed to load post data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert('You must be logged in to update a post.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    axios
      .put(`http://127.0.0.1:8000/api/posts/${id}/update/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('Post updated successfully');
        navigate(`/posts/${id}`);
      })
      .catch((err) => {
        console.error('Update error:', err);
        alert('Failed to update post. Check your data and permissions.');
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        maxWidth: 960,
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 30, fontSize: 28, color: '#333' }}>Update Post</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '20px',
            rowGap: '25px',
            marginBottom: '30px',
          }}
        >
          {/* Title */}
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Category */}
          <label style={labelStyle}>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">--Select Category--</option>
            <option value="tech">Tech</option>
            <option value="life">Life</option>
            <option value="edu">Education</option>
            <option value="news">News</option>
            <option value="ent">Entertainment</option>
          </select>

          {/* Content */}
          <label style={labelStyle}>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          {/* Current Image Preview */}
          {imageUrl && (
            <>
              <label style={labelStyle}>Current Image:</label>
              <img
                src={imageUrl}
                alt="Current"
                style={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </>
          )}

          {/* Upload New Image */}
          <label style={labelStyle}>New Image (optional):</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={{ ...inputStyle, padding: 5 }}
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" style={submitButtonStyle}>
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

// 💄 Styling for input fields, labels, and buttons
const labelStyle = {
  fontWeight: 'bold',
  fontSize: '16px',
  alignSelf: 'center',
  color: '#444',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
  backgroundColor: '#fdfdfd',
};

const submitButtonStyle = {
  padding: '12px 28px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default PostUpdate;
