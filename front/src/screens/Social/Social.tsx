import styles from "./social.module.css";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as VectorIcon } from "../../assets/icons/Vector.svg";
import { useGlobalState } from "../../GlobalStateContext";
import { useEffect, useState } from "react";
import { GetUsersByName } from "../../services/getUsersByName";
import { toast } from "react-toastify";
import { useSendFriendRequest } from "../../services/sendFriendRequest";
import { useGetAllFriendRequests } from "../../services/getAllFriendRequest";
import { useAcceptFriendRequest } from "../../services/acceptFriendRequest";
import { useGetUserFriendList } from "../../services/getUserFriendList";
import { useDeleteFriendRequests } from "../../services/deleteFriendRequest";

const Social = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const { getUsersByName, data } = GetUsersByName();
  const [searchTerm, setSearchTerm] = useState("");
  const { sendFriendRequest } = useSendFriendRequest();
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const { friendRequests, refetch: refetchFriendRequests } =
    useGetAllFriendRequests(globalState?.user?.userId);
  const { userFriendsLists, refetch: refetchUserFriendsLists } =
    useGetUserFriendList(globalState?.user?.userId);
  const { deleteFriendRequest } = useDeleteFriendRequests();

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
    user1Id: number,
    user2Id: number
  ) => {
    acceptFriendRequest({
      variables: { id: id, user1Id: user1Id, user2Id: user2Id },
    })
      .then(() => {
        refetchFriendRequests();
        refetchUserFriendsLists();
        toast.success("Demande d'amis acceptée");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteRequest = (id: number) => {
    deleteFriendRequest({
      variables: { deleteFriendRequestId: id },
    })
      .then(() => {
        refetchFriendRequests();
        refetchUserFriendsLists();
      })
      .catch((error) => {
        console.error(error);
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
            {friendRequests.filter((request: any) => !request.accepted).length >
              0 && (
              <div className={styles.friends_request}>
                <h3>Demande d'amis :</h3>
                <div className={styles.cards}>
                  {friendRequests
                    .filter((request: any) => !request.accepted)
                    .map((request: any, index: any) => (
                      <div key={index} className={styles.card}>
                        <h2>
                          {request.userSender.firstname}{" "}
                          {request.userSender.userId}
                        </h2>
                        <h2>{request.userSender.lastname}</h2>
                        <div className={styles.answer_friend}>
                          <span className={styles.icons}>
                            <CrossIcon
                              onClick={() => handleDeleteRequest(request.id)}
                            />
                          </span>
                          <span className={styles.icons}>
                            <VectorIcon
                              onClick={() =>
                                handleAcceptRequest(
                                  request.id,
                                  request.userReceiver.userId,
                                  request.userSender.userId
                                )
                              }
                            />
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className={styles.friends_list}>
              <h2>Votre liste d'amis :</h2>
              <div className={styles.cards}>
                {userFriendsLists.map((friend: any, index: any) => (
                  <div key={index} className={styles.card}>
                    <h2>{friend.firstname}</h2>
                    <h2>{friend.lastname}</h2>
                    <div className={styles.friend_stats}>
                      <p>{friend.totalCo2} KG Co2</p>
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
