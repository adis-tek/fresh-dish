import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import food_background_vertical from '../images/food_background_vertical.jpg';
import food_background_horizontal from '../images/food_background_horizontal.jpg';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail,  updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
            }
        
        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser?.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
    <Container>
        <FormContainer>
        <Heading>Update Profile</Heading>
        {error && <ErrorContainer><Error>{error}</Error></ErrorContainer>}
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                <Label for="email">Email</Label><br></br>
                <InputText type="text" id="email" name="email" ref={emailRef} defaultlValue={currentUser?.email} />
                </InputContainer>

                <InputContainer>
                <Label for="password">Password</Label><br></br>
                <InputText type="text" id="password" name="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                </InputContainer>

                <InputContainer>
                <Label for="confirmPassword">Confirm Password:</Label><br></br>
                <InputText type="text" id="confirmPassword" name="confirmPassword" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                </InputContainer>

                <InputSubmit type="submit" value="Update Profile" disabled={loading}>Update</InputSubmit>
            </Form>
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
    height: 600px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.60);
    backdrop-filter: blur(10px);
    margin: 30px 0px;
    @media (max-width: 1025px) {
        width: 67.5%;
        height: 700px;
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
    font-size: 13px;
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
    cursor: pointer;
`;