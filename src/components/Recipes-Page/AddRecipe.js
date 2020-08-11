import React, { useState } from 'react'

export default function AddRecipe(props) {
    const [state, setState] = useState([]);
    const [recipeForm, setRecipeForm] = useState(true);
    const [recipeId, setRecipeId] = useState("");

    const [formState, setFormState] = useState({
        title: "",
        image: "",
        video: "",
        ingred_list: "",
        description: "",
    });

    const displayFormHandler = () => {
        props.setRecipeForm((prevState) => {
          return !prevState;
        });
      };

    return (
        <>
            {props.recipeForm ? (
                <div className="form">
                    <h1>New Recipe</h1>
                    <form onSubmit={this.onSubmit}>
                        <label>Image Upload</label>
                        <input type="file" name="image" onChange={this.onChange}/>
                        <br/>
                        <label>Video Upload</label>
                        <input type="file" name="video" onChange={this.onChange}/>
                        <br/>
                        <input type="submit"/>
                    </form>
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