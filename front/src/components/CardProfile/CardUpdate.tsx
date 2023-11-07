import "./CardUpdate.css";
import joker from "../../assets/images/joker.png";
import { useUpdateUsers } from "../../services/updateProfil";
import { useGlobalState } from "../../GlobalStateContext";

export default function CardUpdate({
  setName,
  setCity,
  setAbout,
  setTel,
  setEmail,
  setAge,
  setGender,
  name,
  age,
  email,
  tel,
  about,
  gender,
  city,
}: any) {
  const { updateUser } = useUpdateUsers();
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
  console.log(userId);

  const handleSubmit = () => {
    updateUser({
      variables: {
        firstname: name,
        lastname: name,
        age: age,
        email: email,
        tel: tel,
        about: about,
        gender: gender,
        city: city,
        totalCo2: 0,
        userId: userId,
      },
    });
  };

  return (
    <div className="card-update">
      <div className="update-container">
        <div className="img-update-container">
          <img src={joker} alt="" height="100px" width="100px" />
        </div>
      </div>
      <div className="lower-update-container">
        <input
          className="input-1"
          type="text"
          placeholder="fullname"
          value={name}
          onChange={(e) => {
            return setName(e.target.value), e.preventDefault();
          }}
        />
        <input
          className="input-1"
          type="text"
          placeholder="gender"
          value={gender}
          onChange={(e) => {
            return setGender(e.target.value), e.preventDefault();
          }}
        />
        <input
          className="input-1"
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => {
            return setAge(e.target.value), e.preventDefault();
          }}
        />
        <input
          className="input-1"
          type="text"
          placeholder="phone"
          value={tel}
          onChange={(e) => {
            return setTel(e.target.value), e.preventDefault();
          }}
        />
        <input
          className="input-1"
          type="text"
          placeholder="mail"
          value={email}
          onChange={(e) => {
            return setEmail(e.target.value), e.preventDefault();
          }}
        />
        <input
          className="input-1"
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => {
            return setCity(e.target.value), e.preventDefault();
          }}
        />
        <input
          className="input-1"
          type="text"
          placeholder="Bio"
          value={about}
          onChange={(e) => {
            return setAbout(e.target.value), e.preventDefault();
          }}
        />
        <button className="btn-10" type="submit" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
}
