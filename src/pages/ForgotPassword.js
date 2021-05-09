import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import food_background_vertical from '../images/food_background_vertical.jpg';
import food_background_horizontal from '../images/food_background_horizontal.jpg';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";

export default function ForgotPassword() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Success! Check your inbox for further instructions.")
        } catch {
            setError("That email doesn't exist")
        }
        setLoading(false)
        //signUp(emailRef.current.value, passwordRef.current.value)
    }


    return (
    <Container>
        <FormContainer>
        <Heading>Password Reset</Heading>
        {error && <ErrorContainer><Error>{error}</Error></ErrorContainer>}
        {message && <MessageContainer><Message>{message}</Message></MessageContainer>}
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                <Label for="email">Email</Label><br></br>
                <InputText type="text" id="email" name="email" ref={emailRef} />
                </InputContainer>

                <InputSubmit type="submit" value="Reset Password" disabled={loading}>Submit</InputSubmit>
            </Form>
        <Account>Need an account? <br></br><Link to="/signup" style={{color:'white'}}>Sign up</Link></Account>
        </FormContainer>
    </Container>
    )
};

const ErrorContainer = styled.div`
    width: 60%;
    height: auto;
    background-color: rgb(249, 64, 64);
    border: 0.5px solid rgba(150, 0, 0, 0.5);
`;

const Error = styled.h5`
    margin: 15px;
    color: rgb(150, 0,0);

`;

const MessageContainer = styled.div`
    width: 60%;
    height: auto;
    background-color: rgb(0,250,154);
    border: 0.5px solid rgba(9,73,0, 0.5);
`;

const Message = styled.h5`
    margin: 15px;
    color: rgb(9,73,0);

`;

const Account = styled.h3`
    margin: 5px 0px;
    color: white;
    align-self: center;
    text-align: center;
    width: 100%;
    height: 10%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${food_background_horizontal});
    @media (max-width: 1025px) {
    background-image: url(${food_background_vertical});
    }
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 500px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.60);
    backdrop-filter: blur(10px);
    margin: 30px 0px;
    @media (max-width: 1025px) {
        width: 67.5%;
        height: 500px;
    }
    @media (max-width: 450px) {
        width: 87.5%;
    }
    @media (max-width: 300px) {
        width: 92.5%;
    }
`;

const Heading = styled.h1`
    color: white;
    margin: 10px 0px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 30px;
`;

const Label = styled.label`
    color: white;
`;

const InputContainer = styled.div`
    margin: 10px 0px;
    width: 100%;
`;

const InputText = styled.input`
    width: 225px;
    background-color: #32353C;
    color: white;
    caret-color: orange;
    outline: none;
    border-radius: 20px;
    margin-top: 5px;
    outline: none;
    font-size: 16px;
`;

const InputSubmit = styled.button`
    width: 150px;
    height: 40px;
    background-color: #FF8E53;
    color: white;
    margin: 20px 0px;
    border-radius: 20px;
    outline: none;
    border: 0.25px solid white;
    font-size: 16px;
`;