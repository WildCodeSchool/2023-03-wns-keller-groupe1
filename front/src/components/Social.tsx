import styles from "../styles/social.module.css";
import { ReactComponent as CrossIcon } from "../assets/icons/cross.svg";
import { ReactComponent as VectorIcon } from "../assets/icons/Vector.svg";
import { useGlobalState } from "../GlobalStateContext";
import { useGetUserFriendList } from "../services/getUserFriendList";
import { useEffect, useState } from "react";
import { GetUsersByName } from "../services/getUsersByName";

interface IUserFriendsLists {
  userId: number;
  firstname: string;
  lastname: string;
}

const Social = () => {
  const fakeFriends = [
    {
      userId: 1,
      firstname: "Jean",
      lastname: "Dupont",
      totalCo2: 1200,
    },
    {
      userId: 2,
      firstname: "Marie",
      lastname: "Durand",
      totalCo2: 800,
    },
  ];

  const [globalState, setGlobalState] = useGlobalState();
  const { userFriendsLists, error, loading } = useGetUserFriendList(
    globalState?.user?.userId
  );
  const { getUsersByName, data } = GetUsersByName();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 2) {
      getUsersByName({ variables: { name: searchTerm } });
    }
  }, [searchTerm, getUsersByName]);

  return (
    <div className={styles.container}>
      <section className={styles.all_sections}>
        <div className={styles.content}>
          {loading && <p>Fetching data...</p>}
          <section className={styles.section}>
            <div className={styles.communauty_header}>
              <h2>Communautés</h2>

              <input
                type="text"
                value={searchTerm}
                className={styles.input_community}
                placeholder="Ajoutez un ami"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {loading && <p>Chargement...</p>}
              {error && <p>Erreur : {error.message}</p>}
              {data &&
                data.getUsersByName.map((user: any) => (
                  <div key={user.userId}>
                    <p>
                      {user.firstname} {user.lastname}
                    </p>
                  </div>
                ))}
            </div>
            <div className={styles.friends_request}>
              <h3>Demande d'amis :</h3>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <h2>tony</h2>
                  <h2>tony</h2>
                  <div className={styles.answer_friend}>
                    <span className={styles.icons}>
                      <CrossIcon />
                    </span>
                    <span className={styles.icons}>
                      <VectorIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.friends_list}>
              <h2>Votre liste d'amis :</h2>
              <div className={styles.cards}>
                {error && <p>Error fetching data</p>}
                {/* {dataList?.map((user: any) => ( 
                    <div key={user.userId} className={styles.card}>
                        <h2>{user.firstname}</h2>
                        <h2>{user.lastname}</h2>
                      <div className={styles.friend_stats}>
                        <p>440 kg Co2</p>
                      </div>
                    </div>
                ))} */}
                {fakeFriends.map((user: any) => (
                  <div key={user.userId} className={styles.card}>
                    <h2>{user.firstname}</h2>
                    <h2>{user.lastname}</h2>
                    <div className={styles.friend_stats}>
                      <p>{user.totalCo2}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.section_2_head}>
              <h2>Groupe</h2>
              <button className={styles.create_group}>Créer un groupe</button>
            </div>
            <div className={styles.friends_groups}>
              <h2 className={styles.groups_infos}>BIENTOT DISPONIBLE</h2>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Social;
