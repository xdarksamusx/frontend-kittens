import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          password_confirmation: confirmedPassword,
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
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error", error);
      });
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmedPassword = (e: any) => {
    setConfirmedPassword(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_email"> Email</label>
          <input value={email} onChange={(e) => handleEmail(e)} />
        </div>

        <div>
          <label htmlFor="password"> password</label>
          <input value={password} onChange={(e) => handlePassword(e)} />
        </div>

        <div>
          <label htmlFor="password"> confirm password</label>
          <input
            value={confirmedPassword}
            onChange={(e) => handleConfirmedPassword(e)}
          />
        </div>

        <button type="submit">Sign Up</button>

        <button type="submit">
          <Link to="/">Log in </Link>
        </button>

        <div>
          {" "}
          <Link to="/">Home</Link>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
