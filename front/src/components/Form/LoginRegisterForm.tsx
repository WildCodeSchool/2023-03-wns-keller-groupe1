import React, { FC, ChangeEvent, useState } from "react";
import checkRegister from "../../assets/icons/checkRegister.svg";
import styles from "./LoginRegisterForm.module.css";

interface LoginRegisterFormProps {
  isRegister: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
}

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
    <div className={styles.containerLogin2}>
      <div className={styles.titleContainerLogin}>
        <h1 className={styles.titleLogin}>
          {isRegister ? "Inscrivez-vous" : "Connectez vous"}
        </h1>
      </div>
      <div className={styles.formContainerLogin}>
        <form className={styles.formLogin}>
          {isRegister && (
            <>
              <div className={styles.formGroupLogin}>
                <p>Nom</p>
                <div className={styles.formGroupLoginInputIcon}>
                  <input
                    className={styles.formInputLogin}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Votre nom"
                    onChange={handleInputChange(setLastName)}
                  />
                  {lastName && (
                    <img
                      src={checkRegister}
                      alt="checkRegister"
                      className={styles.checkRegister}
                    />
                  )}
                </div>
              </div>
              <div className={styles.formGroupLogin}>
                <p>Prénom</p>
                <div className={styles.formGroupLoginInputIcon}>
                  <input
                    className={styles.formInputLogin}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Votre prénom"
                    onChange={handleInputChange(setFirstName)}
                  />
                  {firstName && (
                    <img
                      src={checkRegister}
                      alt="checkRegister"
                      className={styles.checkRegister}
                    />
                  )}
                </div>
              </div>
            </>
          )}
          <div className={styles.formGroupLogin}>
            <p>Email</p>
            <div className={styles.formGroupLoginInputIcon}>
              <input
                className={styles.formInputLogin}
                type="email"
                name="email"
                id="email"
                placeholder="Wilder@gmail.com"
                onChange={handleInputChange(setEmail)}
              />
              {email && isValidEmail(email) && (
                <img
                  src={checkRegister}
                  alt="checkRegister"
                  className={styles.checkRegister}
                />
              )}
            </div>
          </div>
          <div className={styles.formGroupLogin}>
            <p>Mot de passe</p>
            <div className={styles.formGroupLoginInputIcon}>
              <input
                className={styles.formInputLogin}
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                onChange={handleInputChange(setPassword)}
              />
              {password && isValidPassword(password) && (
                <img
                  src={checkRegister}
                  alt="checkRegister"
                  className={styles.checkRegister}
                />
              )}
            </div>
          </div>
          {!isRegister && (
            <div className={styles.formGroupLoginPassword}>
              <p>Mot de passe oublié</p>
            </div>
          )}
          <div className={styles.formGroupConnection}>
            <button className={styles.connectionButton} type="submit">
              {isRegister ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
          <div className={styles.formGroupRegister}>
            <button
              className={styles.registerButton}
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
