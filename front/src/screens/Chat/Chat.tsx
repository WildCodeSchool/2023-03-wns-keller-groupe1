import { gql, useSubscription } from "@apollo/client";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./Chat.css"
import { useEffect, useRef, useState } from "react";

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

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  
  const { loading, error, data } = useSubscription(SUBSCRIBE_TO_CHAT, {
    variables: { topic: "Group 1" },
  });

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.subscriptionWithFilterToDynamicTopic]);
      console.log(messages);
    }
  }, [data])
  
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="MainContainer">
      <div className="chatContainer">
        <div className="chat">
          <ChatBar />
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