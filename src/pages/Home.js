import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import useLocalStorage from '../useLocalStorage';
import { render } from '@testing-library/react';
import { Link, useHistory } from 'react-router-dom';
import { FavoritesContext } from '../contexts/FavoritesContext';
import firebase from '../firebase';


export default function Home() {
    const delay = require('delay');
    const [selector, setSelector] = useState("");
    const [ingredient, setIngredient] = useState("Dessert");
    const [meals, setMeals] = useState([1]);
    const [randomMeal, setRandomMeal] = useState(0);
    const [mealId, setMealId] = useState("");
    const [recipe, setRecipe] = useState();
    const [youtubeURL, setYoutubeURL] = useState();
    const [error, setError] = useState("");
    const { currentUser, logOut } = useAuth();
    const history = useHistory();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection("favorites");


    async function handleLogout() {
        setError("")

        try {
            await logOut()
            history.push('/login')

        } catch {
            setError("failed to log out")
        }
        
    }

    function addFavorite(newFavorite) {
        ref
            .doc(mealId)
            .set(newFavorite)
            .catch ((err) => {
                console.error(err);
            })
    }



    const pickIngredient = async (event) => {
        if (event.target.value !== "") {
        const selectValue = event.target.value;
        setSelector(selectValue);
        setIngredient(selectValue);
    }
};

    console.log(ingredient);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`)
        .then(function (response) {
            console.log(response.data?.meals);
            setMeals(response.data?.meals);
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
        if (meals === null) {
            console.log("meals is currently null");
        } else {
        const id = meals[`${randomMeal}`]?.idMeal;
        console.log(id);
        console.log(meals[`${randomMeal}`]?.idMeal);
        setMealId(id);
        }
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

    console.log(recipe)
    useEffect(() => {
        const apiLink = recipe?.strYoutube.slice(32);
        console.log(apiLink)
        setYoutubeURL(`https://www.youtube.com/embed/${apiLink}`);
    }, [recipe])

    function handleNewFavorites() {
        console.log("favorite button");
        //setRecipeFavorites(prevFavorites => [...prevFavorites, "New favorite added"]);
    }


    return (
        <Container1>
            {error && <h1>{error}</h1>}
            <Link to ="/update-profile" />
            <Container2>
            <Selector>
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
            </Selector>

                {selector === "" && (
                <IntroContainer>
                    <Intro>
                        <IntroHeader>Explore New Recipes</IntroHeader>
                        <IntroSubtitle>Simply pick a category and see what you get</IntroSubtitle>
                        <IntroParagraph>Recipes are selected at random. Add to your favorites the recipes you find interesting by simply pressing the favorites button.</IntroParagraph>
                        <IntroParagraph>Be sure to log in or sign up if you'd like to save recipes.</IntroParagraph>
                    </Intro>
                </IntroContainer>
            )}

                {selector !== "" && (
                <RecipeRandomizer>
                    <Section1>
                    <ImgVertical src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <TextContainer>
                    <Title>{recipe.strMeal}</Title>
                    <Subtitle>{recipe.strArea} Recipe - {recipe.strCategory}</Subtitle>
                    <Ingredients>Ingredients</Ingredients>
                    <IngredientSection>
                    <IngredientContainer>
                    <Ingredient>{recipe.strIngredient1} {recipe.strMeasure1}</Ingredient>
                    <Ingredient>{recipe.strIngredient2} {recipe.strMeasure2}</Ingredient>
                    <Ingredient>{recipe.strIngredient3} {recipe.strMeasure3}</Ingredient>
                    <Ingredient>{recipe.strIngredient4} {recipe.strMeasure4}</Ingredient>
                    <Ingredient>{recipe.strIngredient5} {recipe.strMeasure5}</Ingredient>
                    <Ingredient>{recipe.strIngredient6} {recipe.strMeasure6}</Ingredient>
                    <Ingredient>{recipe.strIngredient7} {recipe.strMeasure7}</Ingredient>
                    <Ingredient>{recipe.strIngredient8} {recipe.strMeasure8}</Ingredient>
                    <Ingredient>{recipe.strIngredient9} {recipe.strMeasure9}</Ingredient>
                    <Ingredient>{recipe.strIngredient10} {recipe.strMeasure10}</Ingredient>
                    </IngredientContainer>
                    <IngredientContainer>
                    <Ingredient>{recipe.strIngredient11} {recipe.strMeasure11}</Ingredient>
                    <Ingredient>{recipe.strIngredient12} {recipe.strMeasure12}</Ingredient>
                    <Ingredient>{recipe.strIngredient13} {recipe.strMeasure13}</Ingredient>
                    <Ingredient>{recipe.strIngredient14} {recipe.strMeasure14}</Ingredient>
                    <Ingredient>{recipe.strIngredient15} {recipe.strMeasure15}</Ingredient>
                    <Ingredient>{recipe.strIngredient16} {recipe.strMeasure16}</Ingredient>
                    <Ingredient>{recipe.strIngredient17} {recipe.strMeasure17}</Ingredient>
                    <Ingredient>{recipe.strIngredient18} {recipe.strMeasure18}</Ingredient>
                    <Ingredient>{recipe.strIngredient19} {recipe.strMeasure19}</Ingredient>
                    <Ingredient>{recipe.strIngredient20} {recipe.strMeasure20}</Ingredient>
                    </IngredientContainer>
                    </IngredientSection>
                    <Instructions>{recipe.strInstructions}</Instructions>
                    <Favorites>
                        <FavoritesButton onClick={() => addFavorite({
                            name: recipe.strMeal,
                            photo: recipe.strMealThumb,
                            country: recipe.strArea,
                            category: recipe.strCategory,
                            ingredients: [
                                recipe.strIngredient1,
                                recipe.strIngredient2,
                                recipe.strIngredient3,
                                recipe.strIngredient4,
                                recipe.strIngredient5,
                                recipe.strIngredient6,
                                recipe.strIngredient7,
                                recipe.strIngredient8,
                                recipe.strIngredient9,
                                recipe.strIngredient10,
                                recipe.strIngredient11,
                                recipe.strIngredient12,
                                recipe.strIngredient13,
                                recipe.strIngredient14,
                                recipe.strIngredient15,
                                recipe.strIngredient16,
                                recipe.strIngredient17,
                                recipe.strIngredient18,
                                recipe.strIngredient19,
                                recipe.strIngredient20
                            ],
                            measurements: [
                                recipe.strMeasure1,
                                recipe.strMeasure2,
                                recipe.strMeasure3,
                                recipe.strMeasure4,
                                recipe.strMeasure5,
                                recipe.strMeasure6,
                                recipe.strMeasure7,
                                recipe.strMeasure8,
                                recipe.strMeasure9,
                                recipe.strMeasure10,
                                recipe.strMeasure11,
                                recipe.strMeasure12,
                                recipe.strMeasure13,
                                recipe.strMeasure14,
                                recipe.strMeasure15,
                                recipe.strMeasure16,
                                recipe.strMeasure17,
                                recipe.strMeasure18,
                                recipe.strMeasure19,
                                recipe.strMeasure20
                            ],
                            instructions: recipe.strInstructions,
                            recipeSource: recipe.strSource,
                            youtubeVideo: youtubeURL,
                            mealId: mealId,
                            })}>
                        Add to Favorites
                        </FavoritesButton>
                    </Favorites>
                    <SourceLinks>
                    <RecipeSource href={recipe.strSource} target="_blank">Where This Recipe Came From</RecipeSource>
                    </SourceLinks>
                    </TextContainer>
                    <ImageSection>
                    <Img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    {youtubeURL && <Youtube><iframe id="recipeVideo" width="450" height="250" src={youtubeURL} frameborder="0" allowfullscreen></iframe></Youtube>}
                    </ImageSection>
                    </Section1>
                </RecipeRandomizer>
                )}
        </Container2>
    </Container1>
    )
}

