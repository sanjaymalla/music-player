import { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // 🔐 store BOTH tokens
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);

      console.log("Login success:", res.data);

      // 👉 redirect
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => (window.location.href = "/register")}
        >
          Register
        </span>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
