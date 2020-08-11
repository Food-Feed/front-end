import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react'
import ButtonExampleToggle from './FavoriteButton'

export default function RecipeCard(props) {
    console.log(props.recipeInfo)
    const history = useHistory();

    const handleClick = () => {
        history.push(`/recipes/${props.recipeInfo.id}`);
    };

    const favoriteToggle = () => {
        if (props.recipeInfo.favorited) {
            document.getElementById("heart").className = "favorite-filled";
        } else {
            document.getElementById("heart").className = "favorite-empty";
        }
    }

    return (
        <div className="recipe-card">
            <h4>{props.recipeInfo.title}</h4>
            <img src={props.recipeInfo.image} alt="recipe closeup" className="recipe-image" onClick={handleClick}></img>
            <ButtonExampleToggle id="heart" favorited={props.recipeInfo.favorited}/>
        </div>
    )
}