import { useEffect, useState } from "react";
import { useGlobalState } from "../../GlobalStateContext";
import Styles from "./Profile.module.css";
import Button from "../../components/shared/Button";
import { useDataProfile, useUpdateUsers } from "../../services/getAndputProfil";

export default function Profile() {
  const { user } = useGlobalState();
  const { data, loading, error } = useDataProfile();
  const { updateUser } = useUpdateUsers();

  const userId = user?.userId;
  console.log(userId, "userId");
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data && data.getUser) {
      setName(data.getUser.firstname);
      setLastName(data.getUser.lastname);
      setEmail(data.getUser.email);
    }
  }, [data]);

  const handleEdit = () => {
    setIsEditing(!isEditing); // Change le mode édition
  };

  const handleUpdate = () => {
    if (isEditing) {
      // En mode édition, procéder à la mise à jour
      updateUser({
        variables: {
          userId: user?.userId,
          firstname: name,
          lastname: lastName,
          email: email,
        },
      });
    }
    setIsEditing(!isEditing); // Sortir du mode édition après la mise à jour
  };

  return (
    <div className={Styles.profileContainer}>
      <div className={Styles.MainContainer}>
        <div className={Styles.TopContainer}>
          <p className={Styles.pTop}>Retrouvez vos informations personnelles</p>
        </div>
        <div className={Styles.MidContainer}>
          <div className={Styles.InputContainer}>
            <p className={Styles.pInputContainer}>Nom</p>
            <input
              className={Styles.InputProfil}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={Styles.InputContainer}>
            <p className={Styles.pInputContainer}>Prénom</p>
            <input
              className={Styles.InputProfil}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={Styles.InputContainer}>
            <p className={Styles.pInputContainer}>Email</p>
            <input
              className={Styles.InputProfil}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className={Styles.BotContainer}>
          <p className={Styles.pBotContainer}>
            <a
              href="https://stone-sky-e7.notion.site/Conditions-G-n-rales-d-Utilisation-de-l-application-Wild-carbon-b52b0dfa322c4bdb9e7334da9a014d17"
              className={Styles.AboutLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              a propos
            </a>
          </p>
          <Button
            text={isEditing ? "Valider" : "Modifier"}
            width="40%"
            onClick={isEditing ? handleUpdate : handleEdit}
          />
        </div>
      </div>
    </div>
  );
}
