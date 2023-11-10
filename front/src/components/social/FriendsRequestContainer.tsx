import styles from "./FriendsRequestContainer.module.css";
import { useEffect, useState } from "react";
import checkCircle from "../../assets/images/checkCircle.png";
import xcircle from "../../assets/images/xcircle.png";
interface User {
  firstname: string;
  lastname: string;
}

interface Request {
  id: number;
  userSender: User;
}

interface FriendsRequestContainerProps {
  requests: Request[];
  onAccept: (id: number) => void;
  onDelete: (id: number) => void;
}

const FriendsRequestContainer: React.FC<FriendsRequestContainerProps> = ({
  requests,
  onAccept,
  onDelete,
}) => {
  return (
    <>
      {requests.map((request) => (
        <div key={request.id} className={styles.Maincontainer}>
          <p
            style={{
              color: "#e6e6e6",
              fontFamily: "Noto Sans JP",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >{`${request.userSender.firstname} ${request.userSender.lastname}`}</p>
          <div className={styles.IconContainer}>
            <img
              src={checkCircle}
              alt="check"
              className={styles.Icon}
              onClick={() => onAccept(request.id)}
            />
            <img
              src={xcircle}
              alt="x"
              className={styles.Icon}
              onClick={() => onDelete(request.id)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendsRequestContainer;
