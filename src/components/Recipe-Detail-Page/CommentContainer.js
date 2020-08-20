import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './RecipeDetail.css'

export default function CommentContainer(props) {
    // const [state, setState] = useState([]);
    // const [commentForm, setCommentForm] = useState();
    // const [commentId, setCommentId] = useState("");
    // console.log(state)
    const current_recipe_id = props.recipe.id

    const [formState, setFormState] = useState({
        recipe_id: current_recipe_id,
        content: ""
    });

    const renderComments = () => {
        return props.comments.map(comment => (
            <Comment
                comment={comment}
                key={comment.id}
                user={props.user}
                // handleUpdate={handleUpdate}
                // handleDelete={handleDelete}
            />
        ))
    }

    const handleDelete = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/comments`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
          }
        })
          .then((r) => r.json())
          .then(deletedComment => {
            console.log(deletedComment)
          })
    }

    // const handleUpdate = () => {
    //     console.log(formState)
    //     const token = localStorage.getItem("token")
    //     fetch("http://localhost:3000/comments", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`,
    //         "Accept": "application/json",
    //     },
    //     body: JSON.stringify(formState),
    //     })
    //     .then((r) => r.json())
    //     .then((newComment) => {
    //         console.log(newComment);
    //         // props.setState((prevState => [...prevState, ]))
    //         // debugger
    //         props.setState((prevState) => ({
    //             ...prevState,
    //             comments: [...props.recipe.comments, newComment]
    //         }))
    //     })
    //     setFormState({recipe_id: current_recipe_id, content: ""})
    // }

    return (
        <div className="comment-container">
            <p className="comment-title">Comments:</p>
            {/* <hr/> */}
            <section id="comments-list">
                {props.comments && renderComments()}
            </section>
            <AddComment 
                formState={formState}
                setFormState={setFormState}
                recipe={props.recipe}
                // handleUpdate={handleUpdate}
            />
        </div>
    )
}