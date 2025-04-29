import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Testing from "./Testing";
const Home = () => {
  return (
    <>
      <h1>Welcome Home</h1>

      <Link to="/login"> login</Link>
      <Link to="/sign-up">Sign up</Link>
    </>
  );
};

export default Home;
