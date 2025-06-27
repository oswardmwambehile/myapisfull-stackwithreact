import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setForm(res.data))
      .catch((err) => {
        setStatus({
          success: false,
          message: 'Failed to load user profile.',
        });
      });
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    axios
      .put('http://127.0.0.1:8000/api/user/update-profile/', form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setStatus({ success: true, message: 'Profile updated successfully.' });
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          'Update failed.';
        setStatus({
          success: false,
          message: errorMsg,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles.container}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {status && (
        <p style={{ color: status.success ? 'green' : 'red', marginTop: 15 }}>
          {status.message}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: '60px auto',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  input: {
    padding: '10px 15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default UpdateProfile;
