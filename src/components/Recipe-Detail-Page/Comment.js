import React, { useState, useEffect } from 'react'
import EditComment from './EditComment'

export default function Comment(props) {
    console.log(props)
    const [editForm, setEditForm] = useState({
        content: ""
    })

    const updateComment = (e) => {
        e.preventDefault()
        return <EditComment 
            editForm={editForm}
            setEditForm={setEditForm}
            comment={props.comment}
        />
    }

    const deleteComment = (e) => {
        e.preventDefault()
        props.handleDelete(props.comment.id)
    }

    return (
        <div className="comment">
            <p>@{props.comment.username}</p>
            <p>{props.comment.content}</p>
            {/* <p>{props.comment.created_at.split("T")[0]}</p> */}
            {props.user.id === props.comment.user_id && (
                <>
                <button onClick={updateComment} className="buttons"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597717386/Food%20Feed/edit-new-icon-22_if53kc.png" width="20%"/></button>
                <button onClick={deleteComment} className="buttons"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597717386/Food%20Feed/3058-200_gkxsdp.png" width="20%"/></button>
              </>
            )}
            <hr/>
        </div>
        
    )
}