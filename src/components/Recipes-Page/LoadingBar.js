import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoadingBar = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader indeterminate>Uploading Recipe</Loader>
      </Dimmer>

      {/* <Image src='/images/wireframe/short-paragraph.png' /> */}
    </Segment>
  </div>
)

export default LoadingBar