import React, { useState, useEffect, Fragment } from 'react'

export default function EditRecipe(props) {
    // console.log(props)
    const [editRecipeForm, setEditRecipeForm] = useState(false);
    const [state, setState] = useState({
        title: "",
        ingredients: [{id: '', ingred_detail: ''}],
        recipe_steps: [{id: '', step_detail: ''}]
      });

    const [ingredientState, setIngredientState] = useState([
        {id: '', ingred_detail: ''}
    ])

    const [recipeStepState, setRecipeStepState] = useState([
        {id: '', step_detail: ''}
    ])
    
    
    useEffect(() => {
    // console.log(props.recipeObj)
    if(props.recipeObj){
        setState({
            // image: props.recipeObj.image,
            // video: props.recipeObj.video,
            title: props.recipeObj.title,
            ingredients: props.recipeObj.ingredients,
            recipe_steps: props.recipeObj.recipe_steps,
        })
    }
    },[])
    // console.log(state)

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
        // console.log(state);
    };

    const changeHandlerFiles = (e) => {
        e.persist();
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.files[0],
        }));
        // console.log(state);
    };

    const handleIngredientChange = (index, e) => {
        e.persist();
        let active_ingred_id = state.ingredients[index].id
        const values = [...ingredientState]
        values[index].id = active_ingred_id
        values[index].ingred_detail = e.target.value
        setIngredientState(values)

        setState((prevState) => ({
            ...prevState,
            ingredients: prevState.ingredients.map(ingredient => {
                if(active_ingred_id === ingredient.id){
                  return {id: ingredient.id, ingred_detail: e.target.value}
                }
                return ingredient
            })
        }));
    }

    const handleRecipeStepChange = (index, e) => {
        e.persist();
        let active_step_id = state.recipe_steps[index].id
        const values = [...recipeStepState]
        values[index].id = active_step_id
        values[index].step_detail = e.target.value
        setRecipeStepState(values)
        setState((prevState) => ({
            ...prevState,
            recipe_steps: prevState.recipe_steps.map(recipe_step => {
                if(active_step_id === recipe_step.id){
                  return {id: recipe_step.id, step_detail: e.target.value}
                }
                return recipe_step
            })
        }));
        // console.log(props.formState)
    }

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

    const handleRecipeUpdate = (e) => {
        e.preventDefault()
        props.handleUpdate(state)
        setEditRecipeForm(false);
    };

    return (
        <>
            {editRecipeForm ? (
                <div className="modal">
                    <h1 id="edit-form-title">Edit Recipe</h1>
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
                        <label>Ingredients:</label>
                        {state.ingredients.map((ingredient, index) => (
                            <Fragment key={`${ingredient}~${index}`}>
                                <div>
                                    <label htmlFor="ingred_detail">Ingredient</label>
                                    <input
                                        type="text"
                                        // className="form-control"
                                        id={"ingred_detail"}
                                        name="ingred_detail"
                                        value={ingredient.ingred_detail}
                                        onChange={e => handleIngredientChange(index, e)}
                                    />
                                </div>
                                {/* <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIngredientFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddIngredientFields()}
                                    >
                                        +
                                    </button>
                                </div> */}
                            </Fragment>
                        ))}
                        {/* <input type="textarea" name="ingredients" onChange={changeHandler} value={state.ingred_list}/> */}
                        <br/>
                        <label>Directions:</label>
                        {state.recipe_steps.map((recipe_step, index) => (
                            <Fragment key={`${recipe_step}~${index}`}>
                                <div>
                                    <label htmlFor="recipe_step">Step</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipe_step"
                                        name="recipe_step"
                                        value={recipe_step.step_detail}
                                        onChange={e => handleRecipeStepChange(index, e)}
                                    />
                                </div>
                                {/* <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStepFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddStepFields()}
                                    >
                                        +
                                    </button>
                                </div> */}
                            </Fragment>
                        ))}
                        {/* <input type="textarea" name="recipe_steps" onChange={changeHandler} value={state.description}/> */}
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