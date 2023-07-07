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

const GET_USER_FROM_TOKEN = gql`
  query GetUserFromToken($token: String!) {
    getUserFromToken(token: $token) {
      userId
      email
      firstname
      lastname
    }
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

  const [getUserFromToken] = useLazyQuery(GET_USER_FROM_TOKEN, {
    onError: (error) => {
      toast.error(`Error getting user data: ${error.message}`);
    },
    onCompleted: (data) => {
      setGlobalState({ isLogged: true, user: data.getUserFromToken });
      console.log(data);
      navigate("/dashboard");
    },
  });

  const [login] = useLazyQuery(LOGIN, {
    onError: (error) => {
      toast.error(`Error logging in: ${error.message}`);
    },
    onCompleted: (data) => {
      console.log(data);
      localStorage.setItem("token", data.login);
      getUserFromToken({ variables: { token: data.login } });
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
