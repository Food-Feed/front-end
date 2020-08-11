import React, { useEffect, useState } from 'react'
import Comment from './Comment'

export default function CommentContainer(props) {

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
        </div>
    )
}