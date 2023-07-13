import { gql, useSubscription, useQuery, useMutation } from "@apollo/client";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./Chat.css"
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const SUBSCRIBE_TO_CHAT = gql`
  subscription Subscription($topic: String!) {
    subscriptionWithFilterToDynamicTopic(topic: $topic) {
      username
      message
      id
      date
    }
  }
`;

const GET_JOINED_USERS = gql`
  query GetSubscribedUsers($topic: String!) {
    getSubscribedUsers(topic: $topic) {
      username
      topic
    }
  }
`;

const JOIN_GROUP_CHAT = gql`
  mutation SubscribeToDynamicTopic($topic: String!, $username: String!) {
    subscribeToDynamicTopic(topic: $topic, username: $username)
  }
`;

const LEAVE_GROUP_CHAT = gql`
  mutation UnsubscribeFromDynamicTopic($topic: String!, $username: String!) {
    unsubscribeFromDynamicTopic(topic: $topic, username: $username)
  }
`;

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  
  const { loading, error, data } = useSubscription(SUBSCRIBE_TO_CHAT, {
    variables: { topic: "Group 1" },
  });

  const groupData = useQuery(GET_JOINED_USERS, {
    variables: { topic: "Group 1" },
    fetchPolicy: "network-only",
    pollInterval: 2000,
  })

  const [joinGroupChat, joinGroupChatData] = useMutation(JOIN_GROUP_CHAT, {
		onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
		onCompleted: (data) => {
    },
	})

  const [leaveGroupChat, leaveGroupChatData] = useMutation(LEAVE_GROUP_CHAT, {
		onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
		onCompleted: (data) => {
    },
	})

  const joinChat = async () => {
    await joinGroupChat({
      variables: {
        topic: "Group 1",
        username: sessionStorage.getItem("firstname")
      }
    })
  }

  const leaveChat = async () => {
    await leaveGroupChat({
      variables: {
        topic: "Group 1",
        username: sessionStorage.getItem("firstname")
      }
    })
  }

  useEffect(() => {
    joinChat();

    return () => {
      // Function to be called when leaving the page
      leaveChat();
    };
  }, [])

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.subscriptionWithFilterToDynamicTopic]);
    }
  }, [data])
  
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="MainContainer">
      <div className="chatContainer">
        <div className="chat">
          <ChatBar groupUsers={groupData.data} />
          <div className="chat__main">
            <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
            <ChatFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;