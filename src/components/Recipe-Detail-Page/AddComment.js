import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export default function AddComment(props) {
    // console.log(props.recipe)

    const changeHandler = (e) => {
        e.persist();
        props.setFormState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        console.log(props.formState);
    };

    const handleCommentCreation = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        body: JSON.stringify({ ...props.recipe.comments, recipe_id: props.recipe_id }),
        })
        .then((r) => r.json())
        .then((newComment) => {
            console.log(newComment);
            // props.commentState((prevState) => {
            // return {
            //     recipe: {
            //     ...prevState.recipe,
            //     comments: [
            //         ...prevState.recipe.comments,
            //         { ...newComment.comment, user_id: newComment.user_id },
            //     ],
            //     },
            // };
            // });
        });
        props.setFormState({content: ""});
    };

        return (
            <div className="form">
                <Form onSubmit={handleCommentCreation}>
                    <Form.Field>
                    <label>New Comment</label>
                    <input placeholder='Add your comment here...' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
