import { log } from "console";
import "./CardUpdate.css";
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
  const handleSubmit = () => {
    console.log(handleSubmit);
  };
  return (
    <div className="card-update">
      <div className="update-container">
        <div className="img-update-container">
          <img src="" alt="" />
        </div>
      </div>
      <form className="lower-update-container">
        <p>Update Your Profil</p>
        <input
          type="text"
          placeholder="fullname"
          value={name}
          onChange={(e) => {
            return setName(e.target.value), e.preventDefault();
          }}
        />
        <input
          type="text"
          placeholder="gender"
          value={gender}
          onChange={(e) => {
            return setGender(e.target.value), e.preventDefault();
          }}
        />
        <input
          type="text"
          placeholder="age"
          value={age}
          onChange={(e) => {
            return setAge(e.target.value), e.preventDefault();
          }}
        />
        <input
          type="text"
          placeholder="phone"
          value={tel}
          onChange={(e) => {
            return setTel(e.target.value), e.preventDefault();
          }}
        />
        <input
          type="text"
          placeholder="mail"
          value={email}
          onChange={(e) => {
            return setEmail(e.target.value), e.preventDefault();
          }}
        />
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => {
            return setCity(e.target.value), e.preventDefault();
          }}
        />
        <input
          type="text"
          placeholder="Bio"
          value={about}
          onChange={(e) => {
            return setAbout(e.target.value), e.preventDefault();
          }}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Update
        </button>
      </form>
    </div>
  );
}
