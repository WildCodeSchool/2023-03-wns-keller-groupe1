import "./Profile.css";
import Cards from "../../components/CardProfile/Cards";
import CardUpdate from "../../components/CardProfile/CardUpdate";
import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState<String>("");
  const [age, setAge] = useState<Number>();
  const [about, setAbout] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [tel, setTel] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [gender, setGender] = useState<String>("");

  return (
    <div className="profile">
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
