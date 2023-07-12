import { gql, useSubscription } from "@apollo/client";

const SUBSCRIBE_TO_CHAT = gql`
  subscription Subscription {
    normalSubscription
  } 
`;

const Chat = () => {
  const { loading, error, data } = useSubscription(SUBSCRIBE_TO_CHAT, {
    // variables: { topic: "group 1" },
  });

  console.log(error);
  

  return (
    <>
      {!loading && !error && data.message}
    </>
  )
}

export default Chat;