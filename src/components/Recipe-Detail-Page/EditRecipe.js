import React from 'react'

export default function EditRecipe(props) {

    const displayFormHandler = () => {
        props.setRecipeForm((prevState) => {
          return !prevState;
        });
    };

    const changeHandler = (e) => {
        e.persist();
        props.setFormState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        console.log(props.formState);
    };

    const changeHandlerFiles = (e) => {
        e.persist();
        props.setFormState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.files[0],
        }));
        console.log(props.formState);
    };

    const handleRecipeCreation = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")

        const form = new FormData()
        form.append("image", props.formState.image)
        form.append("video", props.formState.video)
        form.append("title", props.formState.title)
        form.append("ingred_list", props.formState.ingred_list)
        form.append("description", props.formState.description)

        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: form,
        })
            .then((r) => r.json())
            .then((newRecipe) => {
                console.log(newRecipe)
                props.renderNewRecipe((prevState => [newRecipe, ...prevState]))
            });
        props.setFormState({image: "", video: "", title: "", ingred_list: "", description: ""});
        props.setRecipeForm(false);
    };

    return (
        <>
            {props.recipeForm ? (
                <div className="form">
                    <h1>New Recipe</h1>
                    <form onSubmit={handleRecipeCreation}>
                        <label>Image Upload:</label>
                        <input type="file" name="image" onChange={changeHandlerFiles}/>
                        <br/>
                        <label>Video Upload</label>
                        <input type="file" name="video" onChange={changeHandlerFiles}/>
                        <br/>
                        <label>Title:</label>
                        <input type="text" name="title" onChange={changeHandler}/>
                        <br/>
                        <label>Ingredient List:</label>
                        <input type="textarea" name="ingred_list" onChange={changeHandler}/>
                        <br/>
                        <label>Instructions:</label>
                        <input type="textarea" name="description" onChange={changeHandler}/>
                        <br/>
                        <input type="submit"/>
                    </form>
                    <button
                        onClick={displayFormHandler}
                        className=""
                    >
                        Cancel
                </button>
                </div>
                ) : (
                <button
                    onClick={displayFormHandler}
                    className=""
                >
                    Add Recipe
                </button>
            )}
        </>
    )
}