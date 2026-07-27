import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../features/auth/authSlice";
import { generateToken } from "../utils/jwt";

import "./Login.css";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const users = [
        {
            username: "Daniyah",
            password: "admin123",
            role: "admin",
        },
        {
            username: "Minahil",
            password: "editor123",
            role: "editor",
        },
        {
            username: "Alice",
            password: "viewer123",
            role: "viewer",
        },
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(
            (u) =>
                u.username === username &&
                u.password === password
        );

        if (!user) {
            setError("Invalid Username or Password");
            return;
        }

        const token = generateToken(user);

        dispatch(
            login({
                username: user.username,
                role: user.role,
                token,
            })
        );

        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>Social Media Post Composer</h1>

                <h2>Login</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <div className="demo-users">
                    <h3>Demo Users</h3>

                    <p>
                        <strong>Daniyah</strong> / admin123
                    </p>

                    <p>
                        <strong>Minahil</strong> / editor123
                    </p>

                    <p>
                        <strong>Alice</strong> / viewer123
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;