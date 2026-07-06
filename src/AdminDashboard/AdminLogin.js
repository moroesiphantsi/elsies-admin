import React, { useState } from "react";
import "./AdminLogin.css";
import {
  FaUserShield,
  FaLock,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaSignInAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    code: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = (e) => {

    e.preventDefault();

    const validUsername =
      "elsiesprint&embroid";

    const validPassword =
      "elsiesinternet@2026";

    const validCode =
      "elsiesp&b";

    if (
      form.username === validUsername &&
      form.password === validPassword &&
      form.code === validCode
    ) {

      localStorage.setItem(
        "elsiesAdmin",
        "true"
      );

      navigate("/admin-home");

    } else {

      setError(
        "Invalid login credentials."
      );

    }

  };

  return (

    <div className="admin-login-page">

      <div className="login-card">

        <div className="login-top">

          <div className="shield">

            <FaUserShield />

          </div>

          <h1>
            Elsies Admin Portal
          </h1>

          <p>
            Secure Access Dashboard
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <FaUserShield />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group password-group">

  <FaLock />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    required
  />

  <button
    type="button"
    className="eye-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

          <div className="input-group">

            <FaKey />

            <input
              type="password"
              name="code"
              placeholder="Security Code"
              value={form.code}
              onChange={handleChange}
              required
            />

          </div>

          {error && (

            <div className="error">

              {error}

            </div>

          )}

          <button
            className="login-btn"
            type="submit"
          >

            <FaSignInAlt />

            Access Dashboard

          </button>

        </form>

        <div className="security-panel">

          <div>
            ✓ Encrypted Session
          </div>

          <div>
            ✓ Secure Access
          </div>

          <div>
            ✓ Admin Protected
          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminLogin;