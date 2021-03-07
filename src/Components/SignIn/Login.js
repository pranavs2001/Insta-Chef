import React from 'react';
import "./LoginPage.css";
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
                <div className= "btnContainer">
                    {hasAccount? (
                        <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Don't have an account? 
                            <span onClick={()=> setHasAccount(!hasAccount)}> {/* toggle the state when you click the span*/}
                                Sign up 
                            </span>
                        </p>
                        </>
                    ): (
                        <>
                        <button class='btn' onClick={handleSignup}>Sign up</button>
                        <p>Have an account? 
                            <span onClick={()=> setHasAccount(!hasAccount)}>
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