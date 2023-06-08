import React, { useState, useEffect } from "react";
import LogoWhiteRbg from "../../assets/images/LogoWhiteRbg.png";
import LoginRegisterForm from "../../components/Form/LoginRegisterForm";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";

const Login = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [globalState, setGlobalState] = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    setGlobalState({ ...globalState, isLogged: false });
  }, []);

  const handleFormSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setGlobalState({ ...globalState, isLogged: true });
    navigate("/dashboard");
  };

  return (
    <div className={styles.Containerlogin}>
      <div className={styles.loginBox}>
        <div className={styles.loginContainer}>
          <LoginRegisterForm
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>

      <div className={styles.logoBox}>
        <img src={LogoWhiteRbg} alt="Logo" className={styles.logoWhiteRbg} />
      </div>
    </div>
  );
};

export default Login;
