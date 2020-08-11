import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import RatingExampleClearable from './AverageRating'
import CommentContainer from './CommentContainer'

export default function RecipeDetail(props) {
    const [state, setState] = useState({});

    const [recipeForm, setRecipeForm] = useState(false);
    const [comment, setComment] = useState({});
    console.log("recipe form state", recipeForm);
    console.log("comm", comment);

    useEffect(() => {
      fetch(`http://localhost:3000/recipes/${props.match.params.id}`)
        .then((r) => r.json())
        .then((recipeObj) => {
          setState(recipeObj);
        });
    }, []);
    console.log(state)
    return (
        <div>
            <h4>{state.title}</h4>
            <hr></hr>
            <p>{state.ingred_list}</p>
            <hr></hr>
            <p>{state.description}</p>
            <hr></hr>
            <video controls width="250" src={state.video}></video>
            <hr></hr>
            <RatingExampleClearable />
            <hr></hr>
            <CommentContainer comments={state.comments}/>
        </div>
    )
}