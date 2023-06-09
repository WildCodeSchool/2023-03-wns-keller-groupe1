import React, { FC, ChangeEvent, useState } from "react";
import { LoginRegisterFormProps } from "../../interface/LoginRegisterFormProps";

const LoginRegisterForm = ({
  isRegister,
  setIsRegister,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}: LoginRegisterFormProps) => {
  const isValidEmail = (email: string): boolean => {
    const re: RegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    const re: RegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{6,}$/;
    return re.test(password);
  };

  const handleInputChange =
    (setStateFunc: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setStateFunc(event.target.value);
    };

  return (
    <div className="containerLogin2">
      <div className="titleContainerLogin">
        <h1 className="titleLogin">
          {isRegister ? "Inscrivez-vous" : "Connectez vous"}
        </h1>
      </div>
      <div className="formContainerLogin">
        <form className="formLogin">
          {isRegister && (
            <>
              <div className="formGroupLogin">
                <p>Nom</p>
                <div className="formGroupLoginInputIcon">
                  <input
                    className="formInputLogin"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Votre nom"
                    onChange={handleInputChange(setLastName)}
                  />
                  {lastName && (
                    <img
                      src=""
                      alt="checkRegister"
                      className="checkRegister"
                    />
                  )}
                </div>
              </div>
              <div className="formGroupLogin">
                <p>Prénom</p>
                <div className="formGroupLoginInputIcon">
                  <input
                    className="formInputLogin}"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Votre prénom"
                    onChange={handleInputChange(setFirstName)}
                  />
                  {firstName && (
                    <img
                      src=""
                      alt="checkRegister"
                      className="checkRegister"
                    />
                  )}
                </div>
              </div>
            </>
          )}
          <div className="formGroupLogin">
            <p>Email</p>
            <div className="formGroupLoginInputIcon">
              <input
                className="formInputLogin"
                type="email"
                name="email"
                id="email"
                placeholder="Wilder@gmail.com"
                onChange={handleInputChange(setEmail)}
              />
              {email && isValidEmail(email) && (
                <img
                  src=""
                  alt="checkRegister"
                  className="checkRegister"
                />
              )}
            </div>
          </div>
          <div className="formGroupLogin">
            <p>Mot de passe</p>
            <div className="formGroupLoginInputIcon">
              <input
                className="formInputLogin"
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                onChange={handleInputChange(setPassword)}
              />
              {password && isValidPassword(password) && (
                <img
                  src=""
                  alt="checkRegister"
                  className="checkRegister"
                />
              )}
            </div>
          </div>
          {!isRegister && (
            <div className="formGroupLoginPassword">
              <p>Mot de passe oublié</p>
            </div>
          )}
          <div className="formGroupConnection">
            <button className="connectionButton" type="submit">
              {isRegister ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
          <div className="formGroupRegister">
            <button
              className="registerButton"
              type="button"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Retour" : "S’inscrire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterForm;