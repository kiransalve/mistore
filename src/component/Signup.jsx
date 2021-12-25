import React, { useState } from "react";
import { auth, fs } from "../config/Config";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();

  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(fullname, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullname,
            Email: email,
            Password: password,
          })
          .then(() => {
            setSuccessMsg(
              "Signup Successfully. You will get redirect to Login"
            );
            setfullname("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              history.push("/login");
            }, 3000).catch((error) => {
              setErrorMsg(error.message);
            });
          });
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="container">
      <br />
      <br />
      <h1>Sign Up</h1>
      <hr />
      {successMsg && (
        <>
          <div className="success_msg">{successMsg}</div>
          <br />
        </>
      )}
      <form className="form-group" autoComplete="off" onSubmit={handleSignup}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name=""
          className="form-control"
          onChange={(e) => setfullname(e.target.value)}
          value={fullname}
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name=""
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name=""
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />

        <div className="btn-box">
          <span>
            Already have account Login
            <Link to="login" className="link">
              {" "}
              Here
            </Link>
          </span>
          <br />
          <button type="submit" className="btn btn-success btn-md btn-class">
            Sign Up
          </button>
          <hr />
        </div>
      </form>
      {errorMsg && (
        <>
          <div className="error_msg">{errorMsg}</div>
          <br />
        </>
      )}
    </div>
  );
};

export default Signup;
