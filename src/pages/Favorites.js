import React, { useState, useEffect, useRef, useContext} from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import styled from 'styled-components';
import firebase from '../firebase';

const Favorites = () => {
    const [recipeFavorites, setRecipeFavorites] = useContext(FavoritesContext);
    const [initiateRight, setInitiateRight] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const ref = firebase.firestore().collection("favorites");

    function getFavorites() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setFavorites(items);
            setLoading(false);
            console.log(items);
        })
    }

    useEffect(() => {
    console.log(deleteId)
    if (deleteId === "") {
        console.log("it's empty")
    } else {
    ref
        .doc(`${deleteId}`)
        ?.delete()
        .catch((err) => {
            console.error(err);
        });
    }
    }, [deleteId]);


    useEffect(() => {
        getFavorites();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    function handleNewFavorites() {
        setInitiateRight(true);
    }

    function deleteFavorites(event) {
        const id = event?.target?.id;
        console.log(id);
        setDeleteId(id);
        console.log("he pushed me");

    }


    return (
        <Container>
            <Left>
            <h1>Favorites</h1> <br></br>
            {favorites.map((favorites) => (
                <div>
                    <h2>{favorites.name}</h2>
                    <img src={favorites.photo} alt={favorites.name} />
                    <p>{favorites.instructions}</p>
                    <p>{favorites.mealId}</p>
                    <button id={favorites.mealId} onClick={deleteFavorites}>DELETE</button>
                </div>
            ))}
            </Left>
            {initiateRight && (
                <Right>
                    {/*
                    {favorites.map((favorites) => (
                <RecipeRandomizer>
                    <Section1>
                    <ImgVertical src={favorites.photo} alt={favorites.name} />
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
                ))}
                    */}
                </Right>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100vw;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`;

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


export default Favorites;