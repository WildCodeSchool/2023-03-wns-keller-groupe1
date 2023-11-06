import "./Profile.css";
import Cards from "../../components/CardProfile/Cards";
import CardUpdate from "../../components/CardProfile/CardUpdate";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useUpdateUsers } from "../../services/updateProfil";
import { useGlobalState } from "../../GlobalStateContext";

const DATA_PROFILE = gql`
  query Query($userId: Float!) {
    getUser(userId: $userId) {
      about
      age
      city
      email
      firstname
      gender
      tel
      userId
      lastname
    }
  }
`;

export default function Profile() {
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

  const userId = user?.userId;
  const [name, setName] = useState<String>("");
  const [age, setAge] = useState<Number>();
  const [about, setAbout] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [tel, setTel] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [gender, setGender] = useState<String>("");

  const { loading, error, data, refetch } = useQuery(DATA_PROFILE, {
    variables: {
      userId: userId,
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.getUser.firstname);
      setName(data.getUser.lastname);
      setAbout(data.getUser.about);
      setAge(data.getUser.age);
      setGender(data.getUser.gender);
      setTel(data.getUser.tel);
      setEmail(data.getUser.email);
      setCity(data.getUser.city);
    }
  }, [data]);
  console.log(data);

  return (
    <div className="profile-container">
      <Cards
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        about={about}
        setAbout={setAbout}
        email={email}
        setEmail={setEmail}
        tel={tel}
        setTel={setTel}
        city={city}
        setCity={setCity}
      />
      <div className="profile-update">
        <CardUpdate
          setName={setName}
          name={name}
          setAge={setAge}
          age={age}
          setGender={setGender}
          gender={gender}
          setAbout={setAbout}
          about={about}
          setEmail={setEmail}
          email={email}
          setTel={setTel}
          tel={tel}
          setCity={setCity}
          city={city}
        />
      </div>
    </div>
  );
}
