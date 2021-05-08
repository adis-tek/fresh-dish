import React, { useState, useEffect, useRef, useContext} from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import styled from 'styled-components';
import deleteCircle from '../images/deleteCircle.svg';
import x from '../images/x.png';
import firebase from '../firebase';
import { faDashcube } from '@fortawesome/free-brands-svg-icons';

const Favorites = () => {
    const [recipeFavorites, setRecipeFavorites] = useContext(FavoritesContext);
    const [initiateRight, setInitiateRight] = useState(false); //RESET THIS!!!!!! TO FALSE!!!!
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [rightDisplay, setRightDisplay] = useState([]);
    const [test, setTest] = useState(true);

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
        setInitiateRight(true);
    }

    function off() {
        setInitiateRight(false);
    }

    function on() {
        setInitiateRight(true);
    }

    function testFunc() {
        setTest(true);
    }

    function dash(measurement) {
        if (measurement) {
            return ("-")
        } else {
            console.log("No measurement")
        }
    }

    return (
        <Container>
            {initiateRight === true && (
                <Mobile>
                    <MobileDelete src={deleteCircle} alt={favorites.name} id={favorites.mealId} onClick={off} />
                    <RecipeRandomizer>
                    <Section1>
                    <ImgVertical src={rightDisplay?.photo} alt={rightDisplay?.name} />
                    <TextContainer>
                    <Title>{rightDisplay?.name}</Title>
                    <Subtitle>{rightDisplay?.country} Recipe - {rightDisplay?.category}</Subtitle>
                    <Ingredients>Ingredients</Ingredients>
                    <IngredientSection>
                    <IngredientContainer>
                    {rightDisplay?.ingredients?.[0] && ( <Ingredient>{rightDisplay?.ingredients?.[0]} {dash(rightDisplay?.measurements?.[0])} {rightDisplay?.measurements?.[0]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[1] && ( <Ingredient>{rightDisplay?.ingredients?.[1]} {dash(rightDisplay?.measurements?.[1])} {rightDisplay?.measurements?.[1]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[2] && ( <Ingredient>{rightDisplay?.ingredients?.[2]} {dash(rightDisplay?.measurements?.[2])} {rightDisplay?.measurements?.[2]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[3] && ( <Ingredient>{rightDisplay?.ingredients?.[3]} {dash(rightDisplay?.measurements?.[3])} {rightDisplay?.measurements?.[3]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[4] && ( <Ingredient>{rightDisplay?.ingredients?.[4]} {dash(rightDisplay?.measurements?.[4])} {rightDisplay?.measurements?.[4]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[5] && ( <Ingredient>{rightDisplay?.ingredients?.[5]} {dash(rightDisplay?.measurements?.[5])} {rightDisplay?.measurements?.[5]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[6] && ( <Ingredient>{rightDisplay?.ingredients?.[6]} {dash(rightDisplay?.measurements?.[6])} {rightDisplay?.measurements?.[6]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[7] && ( <Ingredient>{rightDisplay?.ingredients?.[7]} {dash(rightDisplay?.measurements?.[7])} {rightDisplay?.measurements?.[7]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[8] && ( <Ingredient>{rightDisplay?.ingredients?.[8]} {dash(rightDisplay?.measurements?.[8])} {rightDisplay?.measurements?.[8]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[9] && ( <Ingredient>{rightDisplay?.ingredients?.[9]} {dash(rightDisplay?.measurements?.[9])} {rightDisplay?.measurements?.[9]}</Ingredient> )}
                    </IngredientContainer>
                    <IngredientContainer>
                    {rightDisplay?.ingredients?.[10] && ( <Ingredient>{rightDisplay?.ingredients?.[10]} {dash(rightDisplay?.measurements?.[10])} {rightDisplay?.measurements?.[10]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[11] && ( <Ingredient>{rightDisplay?.ingredients?.[11]} {dash(rightDisplay?.measurements?.[11])} {rightDisplay?.measurements?.[11]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[12] && ( <Ingredient>{rightDisplay?.ingredients?.[12]} {dash(rightDisplay?.measurements?.[12])} {rightDisplay?.measurements?.[12]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[13] && ( <Ingredient>{rightDisplay?.ingredients?.[13]} {dash(rightDisplay?.measurements?.[13])} {rightDisplay?.measurements?.[13]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[14] && ( <Ingredient>{rightDisplay?.ingredients?.[14]} {dash(rightDisplay?.measurements?.[14])} {rightDisplay?.measurements?.[14]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[15] && ( <Ingredient>{rightDisplay?.ingredients?.[15]} {dash(rightDisplay?.measurements?.[15])} {rightDisplay?.measurements?.[15]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[16] && ( <Ingredient>{rightDisplay?.ingredients?.[16]} {dash(rightDisplay?.measurements?.[16])} {rightDisplay?.measurements?.[16]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[17] && ( <Ingredient>{rightDisplay?.ingredients?.[17]} {dash(rightDisplay?.measurements?.[17])} {rightDisplay?.measurements?.[17]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[18] && ( <Ingredient>{rightDisplay?.ingredients?.[18]} {dash(rightDisplay?.measurements?.[18])} {rightDisplay?.measurements?.[18]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[19] && ( <Ingredient>{rightDisplay?.ingredients?.[19]} {dash(rightDisplay?.measurements?.[19])} {rightDisplay?.measurements?.[19]}</Ingredient> )}
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
                </Mobile>
            )}
            <Left>
            {favorites.map((favorites) => (
                <Favorite id={favorites.mealId} onClick={divClick}>
                    <Thumbnail src={favorites.photo} onClick={initiateRightFunc} alt={favorites.name} />
                    <FavoriteContainer>
                    <Name>{favorites.name}</Name>
                    <Description>{favorites.instructions.slice(0, 100)}...</Description>
                    <Tags>{favorites.country} Recipe - {favorites.category}</Tags>
                    </FavoriteContainer>
                    <Delete src={deleteCircle} alt={favorites.name} id={favorites.mealId} onClick={deleteFavorites} />
                </Favorite>
                ))}
            </Left>
            {initiateRight === true && (
                <Right>
                <RecipeRandomizer>
                    <Section1>
                    <ImgVertical src={rightDisplay?.photo} alt={rightDisplay?.name} />
                    <TextContainer>
                    <Title>{rightDisplay?.name}</Title>
                    <Subtitle>{rightDisplay?.country} Recipe - {rightDisplay?.category}</Subtitle>
                    <Ingredients>Ingredients</Ingredients>
                    <IngredientSection>
                    <IngredientContainer>
                    {rightDisplay?.ingredients?.[0] && ( <Ingredient>{rightDisplay?.ingredients?.[0]} {dash(rightDisplay?.measurements?.[0])} {rightDisplay?.measurements?.[0]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[1] && ( <Ingredient>{rightDisplay?.ingredients?.[1]} {dash(rightDisplay?.measurements?.[1])} {rightDisplay?.measurements?.[1]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[2] && ( <Ingredient>{rightDisplay?.ingredients?.[2]} {dash(rightDisplay?.measurements?.[2])} {rightDisplay?.measurements?.[2]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[3] && ( <Ingredient>{rightDisplay?.ingredients?.[3]} {dash(rightDisplay?.measurements?.[3])} {rightDisplay?.measurements?.[3]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[4] && ( <Ingredient>{rightDisplay?.ingredients?.[4]} {dash(rightDisplay?.measurements?.[4])} {rightDisplay?.measurements?.[4]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[5] && ( <Ingredient>{rightDisplay?.ingredients?.[5]} {dash(rightDisplay?.measurements?.[5])} {rightDisplay?.measurements?.[5]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[6] && ( <Ingredient>{rightDisplay?.ingredients?.[6]} {dash(rightDisplay?.measurements?.[6])} {rightDisplay?.measurements?.[6]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[7] && ( <Ingredient>{rightDisplay?.ingredients?.[7]} {dash(rightDisplay?.measurements?.[7])} {rightDisplay?.measurements?.[7]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[8] && ( <Ingredient>{rightDisplay?.ingredients?.[8]} {dash(rightDisplay?.measurements?.[8])} {rightDisplay?.measurements?.[8]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[9] && ( <Ingredient>{rightDisplay?.ingredients?.[9]} {dash(rightDisplay?.measurements?.[9])} {rightDisplay?.measurements?.[9]}</Ingredient> )}
                    </IngredientContainer>
                    <IngredientContainer2>
                    {rightDisplay?.ingredients?.[10] && ( <Ingredient>{rightDisplay?.ingredients?.[10]} {dash(rightDisplay?.measurements?.[10])} {rightDisplay?.measurements?.[10]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[11] && ( <Ingredient>{rightDisplay?.ingredients?.[11]} {dash(rightDisplay?.measurements?.[11])} {rightDisplay?.measurements?.[11]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[12] && ( <Ingredient>{rightDisplay?.ingredients?.[12]} {dash(rightDisplay?.measurements?.[12])} {rightDisplay?.measurements?.[12]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[13] && ( <Ingredient>{rightDisplay?.ingredients?.[13]} {dash(rightDisplay?.measurements?.[13])} {rightDisplay?.measurements?.[13]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[14] && ( <Ingredient>{rightDisplay?.ingredients?.[14]} {dash(rightDisplay?.measurements?.[14])} {rightDisplay?.measurements?.[14]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[15] && ( <Ingredient>{rightDisplay?.ingredients?.[15]} {dash(rightDisplay?.measurements?.[15])} {rightDisplay?.measurements?.[15]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[16] && ( <Ingredient>{rightDisplay?.ingredients?.[16]} {dash(rightDisplay?.measurements?.[16])} {rightDisplay?.measurements?.[16]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[17] && ( <Ingredient>{rightDisplay?.ingredients?.[17]} {dash(rightDisplay?.measurements?.[17])} {rightDisplay?.measurements?.[17]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[18] && ( <Ingredient>{rightDisplay?.ingredients?.[18]} {dash(rightDisplay?.measurements?.[18])} {rightDisplay?.measurements?.[18]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[19] && ( <Ingredient>{rightDisplay?.ingredients?.[19]} {dash(rightDisplay?.measurements?.[19])} {rightDisplay?.measurements?.[19]}</Ingredient> )}
                    </IngredientContainer2>
                    <IngredientContainer3>
                    {rightDisplay?.ingredients?.[10] && ( <Ingredient>{rightDisplay?.ingredients?.[10]} {dash(rightDisplay?.measurements?.[10])} {rightDisplay?.measurements?.[10]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[11] && ( <Ingredient>{rightDisplay?.ingredients?.[11]} {dash(rightDisplay?.measurements?.[11])} {rightDisplay?.measurements?.[11]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[12] && ( <Ingredient>{rightDisplay?.ingredients?.[12]} {dash(rightDisplay?.measurements?.[12])} {rightDisplay?.measurements?.[12]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[13] && ( <Ingredient>{rightDisplay?.ingredients?.[13]} {dash(rightDisplay?.measurements?.[13])} {rightDisplay?.measurements?.[13]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[14] && ( <Ingredient>{rightDisplay?.ingredients?.[14]} {dash(rightDisplay?.measurements?.[14])} {rightDisplay?.measurements?.[14]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[15] && ( <Ingredient>{rightDisplay?.ingredients?.[15]} {dash(rightDisplay?.measurements?.[15])} {rightDisplay?.measurements?.[15]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[16] && ( <Ingredient>{rightDisplay?.ingredients?.[16]} {dash(rightDisplay?.measurements?.[16])} {rightDisplay?.measurements?.[16]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[17] && ( <Ingredient>{rightDisplay?.ingredients?.[17]} {dash(rightDisplay?.measurements?.[17])} {rightDisplay?.measurements?.[17]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[18] && ( <Ingredient>{rightDisplay?.ingredients?.[18]} {dash(rightDisplay?.measurements?.[18])} {rightDisplay?.measurements?.[18]}</Ingredient> )}
                    {rightDisplay?.ingredients?.[19] && ( <Ingredient>{rightDisplay?.ingredients?.[19]} {dash(rightDisplay?.measurements?.[19])} {rightDisplay?.measurements?.[19]}</Ingredient> )}
                    </IngredientContainer3>
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

const FavHeader = styled.h1`
    align-self: center;
`;

const Container = styled.div`
    display: flex;
    width: 100vw;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    margin-top: 40px;
    margin-left: 30px;
    width: 69%;
    @media (max-width: 1024px) {
        width: 100%;
        margin: 0px 0px 0px 7px;
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    width: 69%;
    margin: 0px 10px;
    @media (max-width: 1024px) {
        display: none;
    }
`;

const Mobile = styled.div`
    display: none;
    @media (max-width: 1024px) {
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 25%;
    left: 5%;
    //transform: translate(-50%, -50%);
    width: 90%;
    height: auto;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
    align-self: center;
    overflow: auto;
    }
`;

const MobileDelete = styled.img`
    display: flex;
    align-self: flex-end;
    width: 8%;
    height: 8%;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
    margin: 10px 15px 0px 0px;
`;

const Favorite = styled.div`
    display: flex;
    width: 97%;
    height: auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 5px 0px;
`;

const FavoriteContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px 0px;
    justify-content: space-evenly;
`;

const Name = styled.h2`
    display: flex;
    width: 97%;
    height: auto;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    justify-content: justify;
    margin: 6px 3px;
    font-size: 20px;
    @media (max-width: 1260px) {
    font-size: 18px;
    }
    @media (max-width: 1000px) {
    font-size: 16px;
    }
`;

const Thumbnail = styled.img`
    width: 300px;
    height: 200px;
    cursor: pointer;
    border-radius: 10px;
    object-fit: cover;
`;

const Description = styled.p`
    width: 97%;
    height: auto;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 15px;
    margin: 6px 3px;
    @media (max-width: 1260px) {
    font-size: 13px;
    }
    @media (max-width: 1000px) {
    font-size: 12px;
    }
`;

const Tags = styled.p`
    font-weight: 500;
    color: grey;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
    margin: 15px 3px;
    @media (max-width: 1260px) {
    font-size: 12px;
    }
    @media (max-width: 1000px) {
    font-size: 11px;
    }
`;

const Delete = styled.img`
    display: flex;
    align-self: flex-start;
    width: 12%;
    height: 12%;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
    padding: 13px 7px;
    @media (max-width: 1260px) {
    width: 10%;
    height: 10%;
    }
    @media (max-width: 1000px) {
    width: 9%;
    height: 9%;
    }
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
    width: 90%;
    margin: 20px;
    @media (max-width: 1024px) {
        width: 100%;
    }
`;

const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: 110%;
    margin: 0px 30px;
    @media (max-width: 1260px) {
        margin: 0px;
    }
`;

const Img = styled.img`
    width: 100%;
    height: auto;
    align-self: flex-start;
    margin: 0px 30px;
    @media (max-width: 1260px) {
    display: none;
    }
    @media (max-width: 1024px) {
    width: 60%;
    }
`;

const ImgVertical = styled.img`
    display: none;
    @media (max-width: 1260px) {
    display: flex;
    align-self: center;
    width: 90%;
    height: auto;
    margin-bottom: 15px;
    }
    @media (max-width: 1024px) {
    width: 80%;
    height: auto;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    width: 100%;
    @media (max-width: 1260px) {
    width: 100%;
    margin: 0;
    align-items: center;
    justify-content: center;
    }
    @media (max-width: 1024px) {
        width: 90%;
        align-self: center;
    }
`;

const Title = styled.h1`
    margin-top: 10px;
    text-align: left;
    width: 90%;
    @media (max-width: 1024px) {
        width: 85%;
    }
    @media (max-width: 500px) {
        font-size: 25px;
    }
`;

const Subtitle = styled.h2`
    margin: 10px 0px;
    text-align: left;
    width: 90%;
    @media (max-width: 1024px) {
        width: 85%;
    }
    @media (max-width: 500px) {
        font-size: 20px;
    }
`;

const Instructions = styled.p`
    margin: 20px 50px;
    width: 90%;
    line-height: 1.5em;
    @media (max-width: 1024px) {
        width: 85%;
    }
    
`;

const IngredientSection = styled.div`
    display: flex;
    width: 90%;
    @media (max-width: 1024px) {
        flex-direction: column;
        width: 85%;
    }
`;

const IngredientContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media (max-width: 1024px) {
        width: 85%;
    }
    @media (max-width: 500px) {
        margin: 0px 10px;
    }
`;

const IngredientContainer2 = styled.div`
    display: none;
    @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    width: 85%;
    }
    @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0px 10px;
    }
`;

const IngredientContainer3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media (max-width: 1024px) {
        display: none;
    }
    @media (max-width: 500px) {
        display: none;
    }
`;

const Ingredients = styled.h4`
    margin: 10px 0px;
    width: 90%;
    @media (max-width: 1024px) {
        width: 85%;
    }
    @media (max-width: 500px) {
        font-size: 15px;
    }
`;

const Ingredient = styled.h5`
    margin: 5px 0px;
    width: 100%;
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const Section1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
    margin-bottom: 30px;
    @media (max-width: 1260px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }
    @media (max-width: 1024px) {
        width: 85%;
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
    @media (max-width: 1024px) {
        margin: 10px 20px;
        width: 85%;
    }
`;


export default Favorites;