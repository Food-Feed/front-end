import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ReactHover from 'react-hover'

// HOVER STATE 

const options = {
    followCursor: true,
    shiftX:20,
    shiftY:0
}

export default function HoverInfoVoiceButton() {

    return (
        <section id="voice-buttons">
            <ReactHover options={options}>
                <ReactHover.Trigger type="trigger">
                <button onClick={listen} className="buttons">Turn On Voice Command</button>
                </ReactHover.Trigger>
                <ReactHover.Hover type="hover">
                <p>Test Data Here</p>
                </ReactHover.Hover>
            </ReactHover>
            <button onClick={SpeechRecognition.stopListening} className="buttons">Turn Off Voice Command</button>
        </section>
    )
}