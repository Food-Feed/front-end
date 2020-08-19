import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './RecipeDetail.css'

export default function CommentContainer(props) {
    const [state, setState] = useState([]);
    const [commentForm, setCommentForm] = useState();
    const [commentId, setCommentId] = useState("");

    const [formState, setFormState] = useState({
        recipe_id: "",
        content: ""
    });

    const renderComments = () => {
        return props.comments.map(comment => (
            <Comment
                comment={comment}
                key={comment.id}
            />
        ))
    }

    const handleDelete = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/recipes/${props.match.params.id}`, {
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

    return (
        <div className="comment-container">
            <p className="comment-title">Comments:</p>
            <section id="comments-list">
                {props.comments && renderComments()}
            </section>
            <AddComment 
                commentForm={commentForm}
                renderNewComment={setState}
                commentId={commentId}
                formState={formState}
                setIsNew={setCommentId}
                setFormState={setFormState}
                recipe={props.recipe}
            />
            {state.user_id == props.user.id && (
              <>
                <button>Edit Recipe</button>
                <button onClick={handleDelete}>Delete Recipe</button>
              </>
            )}
        </div>
    )
}