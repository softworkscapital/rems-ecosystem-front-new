import React, { useState, useEffect } from "react";
import { MD5 } from "crypto-js";
import { API_URL } from "./config";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 16px;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  border: 1px solid #e1e1e1;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #2d3748;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: -0.5px;
`;
const Title2 = styled.h3`
  text-align: center;
  margin-bottom: 30px;
  color: #2d3748;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  position: relative;

  label {
    display: block;
    margin-bottom: 8px;
    color: #4a5568;
    font-size: 14px;
    font-weight: 500;
  }

  svg {
    position: absolute;
    left: 12px;
    top: 38px;
    color: #718096;
    font-size: 16px;
  }

  input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.2s ease;
    background-color: #f8fafc;

    &:focus {
      border-color: #4299e1;
      background-color: #ffffff;
      outline: none;
    }

    &::placeholder {
      color: #a0aec0;
    }
  }
`;

const RememberMe = styled.div`
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    color: #4a5568;
    font-size: 14px;
    cursor: pointer;

    input {
      margin-right: 8px;
      width: 16px;
      height: 16px;
      accent-color: #4299e1;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3182ce;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;

  a {
    display: inline-block;
    margin: 8px 0;
    color: #4299e1;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #3182ce;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const LoaderContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;





const ClientLogin = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    setPasswordHash(MD5(password).toString());
  }, [password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordHash);
    setIsLoading(true);
    fetch(`${API_URL}/users/${email}/${password}`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.length === 1) {
          localStorage.setItem("user", resp[0].userid);
          localStorage.setItem("userName", resp[0].username);
          localStorage.setItem(
            "async_client_profile_id",
            resp[0].client_profile_id
          );
          localStorage.setItem("async_role", resp[0].role);
          localStorage.setItem("async_category", resp[0].category);
          localStorage.setItem("async_username", resp[0].email);
          localStorage.setItem("branch_id", resp[0].branch_id);
          localStorage.setItem("company_id", resp[0].company_id);
          console.log(resp);
          window.location.href = "/ClientHome";
        } else {
          Swal.fire({
            text: "Incorrect Username or Password!",
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        Swal.fire({
          text: "Login failed, check your network connection!",
          icon: "error",
        });
      });
  };

  return (
    <LoginContainer>
        <Title2>REMS</Title2>
      <Title>Welcome Back</Title>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <label>Email Address</label>
          <FaEnvelope />
          <input
            type="email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
            required
          />
        </InputGroup>
        <InputGroup>
          <label>Password</label>
          <FaLock />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
            placeholder="Enter your password"
          />
        </InputGroup>

        <RememberMe>
          <label>
            <input type="checkbox" />
            Remember me for 30 days
          </label>
        </RememberMe>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </SubmitButton>
      </form>
      <LinkContainer>
        <a href="/account/registration">Create account</a>
        <a href="#">Forgot password?</a>
      </LinkContainer>
      {isLoading && (
        <LoaderContainer>
          <BarLoader color="#4299e1" loading={isLoading} />
        </LoaderContainer>
      )}
    </LoginContainer>
  );
};

export default ClientLogin;
