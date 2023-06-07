import styled from "styled-components";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "./usercontext";

export default function Home() {
    const location = useLocation();
    const { userData } = useContext(UserContext);
    const data = userData.membership;
    const userName = userData.userName;

    console.log("dado recebido", userName, data);

    const navigate = useNavigate();

    function timesChange() {
        navigate("/subscriptions");
    }

    function cancelMyPlansJustInCaseYouCalled() {}

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
                    onClick={cancelMyPlansJustInCaseYouCalled}
                >
                    Cancelar plano
                </button>
            </Footer>
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
