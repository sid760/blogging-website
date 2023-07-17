import {useContext, useState,useRef,useEffect} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";
import React from "react";
import lottie from "lottie-web";
import animationData from '../assets/login_bg.json';

// import groovyWalkAnimation from "./groovyWalk.json";

export default function LoginPage() {
  const animate=useRef(null);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  useEffect(() => {
    lottie.loadAnimation({
      container: animate.current,
      animationData: animationData,
      renderer: 'svg', // or 'canvas', 'html', 'svg'
      loop: true, // set to true or false
      autoplay: true, // set to true or false
    });
  }, []);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div>
    <div ref={animate} className="anime"></div>
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
    </div>
  );
}