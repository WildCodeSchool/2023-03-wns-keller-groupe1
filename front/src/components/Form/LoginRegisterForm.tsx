import React, { FC, ChangeEvent, useState } from "react";
import checkRegister from "../../assets/icons/checkRegister.svg";
import styles from "./LoginRegisterForm.module.css";
import { LoginRegisterFormProps } from "../../interface/LoginRegisterFormProps";
import { gql, useMutation, useLazyQuery  } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_USER = gql `
  mutation CreateUser($lastname: String!, $firstname: String!, $password: String!, $email: String!) {
    createUser(lastname: $lastname, firstname: $firstname, password: $password, email: $email)
  }
`;

const LOGIN = gql `
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

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
  handleFormSubmit,
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

  const [createNewUser, { data, loading, error }] = useMutation(
    CREATE_USER,
  );

  const [login, loginData] = useLazyQuery(LOGIN, {
    variables: { email, password },
  });

  return (
    <div className={styles.containerLogin2}>
      <div className={styles.titleContainerLogin}>
        <h1 className={styles.titleLogin}>
          {isRegister ? "Inscrivez-vous" : "Connectez vous"}
        </h1>
      </div>
      <div className={styles.formContainerLogin}>
        <div className={styles.formLogin}>
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
            <button
              className={styles.connectionButton}
              onClick={async () => {
                if (isRegister) {
                  try {
                    await createNewUser({
                      variables: {
                        lastname: lastName,
                        firstname: firstName,
                        password: password,
                        email: email,
                      },
                    });
                    console.log("data after mutation", data);
                    setIsRegister(!isRegister);
                  } catch (err) {
                    console.log(err);
                  }
                }
                if (!isRegister) {
                  try {
                    login();
                    if (loginData.data) {
                      console.log("data from query", loginData.data);
                      localStorage.setItem("token", data.login);
                    }
                    if (error) {
                      throw new Error("Error");
                    }         
                  } catch (err) {
                    console.log(err);
                  }
                }
              }}
            >
              {isRegister ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
          <div className={styles.formGroupRegister}>
            <button
              className={styles.registerButton}
              type="button"
              onClick={() => (
                setFirstName(""),
                setLastName(""),
                setEmail(""),
                setPassword(""),
                setIsRegister(!isRegister)
              )}
            >
              {isRegister ? "Retour" : "S’inscrire"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;