import React from "react";
import styled from "styled-components";

const Paise = () => {
  return (
    <StyledWrapper>
      <div className="card-profile">
        <div className="prof-photo">
          <div className="prof-photo-num">build.witharun</div>
          <div className="prof-avatar ">Crush ka mobile no jann;a h ??</div>
          <div className="prof-status-badge">● ONLINE</div>
        </div>
        <div className="prof-body">
          <div className="prof-handle">@matthieu.k</div>
          <div className="prof-name">
            AB GHR BETHE PAISE KMANA HUA OR BHI AASAN
            <br />
            LUXMI CHIT FUNDS
          </div>
          <div className="prof-bio">
            Brutalist designer &amp; freelance typographer. Makes ugly things
            that work perfectly. Berlin / Paris.
          </div>
        </div>
        <div className="prof-stats">
          <div className="pstat">
            <span className="psv">482</span>
            <span className="psl">Projects</span>
          </div>
          <div className="pstat">
            <span className="psv">28k</span>
            <span className="psl">Followers</span>
          </div>
          <div className="pstat">
            <span className="psv">★ 4.9</span>
            <span className="psl">Rating</span>
          </div>
        </div>
        <button className="prof-btn">+ FOLLOW PROFILE</button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-profile {
    background: #f5f5f0;
    border: 5px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    position: relative;
    overflow: hidden;
    width: 360px;
    transform: scale(0.8);
  }

  .prof-photo {
    height: 160px;
    background: #f5e642;
    border-bottom: 5px solid #0a0a0a;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }
  .prof-photo::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 8px,
      rgba(0, 0, 0, 0.12) 8px,
      rgba(0, 0, 0, 0.12) 10px
    );
  }
  .prof-photo-num {
    font-family: "Bebas Neue", sans-serif;
    font-size: 5rem;
    line-height: 0.85;
    color: rgba(0, 0, 0, 0.08);
    position: absolute;
    right: -8px;
    bottom: -8px;
    letter-spacing: -0.02em;
    pointer-events: none;
  }
  .prof-avatar {
    width: 100px;
    height: 72px;
    background: #0a0a0a;
    border: 5px solid #0a0a0a;
    border-bottom: none;
    border-left: none;
    margin-left: 20px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.11rem;
    color: #f5e642;
    flex-shrink: 0;
  }
  .prof-status-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    background: #00e060;
    border: 3px solid #0a0a0a;
    box-shadow: 3px 3px 0 #0a0a0a;
    font-size: 0.55rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    padding: 3px 8px;
    text-transform: uppercase;
  }

  .prof-body {
    padding: 16px 18px 0;
  }
  .prof-handle {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #a8a49a;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .prof-name {
    font-family: "Bebas Neue", sans-serif;
    font-size: 2.4rem;
    line-height: 0.88;
    color: #0a0a0a;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
  }
  .prof-bio {
    font-size: 0.72rem;
    font-weight: 500;
    color: #0a0a0a;
    border-left: 5px solid #e8180a;
    padding-left: 10px;
    line-height: 1.55;
    margin-bottom: 14px;
  }

  .prof-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 3px solid #0a0a0a;
  }
  .pstat {
    padding: 12px 10px;
    border-right: 3px solid #0a0a0a;
    text-align: center;
  }
  .pstat:last-child {
    border-right: none;
  }
  .pstat .psv {
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.8rem;
    line-height: 1;
    color: #0a0a0a;
    display: block;
  }
  .pstat .psl {
    font-size: 0.48rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #a8a49a;
    text-transform: uppercase;
    display: block;
    margin-top: 2px;
  }

  .prof-btn {
    display: block;
    width: 100%;
    padding: 13px;
    background: #0a0a0a;
    color: #f5e642;
    border: none;
    border-top: 5px solid #0a0a0a;
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.2em;
    cursor: pointer;
    text-align: center;
    transition:
      background 0.15s,
      color 0.15s;
  }
  .prof-btn:hover {
    background: #f5e642;
    color: #0a0a0a;
  }
`;

export default Paise;
