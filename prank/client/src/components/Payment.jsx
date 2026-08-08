import React from "react";
import styled from "styled-components";
import { paymentApi } from "../services/api.js";
import { useRazorpay } from "../hooks/useRazorpay";
const Payment = () => {
  const { openPayment } = useRazorpay();

  const handlePay = () => {
    openPayment({
      onSuccess: (response) => {
        console.log("Payment successful!", response);
        // navigate to success page
      },
      onFailure: (error) => {
        console.log("Payment failed", error);
        alert("Payment failed. Please try again.");
      },
    });
  };

  return (
    <StyledWrapper>
      <button className="pay-btn" onClick={handlePay}>
        <span className="btn-text">Pay Now to get full number</span>
        <div className="icon-container">
          <svg viewBox="0 0 24 24" className="icon card-icon">
            <path
              d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="icon payment-icon">
            <path
              d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="icon dollar-icon">
            <path
              d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="icon wallet-icon default-icon">
            <path
              d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="icon check-icon">
            <path
              d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pay-btn {
    position: relative;
    padding: 12px 24px;
    font-size: 16px;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
  }

  .pay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  .icon-container {
    position: relative;
    width: 24px;
    height: 24px;
  }

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    color: #22c55e;
    opacity: 0;
    visibility: hidden;
  }

  .default-icon {
    opacity: 1;
    visibility: visible;
  }

  /* Hover animations */
  .pay-btn:hover .icon {
    animation: none;
  }

  .pay-btn:hover .wallet-icon {
    opacity: 0;
    visibility: hidden;
  }

  .pay-btn:hover .card-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 0s;
  }

  .pay-btn:hover .payment-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 0.5s;
  }

  .pay-btn:hover .dollar-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 1s;
  }

  .pay-btn:hover .check-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 1.5s;
  }

  /* Active state - show only checkmark */
  .pay-btn:active .icon {
    animation: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .pay-btn:active .check-icon {
    animation: checkmarkAppear 0.6s ease forwards;
    visibility: visible;
  }

  .btn-text {
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  @keyframes iconRotate {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px) scale(0.5);
    }
    5% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    15% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    20% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.5);
    }
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.5);
    }
  }

  @keyframes checkmarkAppear {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-45deg);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
`;

export default Payment;
