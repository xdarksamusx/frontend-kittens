import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log("hi");
        console.log("Lofin Successful", data);
      })
      .catch((error) => {
        console.error("Login error", error);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1>Log in</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_email"> Email</label>
          <input value={email} onChange={(e) => handleEmail(e)} />
        </div>

        <div>
          <label htmlFor="password"> password</label>
          <input value={password} onChange={(e) => handlePassword(e)} />
        </div>

        <button type="submit">Log In</button>

        <div>
          {" "}
          <Link to="/">Home</Link>
        </div>
      </form>
    </>
  );
};
