import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'

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

    return (
        <div className="comment-container">
            <h5>Comments:</h5>
            {props.comments && renderComments()}
            <AddComment 
                commentForm={commentForm}
                renderNewComment={setState}
                commentId={commentId}
                formState={formState}
                setIsNew={setCommentId}
                setFormState={setFormState}
                recipe={props.recipe}
            />
        </div>
    )
}