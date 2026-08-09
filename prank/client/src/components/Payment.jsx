import React, { useState } from "react";
import styled from "styled-components";
import { useRazorpay } from "../hooks/useRazorpay";

const SUCCESS_IMG = "https://i.pinimg.com/originals/94/6a/18/946a1832a75d03b0a948804a8dfd17cf.jpg";
const FAILURE_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCRHhRH7yYSgUnXzsUI1iMj5_Zq-kgYwVgKO4-xSfaQ&s=10";

const Payment = () => {
  const { openPayment } = useRazorpay();
  const [status, setStatus] = useState(null); // null | 'success' | 'failure'

  const handlePay = () => {
    openPayment({
      onSuccess: () => setStatus("success"),
      onFailure: () => setStatus("failure"),
    });
  };

  return (
    <StyledWrapper>
      {/* Payment Button */}
      <button className="pay-btn" onClick={handlePay}>
        <span className="btn-text">💳 Pay Now to get full number</span>
      </button>

      {/* Result Modal */}
      {status && (
        <div className="overlay" onClick={() => setStatus(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {status === "success" ? (
              <>
                <img src={SUCCESS_IMG} alt="Payment Success" className="result-img" />
                <p className="result-label success-label">✅ Payment Successful!</p>
                <p className="result-sub">Ab dekho apni crush ka number 👀</p>
              </>
            ) : (
              <>
                <img src={FAILURE_IMG} alt="Payment Failed" className="result-img" />
                <p className="result-label failure-label">❌ Payment Failed!</p>
                <p className="result-sub">Paisa nahi diya toh number nahi milega 😂</p>
              </>
            )}

            <button className="close-btn" onClick={() => setStatus(null)}>
              {status === "success" ? "Close" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .pay-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 700;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .pay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    background: #333;
  }

  .pay-btn:active {
    transform: translateY(0);
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
  }

  /* Modal */
  .modal {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    max-width: 360px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes popIn {
    from { transform: scale(0.8); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }

  .result-img {
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .result-label {
    font-size: 1.1rem;
    font-weight: 900;
    margin-bottom: 0.4rem;
    font-family: inherit;
  }

  .success-label { color: #16a34a; }
  .failure-label { color: #dc2626; }

  .result-sub {
    font-size: 0.8rem;
    color: #555;
    margin-bottom: 1.2rem;
    font-family: inherit;
  }

  .close-btn {
    padding: 0.6rem 2rem;
    font-size: 0.85rem;
    font-weight: 700;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }

  .close-btn:hover {
    background: #333;
  }
`;

export default Payment;
