import styled from "styled-components";
import React, { useState } from "react";

export default function Home() {
    return (
        <HomeContainer>Página em construção, volte mais tarde</HomeContainer>
    );
}

const HomeContainer = styled.div`
    font-size: 30px;
    padding: 100px 18px;
    display: flex;
    flex-direction: column;
`;