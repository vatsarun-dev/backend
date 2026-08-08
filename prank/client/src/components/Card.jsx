import React, { useState } from "react";
import styled from "styled-components";
import Payment from "./Payment.jsx";
import { sendName } from "../services/api.js";
import { useForm } from "react-hook-form";
const Card = () => {
  const [searched, setSearched] = useState(false);
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const { register, handleSubmit, reset } = useForm();
  async function onSubmit(data) {
    if (!data.name?.trim()) return;
    setSubmittedName(data.name);
    setSearched(true);
    try {
      // send as crushName — that's what backend expects
      await sendName({ crushName: data.name });
    } catch (error) {
      console.log("there is an error ");
    }
  }

  return (
    <StyledWrapper>
      <div className="crush-card">
        {/* TOP BAR */}
        <div className="topbar">
          <span>CASE FILE · 042</span>
          <span>PRANK DATABASE</span>
        </div>

        {!searched ? (
          <div className="search-screen">
            <div className="mini-label">
              CONFIDENTIAL // CRUSH INVESTIGATION
            </div>

            <div className="stamp">
              100%
              <br />
              NOSY
            </div>

            <h1>
              ENTER
              <span>YOUR</span>
              CRUSH'S
              <strong>NAME.</strong>
            </h1>

            <p className="intro">
              You give us the name.
              <br />
              We do the questionable investigation.
            </p>

            <div className="search-box">
              <label>CRUSH NAME</label>
              <input
                type="text"
                placeholder="e.g. Ananya Sharma"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)()}
                {...register("name", { required: true })}
              />
              <button onClick={handleSubmit(onSubmit)}>
                FIND THEIR NUMBER <span>→</span>
              </button>
            </div>

            <div className="warning">
              <span>⚠</span>
              <div>
                <b>WARNING</b>
                <p>
                  Results may reveal secrets,
                  <br />
                  feelings & bad decisions.
                </p>
              </div>
            </div>

            <div className="bottom-note">
              <span>NO JUDGEMENT</span>
              <span>ONLY INVESTIGATION</span>
            </div>
          </div>
        ) : (
          <div className="result-screen">
            <div className="result-header">
              <span>DATABASE SEARCH COMPLETE</span>
              <span>✓ MATCH FOUND</span>
            </div>

            <div className="result-stamp">
              SECRET
              <br />
              FOUND
            </div>

            <p className="found-label">WE FOUND YOUR CRUSH 👀</p>

            <h2>{submittedName}</h2>

            <div className="scan-line">
              <span>CONTACT RECORD</span>
              <span>100%</span>
            </div>

            <div className="phone-box">
              <small>THEIR MOBILE NUMBER</small>
              <div className="phone-number">+91 98XX XX7X42</div>
              <div className="verified">
                ● VERIFIED BY OUR VERY SUSPICIOUS DATABASE
              </div>
            </div>

            <div className="p-1.5">
              <Payment />{" "}
            </div>

            <button
              className="try-again"
              onClick={() => {
                setSearched(false);
                setSubmittedName("");
                reset();
              }}
            >
              TRY ANOTHER CRUSH ↗
            </button>

            <div className="result-footer">CASE 042 · PRANK COMPLETE</div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  --paper: #fbf8f1;
  --stock: #ebe4d2;
  --ink: #0a0a0a;
  --red: #ff2d1a;
  --acid: #d4ff3d;
  --muted: #6b6357;

  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;

  .crush-card {
    width: 100%;
    max-width: 340px;
    background: var(--paper);
    color: var(--ink);
    border: 2px solid var(--ink);
    box-shadow: 6px 6px 0 var(--red);
    overflow: hidden;
    font-family: inherit;
  }

  /* TOP BAR */
  .topbar {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;
    background: var(--ink);
    color: var(--paper);
    font-size: 0.52rem;
    font-weight: 900;
    letter-spacing: 0.12em;
  }

  /* SEARCH SCREEN */
  .search-screen {
    position: relative;
    padding: 1rem;
  }

  .mini-label {
    display: inline-block;
    margin-bottom: 0.8rem;
    padding: 0.25rem 0.5rem;
    background: var(--acid);
    border: 1.5px solid var(--ink);
    font-size: 0.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
  }

  .stamp {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px solid var(--red);
    color: var(--red);
    font-size: 0.52rem;
    font-weight: 950;
    line-height: 1.2;
    transform: rotate(8deg);
  }

  h1 {
    margin: 0;
    font-size: 2.2rem;
    line-height: 0.82;
    letter-spacing: -0.06em;
    font-weight: 950;
    text-transform: uppercase;
    max-width: 220px;
  }

  h1 span {
    display: block;
    color: var(--red);
  }

  h1 strong {
    display: inline-block;
    margin-top: 0.15rem;
    padding: 0 0.2rem;
    background: var(--acid);
    font-weight: 950;
    transform: rotate(-1deg);
  }

  .intro {
    margin: 0.8rem 0;
    font-size: 0.72rem;
    line-height: 1.4;
    font-weight: 650;
  }

  /* SEARCH BOX */
  .search-box {
    padding: 0.8rem;
    background: var(--stock);
    border: 2px solid var(--ink);
  }

  .search-box label {
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.52rem;
    font-weight: 950;
    letter-spacing: 0.12em;
  }

  .search-box input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.65rem 0.7rem;
    background: var(--paper);
    border: 2px solid var(--ink);
    outline: none;
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .search-box input:focus {
    box-shadow: 4px 4px 0 var(--red);
  }

  .search-box button {
    width: 100%;
    margin-top: 0.6rem;
    padding: 0.7rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--red);
    color: var(--paper);
    border: 2px solid var(--ink);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.65rem;
    font-weight: 950;
    letter-spacing: 0.08em;
    transition: 100ms ease;
  }

  .search-box button span {
    font-size: 1rem;
  }

  .search-box button:hover {
    background: var(--acid);
    color: var(--ink);
    transform: translate(-2px, -2px);
  }

  /* WARNING */
  .warning {
    display: flex;
    gap: 0.6rem;
    margin-top: 0.8rem;
    padding: 0.6rem 0;
    border-top: 1.5px dashed var(--ink);
    border-bottom: 1.5px dashed var(--ink);
  }

  .warning > span {
    font-size: 1.1rem;
  }

  .warning b {
    font-size: 0.52rem;
    letter-spacing: 0.1em;
  }

  .warning p {
    margin: 0.2rem 0 0;
    font-size: 0.58rem;
    line-height: 1.3;
    font-weight: 700;
  }

  .bottom-note {
    display: flex;
    justify-content: space-between;
    margin-top: 0.7rem;
    font-size: 0.5rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    color: var(--muted);
  }

  /* RESULT SCREEN */
  .result-screen {
    position: relative;
    padding: 1rem;
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.6rem;
    border-bottom: 1.5px solid var(--ink);
    font-size: 0.5rem;
    font-weight: 950;
    letter-spacing: 0.08em;
  }

  .result-header span:last-child {
    color: var(--red);
  }

  .result-stamp {
    position: absolute;
    top: 3rem;
    right: 1rem;
    padding: 0.4rem;
    border: 2px solid var(--red);
    color: var(--red);
    font-size: 0.52rem;
    line-height: 1.2;
    font-weight: 950;
    text-align: center;
    transform: rotate(7deg);
  }

  .found-label {
    margin: 1.2rem 0 0.3rem;
    font-size: 0.6rem;
    font-weight: 950;
    letter-spacing: 0.1em;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 2rem;
    line-height: 0.88;
    letter-spacing: -0.05em;
    text-transform: uppercase;
    word-break: break-word;
    max-width: 220px;
  }

  .scan-line {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.6rem;
    background: var(--ink);
    color: var(--paper);
    font-size: 0.5rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .phone-box {
    padding: 0.9rem;
    background: var(--acid);
    border: 2px solid var(--ink);
    border-top: 0;
  }

  .phone-box small {
    font-size: 0.5rem;
    font-weight: 950;
    letter-spacing: 0.1em;
  }

  .phone-number {
    margin: 0.5rem 0;
    font-size: 1.6rem;
    font-weight: 950;
    letter-spacing: -0.03em;
    filter: blur(3px);
  }

  .verified {
    font-size: 0.45rem;
    font-weight: 900;
    letter-spacing: 0.04em;
  }

  /* PRANK REVEAL */
  .prank-reveal {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    margin-top: 0.9rem;
    padding: 0.8rem;
    background: var(--red);
    color: var(--paper);
    border: 2px solid var(--ink);
  }

  .big-x {
    font-size: 2rem;
    line-height: 1;
    font-weight: 950;
  }

  .prank-reveal strong {
    font-size: 0.8rem;
    letter-spacing: 0.03em;
  }

  .prank-reveal p {
    margin: 0.25rem 0 0;
    font-size: 0.58rem;
    line-height: 1.3;
    font-weight: 650;
  }

  /* TRY AGAIN */
  .try-again {
    width: 100%;
    margin-top: 0.8rem;
    padding: 0.7rem;
    background: var(--ink);
    color: var(--paper);
    border: 2px solid var(--ink);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.62rem;
    font-weight: 950;
    letter-spacing: 0.08em;
    transition: 100ms ease;
  }

  .try-again:hover {
    background: var(--acid);
    color: var(--ink);
    transform: translate(-2px, -2px);
  }

  .result-footer {
    margin-top: 0.9rem;
    text-align: center;
    font-size: 0.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--muted);
  }
`;

export default Card;
