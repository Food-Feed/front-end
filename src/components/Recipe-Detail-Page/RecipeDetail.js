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
    const [state, setState] = useState({});
    const [voiceOn, setVoiceOn] = useState(false); 

    const user = props.user
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

    // **** VOICE COMMAND SECTION **** //

    let video = document.getElementById('video')

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



    return (
        <div className="recipe-detail-container">
            
            <video controls width="400" src={state.video} id="video"></video>
            {!voiceOn ? <button onClick={listen} className="voice-button">Turn On Voice Command</button> : <button onClick={stopListening} className="voice-button">Turn Off Voice Command</button>}
            
        </div>
    )
}