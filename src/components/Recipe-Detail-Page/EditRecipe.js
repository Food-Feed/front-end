import React, { useState, useEffect } from 'react'

export default function EditRecipe(props) {
    console.log(props)
    const [editRecipeForm, setEditRecipeForm] = useState(false);
    const [state, setState] = useState({
        // image: "",
        // video: "",
        title: "",
        ingred_list: "",
        description: "",
      });
    
    
    useEffect(() => {
    console.log(props.recipeObj)
    if(props.recipeObj){
        setState({
            // image: props.recipeObj.image,
            // video: props.recipeObj.video,
            title: props.recipeObj.title,
            ingred_list: props.recipeObj.ingred_list,
            description: props.recipeObj.description,
        })
    }
    },[])

    const displayFormHandler = () => {
        setEditRecipeForm((prevState) => {
            return !prevState;
        });
    };

    const changeHandler = (e) => {
        e.persist();
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        console.log(state);
    };

    const changeHandlerFiles = (e) => {
        e.persist();
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.files[0],
        }));
        console.log(state);
    };

    const handleRecipeUpdate = (e) => {
        e.preventDefault()
        props.handleUpdate(state)
        // const token = localStorage.getItem("token")

        // const form = new FormData()
        // form.append("image", props.formState.image)
        // form.append("video", props.formState.video)
        // form.append("title", props.formState.title)
        // form.append("ingred_list", props.formState.ingred_list)
        // form.append("description", props.formState.description)

        // fetch("http://localhost:3000/recipes", {
        //     method: "PATCH",
        //     headers: {
        //         "Authorization": `Bearer ${token}`,
        //     },
        //     body: form,
        // })
        //     .then((r) => r.json())
        //     .then((updatedRecipe) => {
        //         console.log(updatedRecipe)
        //         props.renderUpdatedRecipe((prevState => [updatedRecipe, ...prevState]))
        //     });
        // setState({title: "", ingred_list: "", description: ""});
        setEditRecipeForm(false);
    };

    return (
        <>
            {editRecipeForm ? (
                <div className="form">
                    <h1>Edit Recipe</h1>
                    <form onSubmit={handleRecipeUpdate}>
                        {/* <label>Image Upload:</label>
                        <input type="file" name="image" onChange={changeHandlerFiles} value={state.image}/>
                        <br/>
                        <label>Video Upload</label>
                        <input type="file" name="video" onChange={changeHandlerFiles} value={state.video}/>
                        <br/> */}
                        <label>Title:</label>
                        <input type="text" name="title" onChange={changeHandler} value={state.title}/>
                        <br/>
                        <label>Ingredient List:</label>
                        <input type="textarea" name="ingred_list" onChange={changeHandler} value={state.ingred_list}/>
                        <br/>
                        <label>Description:</label>
                        <input type="textarea" name="description" onChange={changeHandler} value={state.description}/>
                        <br/>
                        <input type="submit"/>
                    </form>
                    <button
                        onClick={displayFormHandler}
                        className="buttons"
                    >
                        Cancel
                </button>
                </div>
                ) : (
                <button
                    onClick={displayFormHandler}
                    className="buttons"
                >
                    <img src="https://res.cloudinary.com/hsk23/image/upload/v1597717386/Food%20Feed/edit-new-icon-22_if53kc.png" width="10%"/>
                </button>
            )}
        </>
    )
}