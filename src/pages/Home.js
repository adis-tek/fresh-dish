import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import useLocalStorage from '../useLocalStorage';
import { render } from '@testing-library/react';


function Home() {
    const delay = require('delay');
    const [selector, setSelector] = useState("Vegan");
    const [ingredient, setIngredient] = useState("Vegan");
    const [meals, setMeals] = useState([1]);
    const [randomMeal, setRandomMeal] = useState(0);
    const [mealId, setMealId] = useState("");
    const [recipe, setRecipe] = useState();
    const [youtubeURL, setYoutubeURL] = useState();

    const pickIngredient = async (event) => {
        if (event.target.value !== "") {
        const selectValue = event.target.value;
        setSelector(selectValue);
        setIngredient(selectValue);
        } else {
            console.log("event is an empty string");
        }
    }
    console.log(ingredient);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`)
        .then(function (response) {
            console.log(response.data.meals);
            setMeals(response.data.meals);
        })
        .catch (function (error) {
            console.log(error);
        });
    }, [ingredient]);

    console.log(meals);

    function checkMeals () {
        if (meals !== null || undefined) {
            return true;
        } else {
            return false;
        }
    }


    useEffect(() => {
        if (checkMeals) {
        const max = meals?.length;
        const randomNumber = Math.floor(Math.random() * max);
        console.log(randomNumber);
        setRandomMeal(randomNumber);
    } else {
        console.log("skip");
    }
    }, [ingredient]);

    console.log(randomMeal);

    useEffect(() => {
    if (randomMeal > meals?.length) {
        const max = meals?.length;
        const newRandomMeal = Math.floor(Math.random() * max);
        console.log("changed random meal");
        setRandomMeal(newRandomMeal);
    } else {
        console.log("randomMeal passes first test")
    }
}, [randomMeal]);

    useEffect(() => {
    if ((randomMeal + 1) > meals?.length) {
        console.log("randomMeal was about to output undefined");
        setRandomMeal(meals?.length - 1);
    } else {
        console.log("randomMeal passes second test");
    }
}, [meals, randomMeal]);

    useEffect(() => { 
        const id = meals[`${randomMeal}`]?.idMeal;
        console.log(id);
        console.log(meals[`${randomMeal}`]?.idMeal);
        setMealId(id);
    }, [meals, randomMeal]);

    console.log(mealId);

    useEffect(() => {
        if (mealId !== undefined) {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(function (response) {
            console.log(response.data?.meals[0]);
            setRecipe(response.data?.meals[0]);
        })
        .catch (function (error) {
            console.log(error);
        });
    } else {
        const changeRandomMeal = Math.floor(Math.random() * meals?.length);
        setRandomMeal(changeRandomMeal);
        setIngredient(ingredient);
        console.log("I changed randomMeal");
    }
    }, [mealId]);


    //console.log(recipe.map())
    /*useEffect(() => {
        const apiLink = recipe.strYoutube.slice(29);
        setYoutubeURL(`https://www.youtube.com/embed${apiLink}`);
    }, [])*/


    return (
        <div>
            <h1>Home</h1>
            <Select style={{minWidth: 200}} variant="outlined" displayEmpty value={selector} onChange={pickIngredient}>
                <MenuItem value="">Pick an ingredient</MenuItem>
                <MenuItem value="Beef">Beef</MenuItem>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Chicken">Chicken</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
                <MenuItem value="Goat">Goat</MenuItem>
                <MenuItem value="Lamb">Lamb</MenuItem>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                <MenuItem value="Pasta">Pasta</MenuItem>
                <MenuItem value="Pork">Pork</MenuItem>
                <MenuItem value="Seafood">Seafood</MenuItem>
                <MenuItem value="Side">Side</MenuItem>
                <MenuItem value="Starter">Starter</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
            </Select>

            <div>
                {mealId === undefined && (
                    <>
                        <h1>You didn't select an ingredient.</h1>
                    </>
            )}
            </div>

            <div>
                {recipe !== undefined && (
                    <>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <h1>{recipe.strMeal}</h1>
                    <h2>{recipe.strArea} Food</h2>
                    <h3>{recipe.strCategory}</h3>
                    <p>{recipe.strInstructions}</p>
                    <h4>Ingredients</h4>
                    <h5>{recipe.strIngredient1} {recipe.strMeasure1}</h5>
                    <h5>{recipe.strIngredient2} {recipe.strMeasure2}</h5>
                    <h5>{recipe.strIngredient3} {recipe.strMeasure3}</h5>
                    <h5>{recipe.strIngredient4} {recipe.strMeasure4}</h5>
                    <h5>{recipe.strIngredient5} {recipe.strMeasure5}</h5>
                    <h5>{recipe.strIngredient6} {recipe.strMeasure6}</h5>
                    <h5>{recipe.strIngredient7} {recipe.strMeasure7}</h5>
                    <h5>{recipe.strIngredient8} {recipe.strMeasure8}</h5>
                    <h5>{recipe.strIngredient9} {recipe.strMeasure9}</h5>
                    <h5>{recipe.strIngredient10} {recipe.strMeasure10}</h5>
                    <h5>{recipe.strIngredient11} {recipe.strMeasure11}</h5>
                    <h5>{recipe.strIngredient12} {recipe.strMeasure12}</h5>
                    <h5>{recipe.strIngredient13} {recipe.strMeasure13}</h5>
                    <h5>{recipe.strIngredient14} {recipe.strMeasure14}</h5>
                    <h5>{recipe.strIngredient15} {recipe.strMeasure15}</h5>
                    <h5>{recipe.strIngredient16} {recipe.strMeasure16}</h5>
                    <h5>{recipe.strIngredient17} {recipe.strMeasure17}</h5>
                    <h5>{recipe.strIngredient18} {recipe.strMeasure18}</h5>
                    <h5>{recipe.strIngredient19} {recipe.strMeasure19}</h5>
                    <h5>{recipe.strIngredient20} {recipe.strMeasure20}</h5>
                    {/* <iframe id="recipeVideo" width="520" height="360" src={youtubeURL} frameborder="0" allowfullscreen></iframe> */}
                    </>
                )}
            </div>
        </div>
    )
}

export default Home;