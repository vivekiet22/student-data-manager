import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email or Description cannot be blank");
    } else {
  
        const response = await fetch("/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.status==="success"){
            // Save the auth token and redirect
            localStorage.setItem('token', json.data.token); 
            console.log("Logged in Successfully")
            navigate("/dashboard");

        }
        else{
          console.log(json.msg)
        }
    }
  };
  return (
    <div className="login">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control inp_text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <a className="form-p" href="/signup">
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
