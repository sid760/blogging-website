import {Link} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "./UserContext";
import lottie from "lottie-web";
import animationData from './assets/logo_animation.json';

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  const animate = useRef(null);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animate.current,
      animationData: animationData,
      renderer: 'svg', // or 'canvas', 'html', 'svg'
      loop: false, // set to true or false
      autoplay: false, // set to true or false
    });
    animation.setSpeed(2);
  }, []);


  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Event handler to check scroll position
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setHasScrolled(isScrolled);
    };

    // Attach event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include', method: 'POST',
    });
    setUserInfo(null);
  }

  function handleMouseEnter() {
    setIsAnimationVisible(true);
    lottie.play(); // Play the animation
  }

  function handleMouseLeave() {
    setIsAnimationVisible(true);
    lottie.stop() // Pause the animation
  }

  const username = userInfo?.username;
  return (<div className={hasScrolled ? 'navbar shadow' : 'navbar'}>

      <header>
        <div className="logo-container">
          <Link to="/" className="logo">MyBlog</Link>
          {isAnimationVisible && (<div ref={animate} className="logo-animation"></div>)}
        </div>
        <nav>
          {username && (<>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout ({username})</a>
              {/*<div ref={animate} className="logo-animation"></div>*/}
            </>)}
          {!username && (<>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>)}
        </nav>
      </header>
    </div>);
}
