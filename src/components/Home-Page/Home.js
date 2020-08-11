import React, { useState, useEffect } from 'react'

export default function RecipeContainer() {

    return (
        <div>
            <section className="photo-box">
                <img src="https://res.cloudinary.com/hsk23/image/upload/v1597108311/Food%20Feed/pexels-photo-1640774_hzwyzf.jpg" alt="food background" width="100%"></img>
                <section className="text">
                    {/* <img src="https://res.cloudinary.com/hsk23/image/upload/v1597112868/Food%20Feed/foodfeedlogo_black.001_rjimql.png" alt="food-feed"></img> */}
                    <h1>Welcome</h1>
                    <h3>Come Cook With Us</h3>
                </section>
            </section>
        </div>
    )
}