import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import './Recipes.css'

const LoadingBar = () => (
  <div className="load-bar">
    <Segment>
      <Dimmer active>
        <Loader indeterminate>Uploading Recipe</Loader>
      </Dimmer>

      {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
    </Segment>
  </div>
)

export default LoadingBar