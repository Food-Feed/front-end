import React from 'react'

export default function Comment(props) {
    console.log(props)
    return (
        <div className="comment">
            <p>{props.comment.created_at}</p>
            <p>{props.comment.user_name}</p>
            <p>{props.comment.content}</p>
        </div>
        
    )
}