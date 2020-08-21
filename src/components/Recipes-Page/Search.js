import React, { useState } from 'react'

// props: query={query} onChange={handleSetQuery} key={query}

export default function Search(props) {
    // const [state, setState] = useState("")

    const handleChange = e => {
        props.handleSetQuery(e.target.value)
        console.log(e.target.value)
    }

    return (
        <form className="ui search">
        <div className="ui icon input">
            <input className="prompt" onChange={handleChange} value={props.query} />
            <i className="search icon" />
        </div>
        </form>
    )
}
