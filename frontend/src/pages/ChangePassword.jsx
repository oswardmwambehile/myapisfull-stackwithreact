import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (form.new_password !== form.confirm_password) {
      setStatus({ success: false, message: 'New passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        'http://127.0.0.1:8000/api/user/change-password/',
        {
          old_password: form.old_password,
          new_password: form.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setStatus({ success: true, message: res.data.detail });
      setForm({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setStatus({
        success: false,
        message:
          err.response?.data?.old_password?.[0] ||
          err.response?.data?.new_password?.[0] ||
          err.response?.data?.detail ||
          'Password change failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          name="old_password"
          placeholder="Current Password"
          value={form.old_password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={form.new_password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          value={form.confirm_password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
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
    maxWidth: 400,
    margin: '60px auto',
    padding: 30,
    backgroundColor: '#fefefe',
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
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default ChangePassword;
