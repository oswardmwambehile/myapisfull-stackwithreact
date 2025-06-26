import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png"; // adjust path if needed

export default function Layout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data);
        localStorage.setItem("username", res.data.username);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .post("http://127.0.0.1:8000/api/logout/", null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(err => console.error("Logout API error", err))
      .finally(() => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
        window.location.reload();
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/post-list">
            <img 
              src={logo} 
              alt="MyApp Logo" 
              style={{ height: "40px", width: "auto" }} 
            />
          </Link>
          <Link className="navbar-brand" to="/">About</Link>

          {user && <Link className="navbar-brand" to="/create-post">Add post</Link>}

          <Link className="navbar-brand" to="/">Services</Link>
          <Link className="navbar-brand" to="/">Contact</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#!"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div
                      className="me-2 d-flex justify-content-center align-items-center"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#3D56FF",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {user.username[0].toUpperCase()}
                    </div>
                    {user.username}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <span className="dropdown-item-text">{user.email}</span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}