const Container1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 0px;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

`;

const Selector = styled.div`
    margin: 0px;
`;

const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin: 40px 20px;
    border: 0.5px solid orange;
    width: 100%;
    height: auto;
`;

const Intro = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;
    margin: 40px 20px;
`;

const IntroHeader = styled.h1`
    text-align: center;
    width: 100%;
    height: auto;
`;

const IntroSubtitle = styled.h3`
    text-align: center;
    width: 100%;
    height: auto;
    margin-top: 20px;
`;

const IntroParagraph = styled.p`
    text-align: center;
    width: 100%;
    height: auto;
    margin-top: 20px;
`;

const RecipeRandomizer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: 110%;
    margin: 0px 30px;
    @media (max-width: 1000px) {
        margin: 0px;
    }
`;

const Img = styled.img`
    width: 100%;
    height: auto;
    align-self: flex-start;
    margin: 0px 30px;
    @media (max-width: 1000px) {
    display: none;
    }
`;

const ImgVertical = styled.img`
    display: none;
    @media (max-width: 1000px) {
    display: flex;
    align-self: center;
    width: 90%;
    height: auto;
    margin-bottom: 15px;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    width: 100%;
    @media (max-width: 1000px) {
    width: 100%;
    margin: 0;
    align-items: center;
    justify-content: center;
    }
`;

const Title = styled.h1`
    margin-top: 10px;
    text-align: left;
    width: 90%;
`;

const Subtitle = styled.h2`
    margin: 10px 0px;
    text-align: left;
    width: 90%;
`;

const Instructions = styled.p`
    margin: 20px 50px;
    width: 90%;
    line-height: 1.5em;

`;

const IngredientSection = styled.div`
    display: flex;
    width: 90%;
`;

const IngredientContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Ingredients = styled.h4`
    margin: 10px 0px;
    width: 90%;
`;

const Ingredient = styled.h5`
    margin: 5px 0px;
    width: 100%;
`;

const Section1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
    margin-bottom: 30px;
    @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }
`;

const Youtube = styled.div`
    display: flex;
    align-self: center;
    margin: 30px 0px;
`;

const Favorites = styled.div`
    width: 90%;
    margin: 20px;
`;

const FavoritesButton = styled.button`
    width: 180px;
    height: 50px;
    align-self: flex-start;
    background: orange;
    color: white;
    border-radius: 20px;
`;

const SourceLinks = styled.div`
    display: flex;
    align-self: center;
    align-items: flex-start;
    width: 90%;
`;

const RecipeSource = styled.a`
    text-decoration: none;
    color: orange;
    font-style: bold;
`;