import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ButtonExampleToggle extends Component {
  state = {
    favorited: this.props.favorited
  }

  handleClick = () => 
    this.setState((prevState) => ({ 
      favorited: !prevState.favorited 
    }))

  render() {
    console.log(this.state)
    const { active } = this.state.favorited

    return (
      <Button toggle 
          active={active} 
          onClick={this.handleClick}
          color={active ? 'red' : null}
      >
        <Icon name='heart'/>
      </Button>
    )
  }
}

export default ButtonExampleToggle
