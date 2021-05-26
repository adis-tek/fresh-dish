import React, { useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import { Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
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
    const [favoriteAnimation, setFavoriteAnimation] = useState(false);
    const [ pop, setPop ] = useState(0);

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
        setFavoriteAnimation(true)
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

    function dash(measurement) {
        if (measurement) {
            return ("-")
        } else {
            console.log("No measurement")
        }
    }

    return (
        <Container1>
            {error && <h1>{error}</h1>}
            <Link to ="/update-profile" />
            <Container2>
            <Selector>
                <StyledSelect style={{minWidth: 200}} variant="outlined" displayEmpty value={selector} onClick={() => {setFavoriteAnimation(false)}} onChange={pickIngredient}>
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
                </StyledSelect>
            </Selector>

                {selector === "" && (
                <IntroContainer>
                    <Intro>
                        <IntroHeader>Explore New Recipes!</IntroHeader>
                        <IntroSubtitle>Simply pick a category and<br></br>see what you get.</IntroSubtitle>
                        <IntroParagraph>Recipes are selected at random. Add to your favorites the recipes you find interesting by simply pressing the favorites button.</IntroParagraph>
                        <IntroParagraph>Be sure to log in or sign up if<br></br>you'd like to save recipes.</IntroParagraph>
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
                    {recipe.strIngredient1 && ( <Ingredient>{recipe.strIngredient1} {dash(recipe.strMeasure1)} {recipe.strMeasure1}</Ingredient>)}
                    {recipe.strIngredient2 && (<Ingredient>{recipe.strIngredient2} {dash(recipe.strMeasure2)} {recipe.strMeasure2}</Ingredient>)}
                    {recipe.strIngredient3 && (<Ingredient>{recipe.strIngredient3} {dash(recipe.strMeasure3)} {recipe.strMeasure3}</Ingredient>)}
                    {recipe.strIngredient4 && (<Ingredient>{recipe.strIngredient4} {dash(recipe.strMeasure4)} {recipe.strMeasure4}</Ingredient>)}
                    {recipe.strIngredient5 && (<Ingredient>{recipe.strIngredient5} {dash(recipe.strMeasure5)} {recipe.strMeasure5}</Ingredient>)}
                    {recipe.strIngredient6 && (<Ingredient>{recipe.strIngredient6} {dash(recipe.strMeasure6)} {recipe.strMeasure6}</Ingredient>)}
                    {recipe.strIngredient7 && (<Ingredient>{recipe.strIngredient7} {dash(recipe.strMeasure7)} {recipe.strMeasure7}</Ingredient>)}
                    {recipe.strIngredient8 && (<Ingredient>{recipe.strIngredient8} {dash(recipe.strMeasure8)} {recipe.strMeasure8}</Ingredient>)}
                    {recipe.strIngredient9 && (<Ingredient>{recipe.strIngredient9} {dash(recipe.strMeasure9)} {recipe.strMeasure9}</Ingredient>)}
                    {recipe.strIngredient10 && (<Ingredient>{recipe.strIngredient10} {dash(recipe.strMeasure10)} {recipe.strMeasure10}</Ingredient>)}
                    </IngredientContainer>
                    <IngredientContainer>
                    {recipe.strIngredient11 && (<Ingredient>{recipe.strIngredient11} {dash(recipe.strMeasure11)} {recipe.strMeasure11}</Ingredient>)}
                    {recipe.strIngredient12 && (<Ingredient>{recipe.strIngredient12} {dash(recipe.strMeasure12)} {recipe.strMeasure12}</Ingredient>)}
                    {recipe.strIngredient13 && (<Ingredient>{recipe.strIngredient13} {dash(recipe.strMeasure13)} {recipe.strMeasure13}</Ingredient>)}
                    {recipe.strIngredient14 && (<Ingredient>{recipe.strIngredient14} {dash(recipe.strMeasure14)} {recipe.strMeasure14}</Ingredient>)}
                    {recipe.strIngredient15 && (<Ingredient>{recipe.strIngredient15} {dash(recipe.strMeasure15)} {recipe.strMeasure15}</Ingredient>)}
                    {recipe.strIngredient16 && (<Ingredient>{recipe.strIngredient16} {dash(recipe.strMeasure16)} {recipe.strMeasure16}</Ingredient>)}
                    {recipe.strIngredient17 && (<Ingredient>{recipe.strIngredient17} {dash(recipe.strMeasure17)} {recipe.strMeasure17}</Ingredient>)}
                    {recipe.strIngredient18 && (<Ingredient>{recipe.strIngredient18} {dash(recipe.strMeasure18)} {recipe.strMeasure18}</Ingredient>)}
                    {recipe.strIngredient19 && (<Ingredient>{recipe.strIngredient19} {dash(recipe.strMeasure19)} {recipe.strMeasure19}</Ingredient>)}
                    {recipe.strIngredient20 && (<Ingredient>{recipe.strIngredient20} {dash(recipe.strMeasure20)} {recipe.strMeasure20}</Ingredient>)}
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
                        {favoriteAnimation && (
                        <MessageContainer><Message>Added to favorites!</Message></MessageContainer>
                        )}
                    </Favorites>
                    <Favorites>
                    <Link to="/favorites"><FavoritesButton>Go to Favorites</FavoritesButton></Link>
                    </Favorites>
                    <SourceLinks>
                    <RecipeSource href={recipe.strSource} target="_blank">Where This Recipe Came From</RecipeSource>
                    </SourceLinks>
                    </TextContainer>
                    <ImageSection>
                    <Img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    {youtubeURL && <Youtube><iframe id="recipeVideo" width="300" height="200" src={youtubeURL} frameborder="0" allowfullscreen></iframe></Youtube>}
                    </ImageSection>
                    </Section1>
                </RecipeRandomizer>
                )}
        </Container2>
    </Container1>
    )
    
}

const StyledSelect = styled(Select)({
    background: '#FF8E53',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    overflow: 'hidden',
    outline: 'none',
  });

const Container1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 0px;
    @media (min-width: 1500px) {
    position: absolute;
    width: 1500px;
    align-self: center;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    }
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
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 90%;
    height: auto;
    border-radius: 20px;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, .15);
    @media (min-width: 750px) {
        width: 650px;
    }
