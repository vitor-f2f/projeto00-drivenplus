import styled from "styled-components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./alert";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [signupCpf, setCpf] = useState("");
    const [signupEmail, setEmail] = useState("");
    const [signupName, setName] = useState("");
    const [signupPassword, setPassword] = useState("");
    const signupObj = {
        cpf: "",
        email: "",
        name: "",
        password: "",
    };

    const [alertMsg, setAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    function formatCpf(value) {
        let cpf = value.replace(/\D/g, "").slice(0, 11);
        switch (cpf.length) {
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            case 4:
            case 5:
            case 6:
                cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
                break;
            case 7:
            case 8:
            case 9:
                cpf =
                    cpf.substring(0, 3) +
                    "." +
                    cpf.substring(3, 6) +
                    "." +
                    cpf.substring(6);
                break;
            default:
                cpf =
                    cpf.substring(0, 3) +
                    "." +
                    cpf.substring(3, 6) +
                    "." +
                    cpf.substring(6, 9) +
                    "-" +
                    cpf.substring(9);
                break;
        }
        return cpf;
    }

    function validateEmail(email) {
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    function sendSignup() {
        if (
            signupCpf.length < 14 ||
            signupEmail === "" ||
            signupName === "" ||
            signupPassword === ""
        ) {
            setAlert("Preencha todos os dados para prosseguir.");
            setShowAlert(true);
            return;
        }
        if (!validateEmail(signupEmail)) {
            setAlert("Insira um endereço de e-mail válido.");
            setShowAlert(true);
            return;
        }
        setLoading(true);
        signupObj.cpf = signupCpf;
        signupObj.email = signupEmail;
        signupObj.name = signupName;
        signupObj.password = signupPassword;
        console.log(signupObj);
        const promise = axios.post(
            "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up",
            signupObj
        );
        promise
            .then(() => {
                setLoading(false);
                navigate("/");
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
        <SignupContainer>
            <SignupForm>
                <input
                    type="text"
                    placeholder="Nome"
                    value={signupName}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={formatCpf(signupCpf)}
                    onChange={(e) =>
                        setCpf(
                            e.target.value.length < 14
                                ? e.target.value
                                : e.target.value.substring(0, 14)
                        )
                    }
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    autoComplete="new-email"
                    value={signupEmail}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    autoComplete="new-password"
                    value={signupPassword}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                />
                <button onClick={sendSignup} disabled={loading}>
                    {loading ? `...` : `CADASTRAR`}
                </button>
                <Link to={`/`}>Já possui conta? Entre</Link>
            </SignupForm>
            {showAlert && (
                <CustomAlert message={alertMsg} onClose={closeAlert} />
            )}
        </SignupContainer>
    );
}

const SignupContainer = styled.div`
    img {
        width: 300px;
    }
    background-color: #0e0e13;
    font-size: 30px;
    padding: 0 38px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    text-align: center;
    height: 100vh;
`;

const SignupForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 16px;
`;
