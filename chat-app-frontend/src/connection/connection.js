import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useParams } from "react-router-dom";

// import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8000/api";
const Connection = createContext();

const userForm = {
  username: "",
  password: "",
};

const chatroomForm = {
  name: "",
};

const chatroomuserForm = {
  user_id: "",
  chatroom_id: "",
};

const messageForm = {
  user_id: Cookies.get("user"),
  chatroom_id: "",
  message: "",
  attachment_id: ""
};

const fileForm = {
  filename: ''
};

export const ConnectionProvider = ({ children }) => {
  // const navigate = useNavigate()
  //chatuser section
  const [chatuserValue, setChatuserValue] = useState(userForm);
  const [chatuser, setChatuser] = useState([]);
  const [chatusers, setChatusers] = useState([]);

  const setChatuserForm = (e) => {
    const { name, value } = e.target;
    setChatuserValue({ ...chatuserValue, [name]: value });
  };

  const getChatusers = async () => {
    const response = await axios.get("chatuser");
    setChatusers(response.data.data);
  };

  const getChatuser = async (id) => {
    const response = await axios.get("chatuser/" + id);
    const clientdata = response.data.data;
    setChatuser(clientdata);
  };

  const storeChatuser = async (e) => {
    e.preventDefault();
    await axios.post("chatuser", chatuserValue);
    setChatuserValue(userForm);
    window.location.href = "/";
    // navigate('/')
  };
  //chatroom section

  const [chatroomValue, setChatroomValue] = useState(chatroomForm);
  const [chatroom, setChatroom] = useState([]);

  const setChatroomForm = (e) => {
    const { name, value } = e.target;
    setChatroomValue({ ...chatroomValue, [name]: value });
  };

  const getChatroom = async (id) => {
    const response = await axios.get("chatroom/" + id);
    const data = response.data.data;
    setChatroom(data);
    setMessageValue({ ...messageValue, ["chatroom_id"]: data.id });
    setChatroomuserValue({ ...chatroomuserValue, ["chatroom_id"]: data.id });
  };

  const storeChatroom = async (e) => {
    e.preventDefault();
    await axios.post("chatroom", chatroomValue).then((response) => {
      const roomdata = response.data.data.id;
      console.log(roomdata);
      autoinputChatroomuser(roomdata);
      window.location.href = "/home/" + roomdata;
    });
    // console.log(chatroomValue)
    setChatroomValue(chatroomForm);
  };
  //chatroomuser section
  const [chatroomuserValue, setChatroomuserValue] = useState(chatroomuserForm);
  const [chatroomusers, setChatroomusers] = useState([]);

  const setChatroomuserForm = (e) => {
    const { name, value } = e.target;
    setChatroomuserValue({ ...chatroomuserValue, [name]: value });
  };

  const getChatroomusers = async () => {
    const response = await axios.get("chatroomuser");
    setChatroomusers(response.data.data);
  };

  const autoinputChatroomuser = async (room_id) => {
    await axios.post("chatroomuser", {
      user_id: Cookies.get("user"),
      chatroom_id: room_id,
    });
    getChatroomusers();
    window.location.href = room_id;
  };

  const storeChatroomuser = async (e) => {
    e.preventDefault();
    await axios.post("chatroomuser", chatroomuserValue);
    console.log(chatroomuserValue);
    setChatroomuserValue(chatroomuserForm);
  };
  //message section
  const [messageValue, setMessageValue] = useState(messageForm);
  const [messages, setMessages] = useState([]);

  const setMessageForm = (e) => {
    const { name, value } = e.target;
    setMessageValue({ ...messageValue, [name]: value });
  };

  const getMessages = async () => {
    const response = await axios.get("message");
    setMessages(response.data.data);
  };

  const storeMessage = async (e) => {
    e.preventDefault();
    // await axios.post("message", messageValue);
    uploadFile()
    console.log(messageValue)
    setMessageValue(messageForm);
    getMessages();
  };

    //file section
    const [fileValue, setFileValue] = useState(fileForm);
    const [file, setFile] = useState([])

    const setFileForm = (e) => {
      const {name, value} = e.target;
      
      setFileValue({...fileValue, [name] : value});
    }

    const uploadFile = async() => {
      console.log(fileValue)
      setFileValue(fileForm)
    }
  return (
    <Connection.Provider
      value={{
        getChatusers,
        chatusers,
        setChatusers,
        chatuser,
        setChatuser,
        getChatuser,
        userForm,
        chatuserValue,
        setChatuserValue,
        setChatuserForm,
        storeChatuser,
        chatroom,
        setChatroom,
        getChatroom,
        chatroomForm,
        chatroomValue,
        setChatroomValue,
        setChatroomForm,
        storeChatroom,
        chatroomusers,
        setChatroomusers,
        getChatroomusers,
        storeChatroomuser,
        chatroomuserForm,
        setChatroomuserForm,
        chatroomuserValue,
        setChatroomuserValue,
        messages,
        setMessages,
        getMessages,
        messageForm,
        messageValue,
        setChatroomValue,
        setMessageForm,
        storeMessage,
        file,
        setFile,
        fileForm,
        fileValue,
        setFileValue,
        setFileForm,
        uploadFile,
      }}
    >
      {children}
    </Connection.Provider>
  );
};

export default Connection;
