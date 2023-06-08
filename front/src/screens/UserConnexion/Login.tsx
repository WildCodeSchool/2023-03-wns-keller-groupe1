import React, { useState } from "react";
import LogoWhiteRbg from "../../assets/images/LogoWhiteRbg.png";
import LoginRegisterForm from "../../components/Form/LoginRegisterForm";
import styles from "./__Login.scss"

const Login = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
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
