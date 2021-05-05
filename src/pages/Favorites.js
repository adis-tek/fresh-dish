import React, { useState, useEffect, useRef, useContext} from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import styled from 'styled-components';
import firebase from '../firebase';

const Favorites = () => {
    const [recipeFavorites, setRecipeFavorites] = useContext(FavoritesContext);
    const [initiateRight, setInitiateRight] = useState(false); //RESET THIS!!!!!! TO FALSE!!!!
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [rightDisplay, setRightDisplay] = useState([]);

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

    function firebaseTest() {
        ref
            .doc("52858")
            .get().then((doc) => {
                if (doc.data !== undefined) {
                console.log(doc.data())
                const data = doc.data();
                setRightDisplay(data);
                console.log(data);
                }   else {
                    console.log("no doc")
                }
            })
    }

    function divClick(event) {
        console.log("Div was clicked");
        const id = event?.currentTarget?.id;
        console.log(id);
        ref
        .doc(id)
        .get().then((doc) => {
            if (doc.data !== undefined) {
            console.log(doc.data())
            const data = doc.data();
            setRightDisplay(data);
            console.log(data);
            }   else {
                console.log("no doc")
            }
        })
    }

    function deleteFavorites(event) {
        const id = event?.target?.id;
        console.log(id);
        setDeleteId(id);
        console.log("he pushed me");
        setInitiateRight(false);
    }

    function initiateRightFunc() {
        setInitiateRight(!initiateRight);
    }

    function off() {
        setInitiateRight(false);
    }

    function on() {
        setInitiateRight(true);
    }

    return (
        <Container>
            <Left>
                <button onClick={off}>OFF</button>
                <button onClick={on}>ON</button>
            <button onClick={firebaseTest}>Firebase test log</button>
            <h1>Favorites</h1> <br></br>
            {favorites.map((favorites) => (
                <div id={favorites.mealId} onClick={divClick}>
                    <h2>{favorites.name}</h2>
                    <img src={favorites.photo} onClick={initiateRightFunc} alt={favorites.name} />
                    <p>{favorites.instructions}</p>
                    <p>{favorites.mealId}</p>
                    <button id={favorites.mealId} onClick={deleteFavorites}>DELETE</button>
                </div>
            ))}
            </Left>
            {initiateRight === true && (
                <Right>
                    <h1>{rightDisplay?.name}</h1>
                <RecipeRandomizer>
                    <Section1>
                    <ImgVertical src={rightDisplay?.photo} alt={rightDisplay?.name} />
                    <TextContainer>
                    <Title>{rightDisplay?.name}</Title>
                    <Subtitle>{rightDisplay?.country} Recipe - {rightDisplay?.category}</Subtitle>
                    <Ingredients>Ingredients</Ingredients>
                    <IngredientSection>
                    <IngredientContainer>
                    <Ingredient>{rightDisplay?.ingredients?.[0]} {rightDisplay?.measurements?.[0]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[1]} {rightDisplay?.measurements?.[1]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[2]} {rightDisplay?.measurements?.[2]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[3]} {rightDisplay?.measurements?.[3]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[4]} {rightDisplay?.measurements?.[4]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[5]} {rightDisplay?.measurements?.[5]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[6]} {rightDisplay?.measurements?.[6]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[7]} {rightDisplay?.measurements?.[7]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[8]} {rightDisplay?.measurements?.[8]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[9]} {rightDisplay?.measurements?.[9]}</Ingredient>
                    </IngredientContainer>
                    <IngredientContainer>
                    <Ingredient>{rightDisplay?.ingredients?.[10]} {rightDisplay?.measurements?.[10]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[11]} {rightDisplay?.measurements?.[11]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[12]} {rightDisplay?.measurements?.[12]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[13]} {rightDisplay?.measurements?.[13]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[14]} {rightDisplay?.measurements?.[14]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[15]} {rightDisplay?.measurements?.[15]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[16]} {rightDisplay?.measurements?.[16]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[17]} {rightDisplay?.measurements?.[17]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[18]} {rightDisplay?.measurements?.[18]}</Ingredient>
                    <Ingredient>{rightDisplay?.ingredients?.[19]} {rightDisplay?.measurements?.[19]}</Ingredient>
                    </IngredientContainer>
                    </IngredientSection>
                    <Instructions>{rightDisplay?.instructions}</Instructions>
                    <SourceLinks>
                    <RecipeSource href={rightDisplay?.recipeSource} target="_blank">Where This Recipe Came From</RecipeSource>
                    </SourceLinks>
                    </TextContainer>
                    <ImageSection>
                    <Img src={rightDisplay?.photo} alt={rightDisplay?.name} />
                    <Youtube><iframe id="recipeVideo" width="450" height="250" src={rightDisplay?.youtubeVideo} frameborder="0" allowfullscreen></iframe></Youtube>
                    </ImageSection>
                    </Section1>
                </RecipeRandomizer>
                </Right>
    )}
    </Container>
)}

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