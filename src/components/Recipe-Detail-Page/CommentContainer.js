import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './RecipeDetail.css'

export default function CommentContainer(props) {
    const [state, setState] = useState([]);
    // const [commentForm, setCommentForm] = useState();
    // const [commentId, setCommentId] = useState("");
    // console.log(state)
    const current_recipe_id = props.recipe.id
    
    const [formState, setFormState] = useState({
        recipe_id: current_recipe_id,
        content: ""
    });

    useEffect(() => {
        const current_recipe_id = props.recipe.id
        const token = localStorage.getItem("token")

        fetch('http://localhost:3000/comments', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        })
            .then(r => r.json())
            .then(comments => {
                const filteredComments = comments.filter(comment => comment.recipe_id === current_recipe_id)
                setState(filteredComments)
                console.log(filteredComments)
            })
    }, [props]);

    const renderComments = () => {
        if (state.length > 0) {
            return state.map(comment => (
                <Comment
                    comment={comment}
                    key={comment.id}
                    user={props.user}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            ))
        } else {
            return "Be the first one to comment!"
        }
    }

    const handleDelete = (id) => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/comments/${id}`, {
          method: "DELETE",
          headers: {
              "Authorization": `Bearer ${token}`,
          }
        })
          .then((r) => r.json())
          .then(deletedComment => {
            console.log(deletedComment)
            console.log(state)
            const updatedComments = state.filter(comment => comment.id !== deletedComment.id)
            setState(updatedComments)
          })
    }

    const handleUpdate = () => {
        console.log(formState)
        const token = localStorage.getItem("token")
        fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        body: JSON.stringify(formState),
        })
        .then((r) => r.json())
        .then((newComment) => {
            console.log(newComment);
            // props.setState((prevState => [...prevState, ]))
            // debugger
            setState((prevState) => ({
                ...prevState,
                comments: [...props.recipe.comments, newComment]
            }))
        })
        setFormState({recipe_id: current_recipe_id, content: ""})
    }

    return (
        <div className="comment-container">
            <p className="comment-title">Comments:</p>
            {/* <hr/> */}
            <section id="comments-list">
                {current_recipe_id && renderComments()}
            </section>
            <AddComment 
                formState={formState}
                setFormState={setFormState}
                recipe={props.recipe}
                renderNewComment={setState}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
        </div>
    )
}