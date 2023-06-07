import styled from "styled-components";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./usercontext";
import CustomAlert from "./alert";
import axios from "axios";

export default function Home() {
    const { userData } = useContext(UserContext);
    const tokenObj = {
        headers: { Authorization: `Bearer ${userData.userToken}` },
    };
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [alertMsg, setAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    const data = userData.membership;
    const userName = userData.userName;

    console.log("dado recebido", userName, data);

    const navigate = useNavigate();

    function timesChange() {
        navigate("/subscriptions");
    }

    function cancelMyPlansJustInCaseYouCalled() {
        const promise = axios.delete(
            "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
            tokenObj
        );
        promise
            .then(() => {
                navigate("/subscriptions");
            })
            .catch((err) => {
                console.log(err);
                setAlert(`Erro ${err.response.status}`);
                setShowAlert(true);
            });
    }

    return (
        <HomeContainer>
            <Header>
                <img src={data.image} alt="" />
                <IconContainer>
                    <ion-icon name="person-circle"></ion-icon>
                </IconContainer>
            </Header>
            <span>{`Olá, ${userName}`}</span>
            <PerksList>
                {data.perks && data.perks.length > 0
                    ? data.perks.map((p) => (
                          <button key={p.id}>{p.title}</button>
                      ))
                    : `...`}
            </PerksList>
            <Footer>
                <button onClick={timesChange}>Mudar plano</button>
                <button
                    className="red"
                    onClick={() => setShowConfirmation(true)}
                >
                    Cancelar plano
                </button>
            </Footer>
            {showConfirmation && (
                <ConfirmContainer>
                    <ConfirmBox>
                        <p className="message">
                            Tem certeza que deseja
                            <br />
                            cancelar seu plano atual?
                        </p>
                        <div className="button-container">
                            <button
                                className="no"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Não
                            </button>
                            <button
                                className="yes"
                                onClick={cancelMyPlansJustInCaseYouCalled}
                            >
                                SIM
                            </button>
                        </div>
                    </ConfirmBox>
                </ConfirmContainer>
            )}
            {showAlert && (
                <CustomAlert message={alertMsg} onClose={closeAlert} />
            )}
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    font-size: 24px;
    line-height: 28px;
    padding: 32px 38px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    font-weight: 700;
    text-align: center;
    min-height: 100vh;
    font-family: "Roboto";
    color: white;
    gap: 10px;
    position: relative;
    span {
        padding-bottom: 50px;
    }
`;

const PerksList = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    img {
        width: 75px;
    }
`;

const IconContainer = styled.div`
    position: relative;
    right: -20px;
    top: -16px;
    ion-icon {
        font-size: 44px;
    }
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    margin-bottom: 12px;
    padding: 0 38px;
    display: flex;
    flex-direction: column;
    justify-self: baseline;
    width: 100%;
    gap: 8px;
    button.red {
        background-color: #ff4747;
    }
`;

const ConfirmContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const ConfirmBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Roboto";
    font-size: 20px;
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    width: 248px;
    text-align: center;

    .message {
        padding: 30px 0;
        background-color: white;
        color: #0e0e13;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 16px;
    }

    .button-container {
        background-color: white;
        display: flex;
        justify-content: center;
        gap: 14px;
        width: 100%;
    }

    .button-container button {
        flex: 0 0 42%;
        height: 52px;
    }

    .button-container button.no {
        background-color: #cecece;
        font-weight: 400;
    }
    .button-container button.yes {
        font-weight: 700;
    }
`;
