import {useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";

function NavBar() {
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

    return (
        <div className={hasScrolled ? 'navbar shadow' : 'navbar'}>
            <header>
                <Link to="/" className="logo">MyBlog</Link>
                <nav>
                    {username && (
                        <>
                            <Link to="/create">Create new post</Link>
                            <a onClick={logout}>Logout ({username})</a>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </header>
        </div>
    )
    )