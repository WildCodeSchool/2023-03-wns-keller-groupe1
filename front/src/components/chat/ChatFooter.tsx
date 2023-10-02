import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

export const SEND_MESSAGE = gql`
  mutation Mutation($pubSubMutationToDynamicTopicId: Float!, $topic: String!, $message: String, $username: String) {
    pubSubMutationToDynamicTopic(id: $pubSubMutationToDynamicTopicId, topic: $topic, message: $message, username: $username)
  }
`;

const ChatFooter = () => {
  const [message, setMessage] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE, {
		onError: (error) => {
      toast.error(`Error sending message: ${error.message}`);
    },
		onCompleted: (data) => {   
      
    },
		context: {
      headers: {
        "authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    }
	})
  
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (sessionStorage.getItem("user_id")) {
      const userId = sessionStorage.getItem("user_id");
      if (userId) {
        const parsedId = parseInt(userId);
        await sendMessage({
          variables: {
            message: message,
            topic: "Group 1",
            pubSubMutationToDynamicTopicId: parsedId,
            username: sessionStorage.getItem("firstname")
          }
        })
      }  
    }
    setMessage('');
  };
  
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Ecrivez un message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">ENVOYER</button>
      </form>
    </div>
  );
};

export default ChatFooter;