`;

const Intro = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    height: auto;
    margin: 40px 20px;
    align-items: center;
    @media (max-width: 500px) {
        width: 90%;
    }
`;

const IntroHeader = styled.h1`
    text-align: center;
    width: 100%;
    height: auto;
    @media (max-width: 500px) {
        font-size: 28px;
    }
    @media (max-width: 375px) {
        font-size: 25px;
    }
`;

const IntroSubtitle = styled.h3`
    text-align: center;
    width: 100%;
    height: auto;
    margin-top: 20px;
    font-size: 22px;
    @media (max-width: 500px) {
        font-size: 20px;
    }
    @media (max-width: 375px) {
        font-size: 18px;
    }
`;

const IntroParagraph = styled.p`
    text-align: center;
    width: 100%;
    height: auto;
    margin-top: 20px;
    font-size: 20px;
    @media (max-width: 500px) {
        max-width: 85%;
        font-size: 18px;
    }
    @media (max-width: 375px) {
        font-size: 16px;
    }
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
    @media (max-width: 450px) {
    display: flex;
    align-self: center;
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
    font-size: 24px;
`;

const Instructions = styled.p`
    margin: 20px 50px;
    width: 90%;
    line-height: 1.5em;
    @media (max-width: 450px) {
    }
`;

const IngredientSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    height: auto;
    @media (max-width: 450px) {
        flex-direction: column;
    }
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
    height: auto;
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
    @media (max-width: 450px) {
        align-self: flex-start;
        margin-left: 7.5px;
    }
`;

const Favorites = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    width: 90%;
    margin: 5px;
    @media (max-width: 425px) {
        align-items: flex-start;
        justify-items: flex-start;
        flex-direction: column;
    }
`;

const FavoritesButton = styled.button`
    width: 180px;
    height: 50px;
    align-self: flex-start;
    background: #FF8E53;
    color: white;
    border-radius: 3px;
    outline: none;
    border: none;
    margin-right: 30px;
    margin-bottom: 10px;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, .15);
    cursor: pointer;
    animation: favoritesAdded 1s linear;
    animation-iteration-count: 1;
    font-size: 16px;
`;

const MessageContainer = styled.div`
    width: auto;
    height: auto;
    background-color: white;
    border: 0.5px solid #FF8E53;
    animation: pop 1s linear;
    animation-iteration-count: 1;
    margin-bottom: 10px;
    @media (max-width: 425px) {
        margin-top: 10px;
    }
`;

const Message = styled.h5`
    margin: 15px;
    color: #FF8E53;
    font-size: 16px;
    @media (max-width: 425px) {
        font-size: 15.5px;
    }

`;

const SourceLinks = styled.div`
    display: flex;
    align-self: center;
    align-items: flex-start;
    width: 90%;
`;

const RecipeSource = styled.a`
    text-decoration: none;
    color: #FF8E53;
    font-style: bold;
`;