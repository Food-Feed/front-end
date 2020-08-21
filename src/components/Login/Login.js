import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import './Login.css'

export default function Login(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(r => r.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
            history.push('/home')

        })
        // setUsername("")
        // setPassword("")
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "50%",
    }
    return(
        <div style={formDivStyle}>
            <div id="spacer" />
            <div className="login-form">
                <h1>Log In</h1>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                    </div>
                    
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
} 
