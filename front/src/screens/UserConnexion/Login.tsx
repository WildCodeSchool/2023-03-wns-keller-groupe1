import { useState } from "react";
import LoginRegisterForm from "../../components/Form/LoginRegisterForm";


const Login = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  return (
    <div className="Containerlogin">
      <div className="loginBox">
        <div className="loginContainer">
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

      <div className="logoBox">
        <img src="" alt="Logo" className="logoWhiteRbg"/>
      </div>
    </div>
  );
};

export default Login;