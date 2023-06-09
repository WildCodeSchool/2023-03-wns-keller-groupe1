import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useGlobalState } from "../GlobalStateContext";
import { toast } from 'react-toastify';
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
  const [createNewUser, { data, loading, error }] = useMutation(CREATE_USER, {
    onError: (error) => {
      toast.error(`Error creating user: ${error.message}`);
    },
  });
  const [login, loginData] = useLazyQuery(LOGIN, {
    onError: (error) => {
      toast.error(`Error logging in: ${error.message}`);
    },
  });

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isRegister: boolean,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> => {
    event.preventDefault();
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
      await login({ variables: { password, email }});
      if (loginData.data) {
        localStorage.setItem("token", loginData.data.login);
        setGlobalState({ ...globalState, isLogged: true });
        toast.success(`Welcome ${firstName} ${lastName}!`);
        navigate("/dashboard");
      }
    }
  };

  return { handleFormSubmit, createNewUser, login };
};
