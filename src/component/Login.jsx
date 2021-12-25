import React, { useState } from "react";
import { auth} from "../config/Config";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setSuccessMsg("Login Successfull. You will directly redirect to login.");
      setEmail("");
      setPassword("");
      setErrorMsg("");
      setTimeout(() => {
        setSuccessMsg("");
        history.push("/");
      }, 3000).catch((error) => setErrorMsg(error.message));
    });
  };
  return (
    <div className="container">
      <br />
      <br />
      <h1>Log In</h1>
      <hr />
      {successMsg && (
        <>
          <div className="success_msg">{successMsg}</div>
          <br />
        </>
      )}
      <form
        action=""
        className="form-group"
        autoComplete="off"
        onSubmit={handleLogin}
      >
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
            Not have account Signup
            <Link to="signup" className="link">
              {" "}
              Here
            </Link>
          </span>
          <br />
          <button type="submit" className="btn btn-success btn-md btn-class">
            Log in
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

export default Login;
