import styled from "styled-components";
import React, { useState } from "react";
import Logo from "../assets/Driven-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./alert";

export default function Login() {
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [alertMsg, setAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    const loginObj = {
        email: "",
        password: "",
    };

    function validateEmail(email) {
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    function sendLogin() {
        if (userEmail === "" || userPassword === "") {
            setAlert("Preencha todos os dados para prosseguir.");
            setShowAlert(true);
            return;
        }
        if (!validateEmail(userEmail)) {
            setAlert("Insira um endereço de e-mail válido.");
            setShowAlert(true);
            return;
        }
        setLoading(true);
        loginObj.email = userEmail;
        loginObj.password = userPassword;
        console.log(loginObj);
        const promise = axios.post(
            "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
            loginObj
        );
        promise
            .then((res) => {
                console.log(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                setAlert(`Erro ${err.response.status}`);
                setShowAlert(true);
            });
        setLoading(false);
    }

    return (
        <LoginContainer>
            <img src={Logo} />
            <LoginForm>
                <input
                    data-test="email-input"
                    type="text"
                    placeholder="E-mail"
                    value={userEmail}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                />
                <input
                    data-test="password-input"
                    type="password"
                    placeholder="Senha"
                    value={userPassword}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                />
                <button onClick={sendLogin} disabled={loading}>
                    {loading ? `...` : `ENTRAR`}
                </button>
                <Link to={`/sign-up`} className="logintext">
                    Não possui uma conta? Cadastre-se
                </Link>
            </LoginForm>
            {showAlert && (
                <CustomAlert message={alertMsg} onClose={closeAlert} />
            )}
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
