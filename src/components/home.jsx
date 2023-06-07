import styled from "styled-components";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const userName = location.state?.name;
    const data = location.state?.membership;
    console.log("dado recebido", userName, data);
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
    height: 100vh;
    font-family: "Roboto";
    color: white;
    gap: 10px;
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
