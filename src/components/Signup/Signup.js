import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import './Signup.css'

export default function Signup(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
        console.log(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleNameChange = (evt) => {
        setName(evt.target.value)
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                name,
                email
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
            history.push('/home')
        })
        // setUsername("")
        // setPassword("")
        // setName("")
        // setEmail("")
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "50%"
    }
    
    return(
        <div style={formDivStyle}>
            <div id="spacer" />
            <h1>Sign Up</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                <div className="field">
                    <label>Name</label>
                    <input value={name} onChange={handleNameChange} type="text" placeholder="name"/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                </div>
                
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}
