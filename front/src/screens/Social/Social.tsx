import styles from "./social.module.css";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as VectorIcon } from "../../assets/icons/Vector.svg";
import { useGlobalState } from "../../GlobalStateContext";
import { useEffect, useState } from "react";
import { GetUsersByName } from "../../services/getUsersByName";
import { useSendFriendRequest } from "../../services/sendFriendRequest";
import { useGetAllFriendRequests } from "../../services/getAllFriendRequest";
import { useAcceptFriendRequest } from "../../services/acceptFriendRequest";
import { useGetUserFriendList } from "../../services/getUserFriendList";

const Social = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const { getUsersByName, data } = GetUsersByName();
  const [searchTerm, setSearchTerm] = useState("");
  const { sendFriendRequest } = useSendFriendRequest();
  const { friendRequests } = useGetAllFriendRequests(globalState?.user?.userId);
  const { acceptFriendRequest } = useAcceptFriendRequest();
  // const newRequests = friendRequests?.filter((request: any) => request.accepted === false )
  const [requestFilter, setRequestFilter] = useState<any[]>(friendRequests)
  const { userFriendsLists } = useGetUserFriendList(globalState?.user?.userId);
  const [accepted, setAccepted] = useState<boolean>(false)


  useEffect(() => {
    const newRequests: any = friendRequests?.filter((request: any) => request.accepted === false)
    setRequestFilter(newRequests)
    
  }, [friendRequests, accepted]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      getUsersByName({ variables: { name: searchTerm } });
    }
  }, [searchTerm, getUsersByName]);

  const handleButtonClick = (user: any) => {
    setSearchTerm("");
    sendFriendRequest({
      variables: { userId: globalState?.user?.userId, friendId: user.userId },
    });
  };
  const handleAcceptRequest = (
    id: number,
  ) => {
    setAccepted(true)
    acceptFriendRequest({
      variables: { id: id },
    });
    
  };


  return (
    <div className={styles.container}>
      <section className={styles.all_sections}>
        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.communauty_header}>
              <h2>Communautés</h2>

              <div className={styles.communauty_header_search}>
                <input
                  type="text"
                  value={searchTerm}
                  className={styles.input_community}
                  placeholder="Ajoutez un ami"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {data &&
                  searchTerm.length > 1 &&
                  data.getUsersByName.slice(0, 5).map((user: any) => (
                    <div key={user.userId}>
                      <button onClick={() => handleButtonClick(user)}>
                        <p>
                          {user.firstname} {user.lastname}
                        </p>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.friends_request}>
              <h3>Demande d'amis :</h3>
                <div className={styles.cards}>
                  {requestFilter.map((request: any, index: any) => (
                    <div key={index} className={styles.card}>
                      <h2>
                        {request.userSender.firstname}{" "}
                        {request.userSender.userId}
                      </h2>
                      <h2>{request.userSender.lastname}</h2>
                      <div className={styles.answer_friend}>
                        <span className={styles.icons}>
                          <CrossIcon onClick={() => console.log("refuse")} />
                        </span>
                        <span className={styles.icons}>
                          <VectorIcon
                            onClick={() =>
                              handleAcceptRequest(
                                request.id,
                              )
                            }
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            <div className={styles.friends_list}>
              <h2>
                Votre liste d'amis :
              </h2>
              <div className={styles.cards}>
                {/* {error && <p>Error fetching data</p>} */}
                {userFriendsLists?.map((user: any) => ( 
                    <div key={user.userId} className={styles.card}>
                        <h2>{user.firstname}</h2>
                        <h2>{user.lastname}</h2>
                      <div className={styles.friend_stats}>
                        <p>{user.totalCo2} kg Co2</p>
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
