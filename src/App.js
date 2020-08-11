import React from 'react';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import RecipeContainer from './components/Recipes-Page/RecipeContainer'
import RecipeDetail from './components/Recipe-Detail-Page/RecipeDetail'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home-Page/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/home" render={() => <Home />}/>
          <Route exact path="/recipes" render={() => <RecipeContainer />}/>
          <Route exact path="/recipes/:id" render={(props) => <RecipeDetail {...props} />}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
