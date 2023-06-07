import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
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

const AlertBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Roboto";
    font-size: 20px;
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    width: 300px;
    button {
        margin-top: 8px;
        padding-top: 4px;
        justify-content: center;
        align-items: center;
        width: 15%;
        height: 28px;
    }
`;

const CustomAlert = ({ message, onClose }) => (
    <AlertContainer>
        <AlertBox>
            <span>{message}</span>
            <button onClick={onClose}>OK</button>
        </AlertBox>
    </AlertContainer>
);

export default CustomAlert;
