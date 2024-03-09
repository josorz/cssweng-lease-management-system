import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser, login } from "../../../public/usercontext.jsx";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, dispatch } = useUser(); // Access user context

    const handleLogin = () => {
        // Add your authentication logic here
        if (username === 'ceejaypascasio' && password === '12345678') {
            login(dispatch); // Dispatch the LOGIN action
            navigate('/'); // Redirect to the home page
        } else {
            // Failed login, display an error message or handle as needed
            alert('Login failed');
        }
    }

    return (
        <div className="login-container" style={{ backgroundImage: 'url("/bghehe.svg")', opacity: 0.9}}>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex" style={{width: '70%', height: '70%', background: '#FFF6EA', boxShadow: '15px 15px 4px rgba(0, 0, 0, 0)',  borderRadius: 10, overflow: "hidden"}}>
                    <img src='/loginimage.svg' style={{width: '30%', height: '100%', objectFit: "cover", objectPosition: "-720px 0px"}}/>
                    <div className='login-container' style={{width: '65%', height: '90%', boxShadow: '5px 5px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, border: '3px #885133 solid', position: 'relative', left: '30px', top: '30px'}}>
                        <h1 className="login">Login</h1>
                        <hr style={{ width: '70%', height: '3px', backgroundColor: '#885133', margin: '30px 0', boxShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.15)'}} />
                        <div className="username-container">
                            <input
                                className="un"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <input
                            className="pw"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="signup-container">
                            <a href="/register" className="signup">
                                <span id='donthave'>Don't have an account?</span> <span id={'signup'}> Sign up Now! </span>
                            </a>
                        </div>
                        <button
                            onClick={handleLogin}
                            className="login-button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;