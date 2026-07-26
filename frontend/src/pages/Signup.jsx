import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/register",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Registration Successful ✅");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div className="login-container">

      <form
        className="login-card glass"
        onSubmit={handleSubmit}
      >

        <h1 className="brand-title">
          SmartSplit
        </h1>

        <p className="subtitle">
          Create Account
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn">
          Sign Up
        </button>

        <p
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Already have an account?
          <Link to="/">
            Login
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Signup;