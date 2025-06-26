import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostDisplay from './PostDisplay';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts/'); // Your Django endpoint
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.warn('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Run once

  return (
    <div className="post-list">
      <h2 className="mb-4">📝 Latest Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts
          .filter((post) => post && post.title)
          .map((post) => (
            <PostDisplay
              key={post.id || post.slug}
              post={post}
              onReadMore={(slug) => console.log('Read more:', slug)}
            />
          ))
      )}
    </div>
  );
};

export default PostList;
