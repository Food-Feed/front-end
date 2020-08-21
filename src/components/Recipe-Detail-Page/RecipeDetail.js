import React, { useState, useEffect, component } from 'react'
import RatingExampleClearable from './AverageRating'
import CommentContainer from './CommentContainer'
import { useHistory } from 'react-router-dom'
import EditRecipe from './EditRecipe'
import './RecipeDetail.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ReactHover from 'react-hover'
import { Button, Popup } from 'semantic-ui-react'


export default function RecipeDetail(props) {
    // console.log(props)
    const [state, setState] = useState({});
    const [comment, setComment] = useState({});
    const [showEditForm, setShowEditForm] = useState(false); 
    const [voiceOn, setVoiceOn] = useState(false); 

    const user = props.user
    // console.log(state)
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

    // HOVER STATE 

      const Popup = (button) => (
        <Popup content='You can say "play", "pause", "fast-forward", "rewind", "mute", or "unmute"' trigger={button} />
      )
    

    // **** VOICE COMMAND SECTION **** //

    let video = document.getElementById('video')
    // console.log(video)

    const commands = [
      {
        command: 'Play',
        callback: () => video.play()
      },
      {
        command: 'Pause',
        callback: () => video.pause()
      },
      {
        command: 'Rewind',
        callback: () => video.currentTime-=10
      },
      {
        command: 'Fast Forward',
        callback: () => video.currentTime+=10
      },
      {
        command: 'Mute',
        callback: () => video.muted=true
      },
      {
        command: 'Unmute',
        callback: () => video.muted=false
      },
      {
        command: 'clear',
        callback: ({ resetTranscript }) => resetTranscript()
      }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })
    console.log(transcript)

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }

    const listen = () => {
      SpeechRecognition.startListening({ continuous: true })
      setVoiceOn(true)
    }

    const stopListening = () => {
      SpeechRecognition.stopListening()
      setVoiceOn(false)
    }


    // CONTINUED RECIPE DETAIL ACTIONS

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
        .then(deletedRecipe => {
          history.push('/recipes')
        })
    }

    const handleUpdate = (recipeObj) => {
      const token = localStorage.getItem("token")
      const form = new FormData()
      // form.append("image", recipeObj.image)
      // form.append("video", recipeObj.video)
      form.append("title", recipeObj.title)
      form.append("ingred_list", recipeObj.ingred_list)
      form.append("description", recipeObj.description)
      form.append("ingredients", JSON.stringify(recipeObj.ingredients))
      form.append("recipe_steps", JSON.stringify(recipeObj.recipe_steps))
      fetch(`http://localhost:3000/recipes/${props.match.params.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      })
        .then((r) => r.json())
        .then(updatedRecipe => {
          // console.log(updatedRecipe)
          setState(updatedRecipe)
        })
    }

    const renderIngredients = () => {
      const ingredientsArray = state.ingredients.sort()
      // console.log(ingredientsArray)
      return ingredientsArray.map((ingredient) => (
        // console.log(ingredient)
        <p id="ingredient">{ingredient.ingred_detail}</p>
      ))
    }

    const renderRecipeSteps = () => {
      const recipeStepsArray = state.recipe_steps.sort()
      return recipeStepsArray.map((step => (
        <li id="recipe-directions-list">{step.step_detail}</li>
      )))
    }

    return (
        <div className="recipe-detail-container">
            <div id="spacer" />
            {/* <img src={state.image} alt="recipe image" id="recipe-image"/> */}
            <p id="recipe-title">{state.title}</p>
            <p id="recipe-author">By: {state.author}</p>
            <span id="button-container">
                {state.user_id === user.id && (
                  <>
                    <EditRecipe
                        handleUpdate={handleUpdate}
                        recipeObj={state}
                        // setShowEditForm={setShowEditForm}
                    />
                    <button onClick={handleDelete} className="buttons"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597717386/Food%20Feed/3058-200_gkxsdp.png" width="20%"/></button>
                    {/* <button onClick={handleEdit}>Edit Recipe</button> */}
                  </>
                )}
              </span>
            <br></br>


            <video controls width="400" src={state.video} id="video"></video>
            {!voiceOn ? <button onClick={listen} className="voice-button">Turn On Voice Command</button> : <button onClick={stopListening} className="voice-button">Turn Off Voice Command</button>}
            {/* <p id="voice-instructions">Say "play", "pause", "fast-forward", "rewind", "mute", or "unmute"</p> */}
            {/* <section> */}
              {/* <section> */}
              {/* </section> */}
              <br></br>
              <section id="ingred-container">
                <p id="ingredients-title">Ingredient List:</p>
                <span id="recipe-ingred-list">
                  {state.ingredients && renderIngredients()}
                </span>
                {/* <p id="recipe-ingred-list">{state.ingred_list}</p> */}
                <br></br>
              </section>
              <section id="ingred-steps-container">
                  <p id="directions-title">Directions:</p>
                  <ol id="recipe-directions-list">
                    {state.recipe_steps && renderRecipeSteps()}
                  </ol>
              </section>
              {/* <p id="recipe-description">{state.description}</p> */}
              {/* <br></br> */}
              
            {/* </section> */}
            <hr></hr>
            {/* <RatingExampleClearable /> */}
            {/* <hr></hr> */}
            <CommentContainer user={props.user} recipe={state} />
        </div>
    )
}