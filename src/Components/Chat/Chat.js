import AttachFile from "@material-ui/icons/AttachFile";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { InsertEmoticon, Mic, SearchOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import "./Chat.css";
import axios from "../../axios";
function Chat({ messages }) {
  const [input, setInput] = useState("");
  const date = new Date().toUTCString();
  const sendMessage = async (e) => {
    e.preventDefault(); //Pour ne pas rafraichir la page quand on tape entrer
    await axios
      .post("/messages/new", {
        message: input,
        name: "Moha",
        timestamp: date,
        received: true,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <h3>Last seen at...</h3>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message._id}
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ecrivez un message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>

        <Mic />
      </div>
    </div>
  );
}

export default Chat;
