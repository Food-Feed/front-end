import React from 'react'

export default function Comment(props) {
    console.log(props)

    // const updateComment = (e) => {
    //     e.preventDefault()
    //     props.handleUpdate()
    // }

    // const deleteComment = (e) => {
    //     e.preventDefault()
    //     props.handleDelete()
    // }

    return (
        <div className="comment">
            <p>@{props.comment.username}</p>
            <p>{props.comment.content}</p>
            {/* <p>{props.comment.created_at.split("T")[0]}</p> */}
            {props.user.id === props.comment.user_id && (
                <>
                <button className="buttons"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597717386/Food%20Feed/edit-new-icon-22_if53kc.png" width="20%"/></button>
                <button className="buttons"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597717386/Food%20Feed/3058-200_gkxsdp.png" width="20%"/></button>
              </>
            )}
            <hr/>
        </div>
        
    )
}