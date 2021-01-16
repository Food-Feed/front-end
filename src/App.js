import React, {useState, useEffect} from 'react';
import { Switch, Route, BrowserRouter, useHistory } from 'react-router-dom'
import './App.css';
import RecipeContainer from './components/Recipes-Page/RecipeContainer'
import RecipeDetail from './components/Recipe-Detail-Page/RecipeDetail'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home-Page/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(r => r.json())
      .then(data => {
        setUser(data)
      })
    }
  }, [])

  const handleAuthClick = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/user_is_authed`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      setUser(data)
      // console.log(data)
    })
  }


  const handleLogin = (user) => {
    setUser(user)
  }

  const handleNavSwitch = (input) => {
    setForm(input)
  }

  // console.log(user)

  const handleLogout = () => {
    setUser({})
  }

  return (
      <div className="App">
        <BrowserRouter>
          <Navbar handleNavSwitch={handleNavSwitch} user={user} handleLogout={handleLogout}/>
          <Switch>
            {user.id ? (
              <>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/recipes" component={RecipeContainer}/>
                <Route exact path="/recipes/:id" render={(props) => <RecipeDetail {...props} user={user}/>}/>
              </>
            ) : (
              <>
                <Route exact path="/signup" render={() => <Signup handleLogin={handleLogin} />}/>
                <Route exact path="/login" render={() => <Login handleLogin={handleLogin} handleAuthClick={handleAuthClick}/>}/>
              </>
            )}
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
