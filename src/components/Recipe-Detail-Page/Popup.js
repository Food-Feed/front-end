import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const button = document.querySelector('.voice-button')
const Popup = () => (
    <Popup content='You can say "play", "pause", "fast-forward", "rewind", "mute", or "unmute"' trigger={button} />
)

export default Popup