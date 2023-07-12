export interface LoginFormProps {
    email: string;
    handleEmailChange: (value: string) => void;
    password: string;
    handlePasswordChange: (value: string) => void;
    isEmailValid: boolean;
    isPasswordValid: boolean;
    IsConnexionScreen: boolean;
    firstName?: string;
    handleFirstNameChange: (value: string) => void;
    lastName?: string;
    handleLastNameChange: (value: string) => void;
    isSignUpPhaseOne?: boolean;
  }