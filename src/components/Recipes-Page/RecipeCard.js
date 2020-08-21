import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react'
import RecipeDetail from '../Recipe-Detail-Page/RecipeDetail';
import './Recipes.css'

export default function RecipeCard(props) {
    // console.log(props)
    const history = useHistory();

    // const handleClick = () => {
        // return <RecipeDetail recipeInfo={props.recipeInfo} />
        // <Link to={{
        //     pathname: `/recipes/${props.recipeInfo.id}`
        // }}></Link>
        // history.push({
        //     pathname: `/recipes/${props.recipeInfo.id}`, 
        //     state: {recipeInfo: props.recipeInfo}
        // })
    // };

    const favoriteToggle = () => {
        if (props.recipeInfo.favorited) {
            document.getElementById("heart").className = "favorite-filled";
        } else {
            document.getElementById("heart").className = "favorite-empty";
        }
    }

    return (
        <div className="recipe-card">
            <Link to={{
                pathname: `/recipes/${props.recipeInfo.id}`,
                showForm: props.showForm
            }}>
                <img src={props.recipeInfo.image} alt="recipe closeup" className="recipe-image"></img>
            </Link>
            <h4 className="recipe-title">{props.recipeInfo.title}</h4>
            {/* <img src={props.recipeInfo.image} alt="recipe closeup" className="recipe-image" onClick={handleClick}></img> */}
            {/* <ButtonExampleToggle id="heart" favorited={props.recipeInfo.favorited}/> */}
        </div>
    )
}