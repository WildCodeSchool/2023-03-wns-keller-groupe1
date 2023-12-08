import styles from "./social.module.css";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GetUsersByName } from "../../services/getUsersByName";
import { useSendFriendRequest } from "../../services/sendFriendRequest";
import { useGetAllFriendRequests } from "../../services/getAllFriendRequest";
import { useAcceptFriendRequest } from "../../services/acceptFriendRequest";
import { useGetUserFriendList } from "../../services/getUserFriendList";
import { useDeleteFriendRequests } from "../../services/deleteFriendRequest";
import { useGlobalState } from "../../GlobalStateContext";
import FriendsRequestContainer from "../../components/social/FriendsRequestContainer";
import FriendsContainer from "../../components/shared/FriendsContainer";
import addIcon from "../../assets/images/addIcon.png";

const Social = () => {
  const { user } = useGlobalState();
  const { getUsersByName, data } = GetUsersByName();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { sendFriendRequest } = useSendFriendRequest();
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const { friendRequests, refetch: refetchFriendRequests } =
    useGetAllFriendRequests(user?.userId);
  const { userFriendsLists, refetch: refetchUserFriendsLists } =
    useGetUserFriendList(user?.userId);
  const { deleteFriendRequest } = useDeleteFriendRequests();

  useEffect(() => {
    if (searchTerm.length > 1) {
      getUsersByName({ variables: { name: searchTerm } })
        .then((response) => {
          setSearchResults(response.data.getUsersByName);
        })
        .catch((error) => console.error(error));
    }
  }, [searchTerm, getUsersByName]);

  useEffect(() => {
    console.log(searchResults, "searchResults");
  }, [searchResults]);

  const handleButtonClick = (userFriend: any) => {
    console.log(user, "user");
    console.log(userFriend, "userFriend");
    console.log(
      user?.userId,
      "user?.userId",
      userFriend?.userId,
      "userFriend?.userId"
    );
    console.log(
      typeof user?.userId,
      "typeof user?.userId",
      typeof userFriend?.userId,
      "typeof userFriend?.userId"
    );
    setSearchTerm("");
    sendFriendRequest({
      variables: { userId: user?.userId, friendId: userFriend?.userId },
    });
  };
  const handleAcceptRequest = (requestId: any) => {
    acceptFriendRequest({
      variables: { id: requestId, user1Id: user?.userId, user2Id: requestId },
    })
      .then(() => {
        refetchFriendRequests();
        refetchUserFriendsLists();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRequest = (requestId: any) => {
    deleteFriendRequest({
      variables: { deleteFriendRequestId: requestId },
    })
      .then(() => {
        refetchFriendRequests();
        refetchUserFriendsLists();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  interface User {
    userId: Key;
    firstname: string;
    lastname: string;
  }

  const renderSearchResult = (userFriend: User) => {
    return (
      <div key={userFriend.userId} className={styles.SearchResultItem}>
        <p>
          {userFriend.firstname} {userFriend.lastname}
        </p>
        <img
          src={addIcon}
          alt="Ajouter"
          className={styles.AddIcon}
          onClick={() => handleButtonClick(userFriend)}
        />
      </div>
    );
  };

  return (
    <div className={styles.Maincontainer}>
      <div className={styles.containerLeft}>
        {friendRequests.length > 0 && (
          <div className={styles.FriendRequestContainer}>
            <p className={styles.FriendTitle}>Demandes d'amis : </p>
            <FriendsRequestContainer
              requests={friendRequests}
              onAccept={handleAcceptRequest}
              onDelete={handleDeleteRequest}
            />
          </div>
        )}

        <div className={styles.FriendListContainer}>
          <p className={styles.FriendTitle}>Votre liste d’amis : </p>
          <div className={styles.FriendList}>
            <FriendsContainer friendsList={userFriendsLists} />
          </div>
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.SearchBarContainer}>
          <input
            className={styles.SearchInputWithIcon}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Ajoutez un ami"
          />
        </div>
        {searchResults.length > 0 && searchTerm.length !== 0 && (
          <div className={styles.SearchResultsContainer}>
            {searchResults.map((userFriend) => renderSearchResult(userFriend))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;
