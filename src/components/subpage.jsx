import styled from "styled-components";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./usercontext";
import CustomAlert from "./alert";
import CloseIcon from "../assets/fa-solid_window-close.png";

export default function SubscriptionDetails() {
    const { userData, setUserData } = useContext(UserContext);
    const tokenObj = {
        headers: { Authorization: `Bearer ${userData.userToken}` },
    };
    const location = useLocation();
    const navigate = useNavigate();
    const sub_id = location.state?.id;

    const [planLogo, setLogo] = useState("");
    const [perksArr, setPerks] = useState([]);
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const [payName, setName] = useState("");
    const [cardNumber, setCard] = useState("");
    const [cardCode, setCode] = useState("");
    const [expDate, setExpDate] = useState("");

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [alertMsg, setAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        requestDetails();
    }, []);

    function requestDetails() {
        const promise = axios.get(
            `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${sub_id}`,
            tokenObj
        );
        promise
            .then((res) => {
                console.log(res.data);
                setLogo(res.data.image);
                setPerks(res.data.perks);
                setPrice(res.data.price);
            })
            .catch((err) => {
                console.log(err);
                setAlert(`Erro ${err.response.status}`);
                setShowAlert(true);
            });
    }

    function formatCard(value) {
        let card = value.replace(/\D/g, "").slice(0, 17);
        switch (card.length) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                card = card.substring(0, 4) + " " + card.substring(4);
                break;
            case 9:
            case 10:
            case 11:
            case 12:
                card =
                    card.substring(0, 4) +
                    " " +
                    card.substring(4, 8) +
                    " " +
                    card.substring(8);
                break;
            default:
                card =
                    card.substring(0, 4) +
                    " " +
                    card.substring(4, 8) +
                    " " +
                    card.substring(8, 12) +
                    " " +
                    card.substring(12);
                break;
        }
        return card;
    }

    function formatDate(value) {
        let date = value.replace(/\D/g, "").slice(0, 17);
        switch (date.length) {
            case 3:
            case 4:
                date = date.substring(0, 2) + "/" + date.substring(2, 4);
                break;
            default:
                break;
        }
        return date;
    }

    function clickBack() {
        navigate(-1);
    }

    function clickPay() {
        if (
            payName === "" ||
            cardNumber.length < 19 ||
            cardCode.length < 3 ||
            expDate.length < 5
        ) {
            setAlert("Preencha todos os dados para prosseguir.");
            setShowAlert(true);
            return;
        }
        const month = parseInt(expDate.slice(0, 2));
        const year = parseInt(expDate.slice(3));
        if (month > 12 || month < 1 || year < 23) {
            setAlert("Data de validade inválida.");
            setShowAlert(true);
            return;
        }
        setShowConfirmation(true);
    }

    function confirmPayment() {
        setShowConfirmation(false);
        setLoading(true);
        proceedPayment();
    }
    function cancelPayment() {
        setShowConfirmation(false);
    }

    function proceedPayment() {
        const paymentObj = {
            membershipId: "",
            cardName: "",
            cardNumber: "",
            securityNumber: 0,
            expirationDate: "",
        };
        paymentObj.membershipId = sub_id;
        paymentObj.cardName = payName;
        paymentObj.cardNumber = cardNumber;
        paymentObj.securityNumber = cardCode;
        paymentObj.expirationDate = expDate;
        console.log(paymentObj);
        const promise = axios.post(
            "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
            paymentObj,
            tokenObj
        );
        promise
            .then((r) => {
                console.log(r.data);
                setUserData({ ...userData, membership: r.data.membership });
                navigate("/home");
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
        <SubContainer>
            <BackButton onClick={clickBack}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </BackButton>
            {planLogo ? (
                <div>
                    <img src={planLogo} />
                    <p>Driven Plus</p>
                </div>
            ) : (
                `...`
            )}
            <PlanDetails>
                <Perks>
                    Benefícios
                    {perksArr && perksArr.length > 0
                        ? perksArr.map((p, index) => (
                              <p key={p.id}>
                                  {index + 1}. {p.title}
                              </p>
                          ))
                        : `...`}
                </Perks>
                <Price>
                    Preco:
                    <p>{`R$ ${price} cobrados mensalmente`}</p>
                </Price>
            </PlanDetails>
            <Payment>
                <input
                    type="text"
                    placeholder="Nome impresso no cartão"
                    value={payName}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Digitos do cartão"
                    value={formatCard(cardNumber)}
                    maxLength={19}
                    onChange={(event) => setCard(event.target.value)}
                    disabled={loading}
                />
                <SmallInput>
                    <input
                        type="text"
                        placeholder="Código de segurança"
                        value={cardCode}
                        maxLength={3}
                        onChange={(event) => setCode(event.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder="Validade"
                        value={formatDate(expDate)}
                        maxLength={5}
                        onChange={(event) => setExpDate(event.target.value)}
                        disabled={loading}
                    />
                </SmallInput>

                <button onClick={clickPay} disabled={loading}>
                    {loading ? `...` : `ASSINAR`}
                </button>
            </Payment>
            {showConfirmation && (
                <ConfirmContainer>
                    <ConfirmBox>
                        <p className="message">
                            Tem certeza que deseja
                            <br />
                            assinar o plano
                            <br />
                            Driven Plus (R$ {price})
                        </p>
                        <div className="button-container">
                            <button className="no" onClick={cancelPayment}>
                                Não
                            </button>
                            <button className="yes" onClick={confirmPayment}>
                                SIM
                            </button>
                        </div>
                    </ConfirmBox>
                </ConfirmContainer>
            )}

            {showAlert && (
                <CustomAlert message={alertMsg} onClose={closeAlert} />
            )}
        </SubContainer>
    );
}

const SubContainer = styled.div`
    position: relative;
    color: white;
    font-family: "Roboto";
    font-size: 30px;
    font-weight: 400;
    padding: 87px 38px 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
    text-align: left;
    img {
        width: 140px;
        margin-right: 24px;
    }
    p {
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
    }
`;
const PlanDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
`;
const Perks = styled.div`
    width: 100%;
    font-size: 16px;
    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
    }
`;
const Price = styled.div`
    width: 100%;
    font-size: 16px;
    p {
        font-size: 14px;
        line-height: 17px;
        font-weight: 400;
    }
`;
const Payment = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const SmallInput = styled.div`
    display: flex;
    gap: 8px;
    input {
        padding-left: 7px;
        width: 50%;
    }
`;
const BackButton = styled.div`
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 2;
    font-size: 40px;
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
