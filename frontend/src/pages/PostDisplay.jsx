import React from 'react';
import { Container, Row, Col, Badge, Image, Button } from 'react-bootstrap';
import { Tags, Calendar3, Eye } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const categoryColors = {
  tech: 'primary',
  life: 'success',
  edu: 'warning',
  news: 'danger',
  ent: 'info',
};

const PostDisplay = ({ post }) => {
  if (!post || typeof post !== 'object') return null;

  const {
    id,
    title = 'Untitled Post',
    content = '',
    category = 'news',
    image,
    createdAt = new Date().toISOString(),
    views = 0,
    tags = [],
    author = { name: 'Unknown Author', avatar: 'https://via.placeholder.com/40' },
  } = post;

  return (
    <Container
      fluid
      className="post-display-premium p-4 mb-5 rounded shadow-lg"
      style={{
        background: 'linear-gradient(145deg, #f0f3f7, #cacfd9)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Row className="gx-5 align-items-center">
        {/* Image Section */}
        <Col md={5} className="mb-4 mb-md-0">
          <Link to={`/posts/${id}`} aria-label={`Read more about ${title}`}>
            <div
              style={{
                overflow: 'hidden',
                borderRadius: '1.25rem',
                boxShadow: '0 20px 35px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
            >
              <Image
                src={image || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={title}
                fluid
                style={{ objectFit: 'cover', width: '100%', height: '350px' }}
                className="post-image"
              />
            </div>
          </Link>
        </Col>

        {/* Content Section */}
        <Col md={7}>
          <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1
              style={{ fontWeight: 900, letterSpacing: '0.05em', color: '#1b263b', cursor: 'pointer' }}
              tabIndex={0}
            >
              {title}
            </h1>
          </Link>

          <Badge
            bg={categoryColors[category] || 'secondary'}
            className="mb-3 text-uppercase fs-6"
            style={{ letterSpacing: '0.1em', padding: '0.35em 0.85em', fontWeight: 700 }}
          >
            <Tags className="me-2" /> {category}
          </Badge>

          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#34495e',
              maxHeight: '8rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={content}
          >
            {content}
          </p>

          {tags.length > 0 && (
            <div className="mb-3" aria-label="Post tags">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  pill
                  bg="light"
                  text="dark"
                  className="me-2"
                  style={{ cursor: 'pointer', fontSize: '0.85rem', border: '1px solid #ddd' }}
                  title={`Tag: ${tag}`}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Metadata */}
          <Row className="align-items-center" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
            <Col xs="auto" className="d-flex align-items-center mb-2 mb-sm-0">
              <Image
                src={author.avatar}
                roundedCircle
                width={40}
                height={40}
                alt={author.name}
                className="me-2"
                style={{ objectFit: 'cover' }}
              />
              <div>
                <div>{author.name}</div>
                <small>
                  <Calendar3 className="me-1" />
                  {new Date(createdAt).toLocaleDateString()}
                </small>
              </div>
            </Col>

            <Col xs="auto" className="d-flex align-items-center me-auto">
              <Eye className="me-1" />
              <span>{views} views</span>
            </Col>

            {/* Only View Post Button */}
            <Col xs="auto">
              <Link to={`/posts/${id}`}>
                <Button variant="outline-info" size="sm" title="View Post">
                  <Eye className="me-1" />
                  View Post
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDisplay;
