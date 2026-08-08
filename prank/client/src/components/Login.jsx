import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitData = async (data) => {
    try {
      const result = await loginApi(data);
      login(result.data.user);
      navigate("/home");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="form_area">
          <p className="title">LOGIN</p>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input
                placeholder="Enter your email"
                id="email"
                className="form_style"
                type="email"
                {...register("email")}
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input
                placeholder="Enter your password"
                id="password"
                className="form_style"
                type="password"
                {...register("password")}
              />
            </div>
            <div>
              <button className="btn" type="submit">LOGIN</button>
              <p>
                No account?{" "}
                <Link className="link" to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .form_area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #eddcd9;
    height: auto;
    width: auto;
    border: 2px solid #264143;
    border-radius: 20px;
    box-shadow: 3px 4px 0px 1px #e99f4c;
  }
  .title {
    color: #264143;
    font-weight: 900;
    font-size: 1.5em;
    margin-top: 20px;
  }
  .sub_title {
    font-weight: 600;
    margin: 5px 0;
  }
  .form_group {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 10px;
  }
  .form_style {
    outline: none;
    border: 2px solid #264143;
    box-shadow: 3px 4px 0px 1px #e99f4c;
    width: 290px;
    padding: 12px 10px;
    border-radius: 4px;
    font-size: 15px;
  }
  .form_style:focus,
  .btn:focus {
    transform: translateY(4px);
    box-shadow: 1px 2px 0px 0px #e99f4c;
  }
  .btn {
    padding: 15px;
    margin: 25px 0px;
    width: 290px;
    font-size: 15px;
    background: #de5499;
    border-radius: 10px;
    font-weight: 800;
    box-shadow: 3px 3px 0px 0px #e99f4c;
    cursor: pointer;
  }
  .btn:hover { opacity: 0.9; }
  .link {
    font-weight: 800;
    color: #264143;
    padding: 5px;
    cursor: pointer;
  }
`;

export default Login;
