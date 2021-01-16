import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import AddRecipe from './AddRecipe'
// import { Link } from 'react-router-dom'
import './Recipes.css'
import LoadingBar from './LoadingBar';
import Search from './Search'

export default function RecipeContainer() {
    const [state, setState] = useState([]);
    const [recipeForm, setRecipeForm] = useState(false);
    const [loadBarOn, setLoadBarOn] = useState(false);
    const [query, setQuery] = useState("")

    const [formState, setFormState] = useState({
        image: "",
        video: "",
        title: "",
        ingredients: [{ingred_detail: ''}],
        recipe_steps: [{step_detail: ''}]
        // ingred_list: "",
        // description: "",
    });

    // const showEditForm = (recipeObj) => {
    //     setRecipeId(recipeObj.id);
    //     setRecipeForm(true);
    //     setFormState({
    //         image: recipeObj.image,
    //         video: recipeObj.video,
    //         title: recipeObj.title,
    //         ingred_list: recipeObj.ingred_list,
    //         description: recipeObj.description,
    //     });
    // }

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch('http://localhost:3000/recipes', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        })
            .then(r => r.json())
            .then(recipesArray => {
                setState(recipesArray)
                // console.log(recipesArray)
            });
    }, []);

    const renderRecipe = () => {
        return state.map(recipe => (
            <RecipeCard 
                key={recipe.id} 
                recipeInfo={recipe}
                // showForm={showEditForm}
                // recipeSetState={setState}
            />
        ))
    }

    const activateLoadBar = () => {
        // return <LoadingBar />
        console.log("load bar activated")
        setLoadBarOn(true)
    }

    const handleSetQuery = (query) => {
        setQuery(query)
        {query.length > 0 && setState(state.filter(recipe => recipe.title.includes(query)))}
      }

    return (
        <div className="recipes-container">
            <div id="spacer" />
            <img src=""></img>
            <p id="all-recipes-header">All Recipes</p>
            {/* <Search query={query} handleSetQuery={handleSetQuery} key={query} /> */}
            <section className="recipe-cards">
                {state.length > 0 && renderRecipe()}
            </section>
            <AddRecipe 
                recipeForm={recipeForm}
                renderNewRecipe={setState}
                formState={formState}
                setRecipeForm={setRecipeForm}
                setFormState={setFormState}
                className="modal"
                activateLoadBar={activateLoadBar}
                loadBarOn={loadBarOn}
            />
        </div>
    )
}