import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import LogoImg from '../images/fresh_dish_logo.png';
import LogoMobileImg from '../images/fresh_dish_logo_1_mobile.png';

function Nav() {
    const [error, setError] = useState("");
    const { currentUser, logOut } = useAuth()
    const history = useHistory()
    async function handleLogout() {
        setError("")

        try {
            await logOut()
            history.push('/login')

        } catch {
            setError("failed to log out")
        }
        
    }

    return (
        <NavContainer>
            <Navigation>
            <LogoContainer>
                    <Link to="/fresh-dish/"><LogoImage src={LogoImg} alt={LogoImg} /></Link>
                    <Link to="/fresh-dish/"><LogoMobile src={LogoMobileImg} alt={LogoMobile} /></Link>
            </LogoContainer>
                {currentUser && <LogOut onClick={handleLogout}>Log Out</LogOut>}
                <AccountAction>
                {!currentUser && <Login><Link to="/login" style={{ textDecoration: 'none', color:'white' }}>Log In</Link></Login>}
                {!currentUser && <SignUp><Link to="/signup" style={{ textDecoration: 'none', color:'white' }}>Sign Up</Link></SignUp>}
                </AccountAction>
            </Navigation>
        </NavContainer>
    )
}

const NavContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 110px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Navigation = styled.div`
    display: flex;
    max-width: 1500px;
    margin: 0px 0px 0px 0px;
    width: 100vw;
    height: 110px;
    justify-content: space-between;
`;

const StyledLogo = styled(Link) `
    width: 1000px;
    overflow: hidden;
`;

const LogoContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-left: 30px;
    @media (max-width: 500px) {
    }
    @media (max-width: 400px) {
    }
`;

const LogoImage = styled.img`
    width: 350px;
    height: auto;
    align-self: center;
    justify-self: center;
    object-fit: cover;
    @media (max-width: 1025px) {
        width: 300px;
        height: auto;
    }
    @media (max-width: 600px) {
        width: 250px;
    }
    @media (max-width: 550px) {
        display: none;
    }
`;

const LogoMobile = styled.img`
    display: none;
    object-fit: cover;
    height: auto;
    padding-right: 5px;
    padding-left: 5px;
    @media (max-width: 1024px) {
    display: none;
    width: 100px;
    height: auto;
    align-self: center;
    justify-self: center;
    }
    @media (max-width: 550px) {
    display: flex;
    width: 150px;
    align-self: center;
    justify-self: center;
    }
    @media (max-width: 450px) {
        width: 125px;
    }
    @media (max-width: 400px) {
    width: 100px;
    }
    @media (max-width: 350px) {
    width: 80px;
    }
`;

const Logo = styled.h2`
    align-self: center;
    justify-self: center;
    text-align: center;
    width: 170px;
    height: 50px;
    line-height: 50px;
`;

const AccountAction = styled.div`
    display: flex;
    @media (min-width: 1200px) {
    margin: 0px 30px 0px 0px;
    }
    @media (max-width: 1200px) {
    margin: 0px 20px 0px 0px;
    }
    @media (max-width: 400px) {
    margin: 0px 5px 0px 0px;
    }
`;

const Login = styled.h3`
    text-decoration: none;
    margin: 0px 15px;
    align-self: center;
    justify-self: center;
    text-align: center;
    border-radius: 40px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    background-color: #FF8E53;
    color: white;
    border: 1px solid rgba(255, 165, 0, 0.1);
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, .15);
    transition: transform 250ms;
    &:hover {
        transform: translateY(-10px);
    }
    @media (max-width: 750px) {
    //width: 120px;
    transform: translateY(-5px);
    }
    @media (max-width: 550px) {
    //width: 80px;
    width: 250px;
    font-size: 16px;
    margin: 0px 7.5px;
    }
`;

const SignUp = styled.h3`
    text-decoration: none;
    margin: 0px 15px;
    align-self: center;
    justify-self: center;
    text-align: center;
    border-radius: 40px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    background-color: #FF8E53;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, .15);
    color: white;
    transition: transform 250ms;
    &:hover {
        transform: translateY(-10px);
    }
    @media (max-width: 750px) {
    //width: 120px;
    transform: translateY(-5px);
    }
    @media (min-width: 500px) and (max-width: 550px) {
    //width: 100px;
    }
    @media (max-width: 550px) {
    width: 250px;
    font-size: 16px;
    margin: 0px 7.5px;
    }
`;

const LogOut = styled.h3`
    text-decoration: none;
    margin: 0px 50px 0px 0px;
    align-self: center;
    justify-self: center;
    text-align: center;
    border-radius: 40px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    background-color: #FF8E53;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, .15);
    color: white;
    cursor: pointer;
    transition: transform 250ms;
    &:hover {
        transform: translateY(-10px);
    }
    @media (max-width: 750px) {
    width: 150px;
    margin: 0px 25px 0px 0px;
    transform: translateY(-5px);
    }
    @media (max-width: 550px) {
        margin: 0px 25px 0px 0px;
        width: 130px;
        font-size: 14px;
    }
    @media (max-width: 400px) {
        margin: 0px 25px 0px 0px;
        font-size: 14px;
    }
`;

const LinkContainer = styled.h3`
    text-decoration: none;
    margin: 0px 15px;
    align-self: center;
    justify-self: center;
    text-align: center;
    border-radius: 20px;
    width: 120px;
    height: 50px;
    line-height: 50px;
    background-color: orange;
`;

export default Nav;
