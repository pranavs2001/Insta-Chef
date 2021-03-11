import React from 'react';
import logo from '../../img/insta-chef-logo.png'

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
        <div className="CreateAccountHeader">
          <img className="Insta-Chef-Logo" src={logo} alt="Insta-Chef logo" />
          <h1> Create your Insta-Chef Account </h1>
        </div>
        <label>
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
        <label> Password </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">
          {passwordError}
        </p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button className={"LoginButton"}onClick={handleLogin}>Sign In</button>
              <p>Don't have an account?
                <span
                  onClick={() => setHasAccount(!hasAccount)}> {/* toggle the state when you click the span*/}
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <button className={"LoginButton"} onClick={handleSignup}>Sign up</button>
              <p>Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>
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