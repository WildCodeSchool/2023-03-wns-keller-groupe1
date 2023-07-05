import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useGlobalState } from "../GlobalStateContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CREATE_USER = gql`
  mutation CreateUser(
    $lastname: String!
    $firstname: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      lastname: $lastname
      firstname: $firstname
      password: $password
      email: $email
    )
  }
`;

const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export const useAuth = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const navigate = useNavigate();
  const [createNewUser, { loading, error }] = useMutation(CREATE_USER, {
    onError: (error) => {
      toast.error(`Error creating user: ${error.message}`);
    },
    onCompleted: (data) => {
      console.log(data);
      toast.success("Votre compte a bien été créé");
      navigate("/");
    },
  });
  const [login, loginData] = useLazyQuery(LOGIN, {
    onError: (error) => {
      toast.error(`Error logging in: ${error.message}`);
    },
    onCompleted: (data) => {
      console.log(data);
      localStorage.setItem("token", loginData.data.login);
        setGlobalState({ ...globalState, isLogged: true });
        navigate("/dashboard");
    },
  });

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isRegister: boolean,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    if (isRegister) {
      await createNewUser({
        variables: {
          lastname: lastName,
          firstname: firstName,
          password: password,
          email: email,
        },
      });
    } else {
      await login({ variables: { password, email } });
    }
    setIsLoading(false);
  };

  return { handleFormSubmit, createNewUser, login };
};
