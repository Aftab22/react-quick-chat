import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from'../Messages/Messages';

import './Chat.css'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://aftab-quikchat.herokuapp.com/';

  useEffect(() => {
    const { name, group } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setGroup(group);
    setName(name)

    socket.emit('join', { name, group }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('groupData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  console.warn(message,messages)
  console.warn('users:',users)

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar group={group}/>
          <Messages messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
       </div>
       <TextContainer users={users}/>
    </div>
  );
}

export default Chat;