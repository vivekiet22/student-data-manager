import React, { useState } from "react";
import {useNavigate} from "react-router-dom"


const Signup = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()
    const handleSubmit =async (e)=>{
        e.preventDefault()
        if (!email || !password || !name){
            alert("Name or Email or Description cannot be blank")
        }
        else{
            const response = await fetch("http://localhost:5000/register",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,password})
            })
            const json = await response.json()
            console.log(json);
            if (json.status==="success"){
                // Save the auth token and redirect
                localStorage.setItem('token', json.data.token);  
                navigate("/dashboard");
                console.log("Account Created Successfully")


            }
            else{
                console.log(json.msg)
            }
                }
    }
  return (
    <div className="login">
      <div className="form">
      
        <form 
        onSubmit={handleSubmit}
        >
            <input
            type="name"
            name="name"
            placeholder="Name"
            className="form-control inp_text"
            id="name"
            autocomplete="off"
            value={name}
            onChange={(e)=>setName(e.target.value)}

          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control inp_text"
            id="email"
            autocomplete="off"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            autocomplete="off"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <a className="form-p" href="#">
            Already have an account ? Login instead
          </a>
          <button type="submit" >Submit</button>

         
        </form>
      </div>
    </div>
  );
};

export default Signup;
