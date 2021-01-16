import React from 'react'
import './Home.css'

export default function RecipeContainer(props) {
    // console.log(props);

    return (
        <div>
            <section className="photo-box">
                <img src="https://res.cloudinary.com/hsk23/image/upload/v1597909753/Food%20Feed/shutterstock_1529397620_wcmgyb.jpg" alt="food background" width="100%" id="plate-photo"></img>
                <section className="text">
                    {/* <img src="https://res.cloudinary.com/hsk23/image/upload/v1597112868/Food%20Feed/foodfeedlogo_black.001_rjimql.png" alt="food-feed"></img> */}
                    <p id="welcome-text">Welcome.</p>
                    <hr id="line" />
                    <p id="cook-text">Come Cook With Us</p>
                </section>
            </section>
            <section className="mission">
                <p id="mission-header">Our Mission</p>
                <p id="mission-text">FoodFeed is the cooking hub for everyone. 
                    We aim to solve all the problems that you face while cooking or following a recipe.
                    Ever trusted the total cook time only to find it took much longer? We solved it.
                    Ever had your hands full while prepping, but needed to rewind the video you're following? We solved it.
                    Ever seen a recipe online and then lost the link? We solved it.<br/>
                    <b>Cook with us and cook happier.</b>
                </p>
            </section>
        </div>
    );
}