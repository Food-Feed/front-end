import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import RecipeDetail from './RecipeDetail';
import './RecipeDetail.css'

export default function AddComment(props) {
    const [state, setState] = useState({})
    console.log(props.recipe)
    const recipe = props.recipe

    const changeHandler = (e) => {
        e.persist();
        setState({recipe_id: recipe.id, content: e.target.value})
        props.setFormState(state);
        console.log(props.formState);
    };

    const handleCommentCreation = (e) => {
        e.preventDefault();
        console.log("comment state", props.formState)
        const token = localStorage.getItem("token")

        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify(state),
        })
            .then((r) => r.json())
            .then((newComment) => {
                console.log(newComment)
                props.renderNewComment((prevState => [...prevState, newComment]))
            });
        props.setFormState({recipe_id: props.recipe.id, content: ""});
        setState({recipe_id: props.recipe.id, content: ""});
        console.log(props.recipe.comments)
    };

        return (
            <div className="form">
                <Form onSubmit={handleCommentCreation}>
                    <Form.Field>
                        <label id="new-comment-text">New Comment</label>
                        <input 
                            placeholder='Add your comment here...' 
                            name="content"
                            value={state.content}
                            onChange={e => changeHandler(e)}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
