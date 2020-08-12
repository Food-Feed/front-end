import React, {useState} from 'react';
import { Switch, Route, BrowserRouter, useHistory } from 'react-router-dom'
import './App.css';
import RecipeContainer from './components/Recipes-Page/RecipeContainer'
import RecipeDetail from './components/Recipe-Detail-Page/RecipeDetail'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home-Page/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")


  const handleLogin = (user) => {
    setUser(user)
  }

  const handleNavSwitch = (input) => {
    setForm(input)
  }

  console.log(user)

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
                <Route exact path="/login" render={() => <Login handleLogin={handleLogin}/>}/>
              </>
            )}
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
