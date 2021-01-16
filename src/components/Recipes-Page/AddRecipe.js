import React, { useState, Fragment } from 'react'
import styled from 'styled-components';
import LoadingBar from './LoadingBar'

export default function AddRecipe(props) {

    const [state, setState] = useState({
        image: "",
        video: "",
        title: "",
        // ingredients: [{ingred_detail: ''}],
        // recipe_steps: [{step_detail: ''}]
    })

    const [ingredientState, setIngredientState] = useState([
        {ingred_detail: ''}
    ])

    const [recipeStepState, setRecipeStepState] = useState([
        {step_detail: ''}
    ])

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

    const handleIngredientChange = (index, e) => {
        e.persist();
        const values = [...ingredientState]
        values[index].ingred_detail = e.target.value
        setIngredientState(values)
        props.setFormState((prevState) => ({
            ...prevState,
            ingredients: values
        }));
        console.log(props.formState)
    }

    const handleRecipeStepChange = (index, e) => {
        e.persist();
        const values = [...recipeStepState]
        values[index].step_detail = e.target.value
        setRecipeStepState(values)
        props.setFormState((prevState) => ({
            ...prevState,
            recipe_steps: values
        }));
        console.log(props.formState)
    }

    const changeHandlerFiles = (e) => {
        e.persist();
        props.setFormState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.files[0],
        }));
        console.log(props.formState);
    };

    const handleAddIngredientFields = () => {
        const values = [...ingredientState]
        values.push({ingred_detail: ''})
        setIngredientState(values)
    }

    const handleRemoveIngredientFields = (index) => {
        const values = [...ingredientState]
        values.splice(index, 1)
        setIngredientState(values)
    }

    const handleAddStepFields = () => {
        const values = [...recipeStepState]
        values.push({step_detail: ''})
        setRecipeStepState(values)
    }

    const handleRemoveStepFields = (index) => {
        const values = [...recipeStepState]
        values.splice(index, 1)
        setRecipeStepState(values)
    }

    // const activateLoadBar = () => {
    //     return <LoadingBar />
    // }

    const handleRecipeCreation = (e) => {
        props.activateLoadBar()
        e.preventDefault();
        // console.log("ingredients state", ingredientState)
        // console.log("recipe state", props.formState)
        const token = localStorage.getItem("token")

        const form = new FormData()
        form.append("image", props.formState.image)
        form.append("video", props.formState.video)
        form.append("title", props.formState.title)
        form.append("ingredients", JSON.stringify(props.formState.ingredients))
        form.append("recipe_steps", JSON.stringify(props.formState.recipe_steps))

        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: form,
        })
            .then((r) => r.json())
            .then((newRecipe) => {
                // console.log(newRecipe)
                props.renderNewRecipe((prevState => [newRecipe, ...prevState]))
                props.setRecipeForm(false);
            });
        props.setFormState({image: "", video: "", title: "", ingredients: [{ingred_detail: ''}], recipe_steps: [{step_detail: ''}]});
    };

    return (
        <>
            {props.recipeForm ? (
                <div className="modal">
                    <h1 id="main-form-title">New Recipe</h1>
                    <form onSubmit={handleRecipeCreation}>
                        <label class="form-section-title">Image Upload:</label><br/>
                        <input type="file" name="image" onChange={changeHandlerFiles} className="upload-buttons"/>
                        <br id="break"/>
                        <label class="form-section-title">Video Upload:</label><br/>
                        <input type="file" name="video" onChange={changeHandlerFiles} className="upload-buttons"/>
                        <br id="break"/>
                        <label class="form-section-title">Title:</label><br/>
                        <input type="text" name="title" onChange={changeHandler} className="form-field-ingred"/>
                        <br id="break"/>
                        <label class="form-section-title">Ingredients:</label>
                        {ingredientState.map((ingredient, index) => (
                            <Fragment key={`${ingredient}~${index}`}>
                                <div>
                                    <label htmlFor="ingred_detail">Ingredient</label><br/>
                                    <input
                                        type="text"
                                        className="form-field-ingred"
                                        id="ingred_detail"
                                        name="ingred_detail"
                                        value={ingredient.ingred_detail}
                                        onChange={e => handleIngredientChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        id="add-subtr-buttons"
                                        onClick={() => handleRemoveIngredientFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        id="add-subtr-buttons"
                                        onClick={() => handleAddIngredientFields()}
                                    >
                                        +
                                    </button>
                                </div>
                            </Fragment>
                        ))}
                        {/* <input type="textarea" name="ingred_list" onChange={changeHandler}/> */}
                        <br id="break"/>
                        <label class="form-section-title">Directions:</label>
                        {recipeStepState.map((recipe_step, index) => (
                            <Fragment key={`${recipe_step}~${index}`}>
                                <div>
                                    <label htmlFor="recipe_step">Step</label><br/>
                                    <input
                                        type="text"
                                        className="form-field-ingred"
                                        id="recipe_step"
                                        name="recipe_step"
                                        value={recipe_step.step_detail}
                                        onChange={e => handleRecipeStepChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        id="add-subtr-buttons"
                                        onClick={() => handleRemoveStepFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        id="add-subtr-buttons"
                                        onClick={() => handleAddStepFields()}
                                    >
                                        +
                                    </button>
                                </div>
                            </Fragment>
                        ))}
                        {/* <input type="textarea" name="description" onChange={changeHandler}/> */}
                        <br id="break"/>
                        <input type="submit" className="buttons"/>
                        <button
                            type="button"
                            onClick={displayFormHandler}
                            className="buttons"
                        >
                            Cancel
                        </button>
                    </form>
                    {props.loadBarOn ? <LoadingBar /> : null}
                    
                </div>
                ) : (
                <button
                    onClick={displayFormHandler}
                    className="add-recipe-button"
                >
                    +
                </button>
            )}
        </>
    )
}