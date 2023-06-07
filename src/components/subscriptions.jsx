import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./alert";
import UserContext from "./usercontext.js";

export default function Subscriptions() {
    const { userData } = useContext(UserContext);
    const [plansList, setPlansList] = useState([]);
    const navigate = useNavigate();

    const [alertMsg, setAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        requestPlans();
    }, []);

    function requestPlans() {
        const tokenObj = {
            headers: { Authorization: `Bearer ${userData.userToken}` },
        };
        const promise = axios.get(
            "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",
            tokenObj
        );
        promise
            .then((res) => {
                setPlansList(res.data);
            })
            .catch((err) => {
                console.log(err);
                setAlert(`Erro ${err.response.status}`);
                setShowAlert(true);
            });
    }

    function clickSub(id) {
        navigate(`/subscriptions/${id}`, { state: { id } });
    }

    function formatPrice(p) {
        const stringP = p.toString();
        const formatted = stringP.replace(".", ",");
        return formatted;
    }

    return (
        <SubscriptionsContainer>
            <span>Escolha seu Plano</span>
            {plansList && plansList.length > 0
                ? plansList.map((s) => (
                      <SubType key={s.id} onClick={() => clickSub(s.id)}>
                          <img src={s.image} />
                          <SubPrice>R$ {formatPrice(s.price)}</SubPrice>
                      </SubType>
                  ))
                : `...`}
            {showAlert && (
                <CustomAlert message={alertMsg} onClose={closeAlert} />
            )}
        </SubscriptionsContainer>
    );
}

const SubscriptionsContainer = styled.div`
    font-size: 32px;
    line-height: 38px;
    padding: 29px 42px 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100vw;
    max-width: 412px;
    align-items: center;
    font-weight: 700;
    text-align: center;
    height: 100vh;
    font-family: "Roboto";
    color: white;
    gap: 10px;
`;

const SubType = styled.div`
    width: 100%;
    height: 180px;
    border: 3px solid #7e7e7e;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    padding: 0 16px;
    img {
        width: 140px;
    }
`;

const SubPrice = styled.div``;
