import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import LogoImg from '../images/fresh_dish_logo_2.png';

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
        <LogoContainer>
            <Link to="/"><LogoImage src={LogoImg} alt={LogoImg} /></Link>
        </LogoContainer>
            {currentUser && <LinkContainer onClick={handleLogout}>Log Out</LinkContainer>}
            <AccountAction>
            {!currentUser && <Login><Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link></Login>}
            {!currentUser && <SignUp><Link to="/signup" style={{ textDecoration: 'none', color:'white' }}>Sign Up</Link></SignUp>}
            </AccountAction>
        </NavContainer>
    )
}

const NavContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 110px;
    justify-content: space-between;
`;

const LogoContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-left: 30px;
`;

const LogoImage = styled.img`
    width: 500px;
    height: 100px;
    align-self: center;
    justify-self: center;
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
    margin: 0px 30px;
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
    border: 1px solid rgba(255, 165, 0, 0.1);
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
    background-color: orange;
    color: white;
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
