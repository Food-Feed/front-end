import React, { useState, useEffect } from 'react'
import RatingExampleClearable from './AverageRating'
import CommentContainer from './CommentContainer'
import { useHistory } from 'react-router-dom'

export default function RecipeDetail(props) {
  console.log(props)
    const [state, setState] = useState({});

    const [recipeForm, setRecipeForm] = useState(false);
    const [comment, setComment] = useState({});
    console.log("recipe form state", recipeForm);
    console.log("comm", comment);
    const user = props.user
    // console.log(user)
    const history = useHistory();

    useEffect(() => {
      const token = localStorage.getItem("token")
      fetch(`http://localhost:3000/recipes/${props.match.params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
      })
        .then((r) => r.json())
        .then((recipeObj) => {
          setState(recipeObj);
        });
    }, []);
    console.log(state)

    const handleDelete = () => {
      const token = localStorage.getItem("token")
      fetch(`http://localhost:3000/recipes/${props.match.params.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
      })
        .then((r) => r.json())
        .then(deletedComment => {
          history.push('/recipes')
        })
    }

    return (
        <div>
            <h4>{state.title}</h4>
            <br></br>
            <p>{state.ingred_list}</p>
            <br></br>
            <p>{state.description}</p>
            <br></br>
            <video controls width="250" src={state.video}></video>
            <br></br>
            {state.user_id == user.id && (
              <>
                <button>Edit Recipe</button>
                <button onClick={handleDelete}>Delete Recipe</button>
              </>
            )}
            <hr></hr>
            <RatingExampleClearable />
            <hr></hr>
            <CommentContainer user={props.user} recipe={state} comments={state.comments}/>
        </div>
    )
}