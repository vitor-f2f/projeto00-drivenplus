import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/Driven-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./alert";
import UserContext from "./usercontext.js";

export default function Login() {
    const { setUserData } = useContext(UserContext);

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

    useEffect(() => {
        const localData = localStorage.getItem("loginData");
        if (localData) {
            const { savedEmail, savedPassword } = JSON.parse(localData);
            if (savedEmail !== "" && savedPassword !== "") {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setLoading(true);
            }
        }
    }, []);

    useEffect(() => {
        if (loading) {
            sendLogin();
        }
    }, [loading]);

    function sendLogin() {
        if (userEmail === "" || userPassword === "") {
            setAlert("Preencha todos os dados para prosseguir.");
            setShowAlert(true);
            setLoading(false);
            return;
        }
        if (!validateEmail(userEmail)) {
            setAlert("Insira um endereço de e-mail válido.");
            setShowAlert(true);
            setLoading(false);
            return;
        }
        loginObj.email = userEmail;
        loginObj.password = userPassword;
        console.log(loginObj);
        const promise = axios.post(
            "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
            loginObj
        );
        promise
            .then((res) => {
                const r = res.data;
                console.log(r);
                setUserData({
                    userId: r.id,
                    userName: r.name,
                    userToken: r.token,
                    membership: r.membership,
                });
                const loginData = {
                    savedEmail: r.email,
                    savedPassword: r.password,
                };
                localStorage.setItem("loginData", JSON.stringify(loginData));
                if (r.membership == null) {
                    navigate("/subscriptions");
                } else {
                    navigate("/home");
                }
            })
            .catch((err) => {
                console.log(err);
                setAlert(`Erro ${err.response.status}`);
                setShowAlert(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <LoginContainer>
            <img src={Logo} />
            <LoginForm>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={userEmail}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={userPassword}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                />
                <button onClick={() => setLoading(true)} disabled={loading}>
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
    padding: 0 38px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
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
