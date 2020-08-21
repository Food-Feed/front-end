import React, { useEffect, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import RecipeDetail from './RecipeDetail';
import './RecipeDetail.css'

// props 
// editForm={editForm}
// setEditForm={setEditForm}
// comment={props.comment}

export default function EditComment(props) {
    const [state, setState] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/comments/${props.comment.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        })
            .then(r => r.json())
            .then(comment => {
                setState(comment)
                console.log(comment)
            });
    }, []);

    const changeHandler = (e) => {
        e.persist();
        console.log(e.target)
        // props.setFormState(state);
        // console.log(props.formState);
    };

    const handleCommentEdit = (e) => {
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
            .then((updatedComment) => {
                console.log(updatedComment)
                props.renderUpdatedComment((prevState => [...prevState, updatedComment]))
            });
        props.setFormState({recipe_id: props.recipe.id, content: ""});
        setState({recipe_id: props.recipe.id, content: ""});
        console.log(props.recipe.comments)
    };

        return (
            <div className="form">
                <Form onSubmit={handleCommentEdit}>
                    <Form.Field>
                        <label id="new-comment-text">Edit Comment</label>
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
