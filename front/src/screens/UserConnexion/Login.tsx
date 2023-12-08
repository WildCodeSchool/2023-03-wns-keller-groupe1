import React, { useEffect, useState } from "react";
import LogoWhiteRbg from "../../assets/images/LogoWhiteRbg.png";
import LoginRegisterForm from "../../components/Form/LoginRegisterForm";
import styles from "./Login.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import { useAuth } from "../../services/auth";

const Login = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const {
    isLogged,
    user,
    isMonthChart,
    setIsMonthChart,
    isBarChart,
    setIsBarChart,
    dropdownOptions,
    setDropdownOptions,
    initialData,
    setInitialData,
    selectedValue,
    setSelectedValue,
    totalCo2,
    setTotalCo2,
  } = useGlobalState();

  const { handleFormSubmit } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      setIsLoading(false);
    }
  }, []);

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
            handleFormSubmit={(e) =>
              handleFormSubmit(
                e,
                isRegister,
                email,
                password,
                firstName,
                lastName,
                setIsLoading
              )
            }
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
