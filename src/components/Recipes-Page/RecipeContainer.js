import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import AddRecipe from './AddRecipe'
import { Link } from 'react-router-dom'
import './Recipes.css'

export default function RecipeContainer() {
    const [state, setState] = useState([]);
    // const [recipeForm, setRecipeForm] = useState(false);
    // const [recipeId, setRecipeId] = useState("");

    // const [formState, setFormState] = useState({
    //     image: "",
    //     video: "",
    //     ingred_list: "",
    //     description: "",
    // });

    useEffect(() => {
        fetch('http://localhost:3000/recipes')
            .then(r => r.json())
            .then(recipesArray => {
                setState(recipesArray)
            });
    }, []);

    const renderRecipe = () => {
        return state.map(recipe => (
            <RecipeCard 
                key={recipe.id} 
                recipeInfo={recipe}
            />
        ))
    }


    return (
        <div>
            <h2>All Recipes</h2>
            <AddRecipe 
                renderNewRecipe={setState}
            />
            <section className="recipe-cards">
                {state.length > 0 && renderRecipe()}
            </section>
        </div>
    )
}