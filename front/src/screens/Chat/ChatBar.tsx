import React from 'react';

const ChatBar = ({groupUsers}: any) => {
  return (
    <div className="chat__sidebar">
      <h2>Chat de groupe</h2>

      <div>
        <h4 className="chat__header">Utilisateurs actif</h4>
        <div className="chat__users">
          {groupUsers && groupUsers.getSubscribedUsers.map((user: any, index: string) => {
            return (
              <p key={index}>{user.username}</p>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
