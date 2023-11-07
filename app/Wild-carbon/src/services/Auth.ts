import { useMutation, useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useGlobalState } from "../../GlobalStateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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
  const navigation = useNavigation();
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

  const [createNewUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `Erreur lors de la création de l'utilisateur : ${error.message}`,
      });
    },
    onCompleted: () => {
      Toast.show({
        type: "success",
        text1: "Votre compte a été créé avec succès",
      });
      navigation.navigate("Login");
    },
  });

  const [login] = useLazyQuery(LOGIN, {
    onError: (error) => {
      Toast.show({ type: "error", text1: `${error.message}` });
    },
    onCompleted: async (data) => {
      await AsyncStorage.setItem("token", data.login);
      getUserFromToken({ variables: { token: data.login } });
    },
  });

  const [getUserFromToken] = useLazyQuery(GET_USER_FROM_TOKEN, {
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `Erreur lors de la récupération des données de l'utilisateur : ${error.message}`,
      });
    },
    onCompleted: async (data) => {
      await AsyncStorage.setItem("user", JSON.stringify(data.getUserFromToken));
      console.log("data", data.getUserFromToken);
      setGlobalState((prevState) => ({
        ...prevState,
        user: data.getUserFromToken,
      }));

      navigation.navigate("Main", {
        screen: "MainTabs",
        params: {
          screen: "Dashboard",
          params: { userData: data.getUserFromToken },
        },
      });
    },
  });

  const handleFormSubmit = async (
    isRegister,
    email,
    password,
    firstName,
    lastName,
    setIsLoading
  ) => {
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
