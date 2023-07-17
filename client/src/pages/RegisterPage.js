import {useEffect, useRef, useState} from "react";
import lottie from "lottie-web";
import animationData from '../assets/login_bg.json';

export default function RegisterPage() {
    const animate = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        lottie.loadAnimation({
            container: animate.current,
            animationData: animationData,
            renderer: 'svg', // or 'canvas', 'html', 'svg'
            loop: true, // set to true or false
            autoplay: true, // set to true or false
        });
    }, []);

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.status === 200) {
            alert('registration successful');
        } else {
            alert('registration failed');
        }
    }

    return (
        <div>
        <div ref={animate} className="anime"></div>
            <form className="register" onSubmit={register}>
                <h1>Register</h1>
                <input type="text"
                       placeholder="username"
                       value={username}
                       onChange={ev => setUsername(ev.target.value)}/>
                <input type="password"
                       placeholder="password"
                       value={password}
                       onChange={ev => setPassword(ev.target.value)}/>
                <button>Register</button>
            </form>
        </div>
    );
}