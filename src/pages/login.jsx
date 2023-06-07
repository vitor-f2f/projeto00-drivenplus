import styled from "styled-components";
import React, { useState } from "react";
import Logo from "../assets/Driven-logo.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <LoginContainer>
            <img src={Logo} />
            <LoginForm>
                <input type="text" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <button>ENTRAR</button>
                <Link to={`/sign-up`} className="signuptext">
                    Não possui uma conta? Cadastre-se
                </Link>
            </LoginForm>
        </LoginContainer>
    );
}

const LoginContainer = styled.div`
    img {
        width: 300px;
    }
    background-color: #0e0e13;
    font-size: 30px;
    padding: 0 38px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    height: 100vh;
`;

const LoginForm = styled.div`
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 16px;
`;
