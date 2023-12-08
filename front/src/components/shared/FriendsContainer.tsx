import React from "react";

interface Friend {
  firstname: string;
  totalCo2: number;
  userId: number;
}

interface FriendsContainerProps {
  friendsList: Friend[];
}

const FriendsContainer: React.FC<FriendsContainerProps> = ({ friendsList }) => {
  if (friendsList.length !== 0) {
    return (
      <>
        {friendsList.map((friend) => (
          <div
            key={friend.userId}
            style={{
              backgroundColor: "#202737",
              padding: "1vw",
              borderRadius: "20px",
              width: "90%",
              marginTop: "1vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "#e6e6e6",
                fontFamily: "Noto Sans JP",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {friend.firstname}
            </p>
            <p
              style={{
                color: "#e6e6e6",
                fontFamily: "Noto Sans JP",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {friend.totalCo2} KG CO2
            </p>
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default FriendsContainer;
