import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = ()=>{

    }
  return (
    <div className="login">
      <div className="form">
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control inp_text"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <a className="form-p" href="#">
            Don't have an account ? Signup instead
          </a>
          <button type="submit">Submit</button>

          <p className="form-or">OR</p>
          <button className="form-withgoogle" type="submit">
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
