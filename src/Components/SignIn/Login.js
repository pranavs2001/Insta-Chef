import React from 'react';
import logo from '../../img/insta-chef-logo.png'
import { Button } from 'react-bootstrap'

const Login = (props) => {

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError
  } = props;
  return (

    <section className="login">
      <div className="loginContainer">
      {/* <div className="loginContainer"> */}
        <div className="CreateAccountHeader">
          <img className="Insta-Chef-Logo" src={logo} alt="Insta-Chef logo" />
          <h1> Create your Insta-Chef Account </h1>
        </div>
        <label className="emailLabel">
          Email
        </label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg"> {emailError} </p>
        <label className="passwordLabel"> Password </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">
          {passwordError}
        </p>
        {/* <div className="btnContainer"> */}
        <div>
          {hasAccount ? (
            <>
            <Button onClick={handleLogin}> Sign In</Button>
              {/* <button className={"LoginButton"}onClick={handleLogin}>Sign In</button> */}
              <p className="accountStatusParagraph">Don't have an account?
              {/* toggle the state when you click the span*/}
                <span
                  onClick={() => setHasAccount(!hasAccount)}
                  className="loginSpan"
                > 
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <Button onClick={handleSignup}> Sign up</Button>
              {/* <button className={"LoginButton"} onClick={handleSignup}>Sign up</button> */}
                <p className="accountStatusParagraph"> Have an account?
                <span 
                  onClick={() => setHasAccount(!hasAccount)}
                  className="loginSpan"
                >
                  Sign In
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;