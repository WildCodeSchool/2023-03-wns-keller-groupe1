import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({messages, lastMessageRef }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="chat__mainHeader">
        <p>Parlez à votre groupe</p>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
        {messages.map((message: any, index: string) =>
          message.username === sessionStorage.getItem('firstname') ? (
            <div key={index} className="message__chats">
              <p className="sender__name">Vous</p>
              <div className="message__sender">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="message__chats">
              <p className="other_name">{message.username}</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
