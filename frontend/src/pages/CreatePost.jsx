import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import slugify from 'slugify';
import {
  PencilSquare,
  Link,
  CardText,
  Tags,
  Image as ImageIcon,
  CheckCircle,
  ExclamationCircle,
} from 'react-bootstrap-icons';

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: 'tech',
    image: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { value: 'tech', label: 'Technology' },
    { value: 'life', label: 'Lifestyle' },
    { value: 'edu', label: 'Education' },
    { value: 'news', label: 'News' },
    { value: 'ent', label: 'Entertainment' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newSlug = formData.slug;

    if (name === 'title') {
      newSlug = slugify(value, { lower: true, strict: true });
    }

    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: newSlug,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('You must be logged in to create a post.');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/posts/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setError(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        category: 'tech',
        image: null,
      });
    } catch (err) {
      console.error('Create post error response:', err.response?.data);

      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else if (err.response?.status === 400) {
        if (err.response.data) {
          const errors = err.response.data;
          const messages = [];
          for (const key in errors) {
            if (Array.isArray(errors[key])) {
              messages.push(`${key}: ${errors[key].join(' ')}`);
            } else {
              messages.push(`${key}: ${errors[key]}`);
            }
          }
          setError(messages.join(' | '));
        } else {
          setError('Bad request. Please check your input.');
        }
      } else {
        setError('Failed to create post. Please try again.');
      }
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📝 Create a New Post</h2>

      {!isLoggedIn && (
        <Alert variant="warning" className="text-center">
          Please <a href="/login">log in</a> to create a post.
        </Alert>
      )}

      {/* Success and error messages above the form */}
      {success && (
        <Alert variant="success" className="d-flex align-items-center mb-3">
          <CheckCircle className="me-2" />
          Post created successfully!
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="d-flex align-items-center mb-3">
          <ExclamationCircle className="me-2" />
          {error}
        </Alert>
      )}

      {isLoggedIn && (
        <Form onSubmit={handleSubmit}>
          {/* Responsive table */}
          <Table bordered hover responsive className="shadow-sm">
            <tbody>
              <tr>
                <td
                  style={{ width: '180px', verticalAlign: 'middle' }}
                  className="text-end pe-3"
                >
                  <PencilSquare className="me-2" />
                  <strong>Title</strong>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter post title"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'middle' }} className="text-end pe-3">
                  <Link className="me-2" />
                  <strong>Slug</strong>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="slug"
                    value={formData.slug}
                    readOnly
                    placeholder="Auto-generated slug"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'middle' }} className="text-end pe-3">
                  <CardText className="me-2" />
                  <strong>Content</strong>
                </td>
                <td>
                  <Form.Control
                    as="textarea"
                    name="content"
                    rows={5}
                    value={formData.content}
                    onChange={handleChange}
                    required
                    placeholder="Write your post content here..."
                  />
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'middle' }} className="text-end pe-3">
                  <Tags className="me-2" />
                  <strong>Category</strong>
                </td>
                <td>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'middle' }} className="text-end pe-3">
                  <ImageIcon className="me-2" />
                  <strong>Image</strong>
                </td>
                <td>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              {/* Submit button aligned left under the labels */}
              <tr>
                <td colSpan={2}>
                  <div className="d-flex justify-content-start">
                    <Button
                      variant="success" // success background
                      type="submit"
                      size="lg"
                    >
                      Submit Post
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Form>
      )}
    </Container>
  );
};

export default CreatePostForm;
