import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useNavigate } from 'react-router-dom';

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
  banned: "0",
  admin: "0"
};

const messageForm = {
  user_id: Cookies.get("user"),
  chatroom_id: "",
  message: "",
  attachment_id: ""
}

const fileForm = {
  filename: ''
};

export const ConnectionProvider = ({ children }) => {
  const navigate = useNavigate()
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
      navigate('/home/' + roomdata)
     });
    // window.location.reload(false)
    // console.log(chatroomValue)
    setChatroomValue(chatroomForm);
    getChatroomusers();
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

  const autoinputChatroomuser = async(room_id) => {
    await axios.post("chatroomuser", {
      user_id: Cookies.get("user"),
      chatroom_id: room_id,
      banned: 0,
      admin: 1
    });
    // window.location.href = room_id;
  };

  const storeChatroomuser = async (e) => {
    e.preventDefault();
    await axios.post("chatroomuser", chatroomuserValue);
    console.log(chatroomuserValue);
    setChatroomuserValue(chatroomuserForm);
  };
  //message section
  // const [fileid, setFileid] = useState('')
  const [messageValue, setMessageValue] = useState(messageForm);
  const [messages, setMessages] = useState([]);
  const [fileValue, setFileValue] = useState('');
  const setMessageForm = (e) => {
    const { name, value } = e.target;
    setMessageValue({ ...messageValue, [name]: value });
  };

  const setFileForm = (e) => {      
    setFileValue(e.target.files[0]); 
   }

  const getMessages = async () => {
    const response = await axios.get("message");
    setMessages(response.data.data);
  };

  const storeMessage = async (e) => {
    e.preventDefault();

    // const formData = new FormData()
    // formData.append(
    //     "filename",
    //     fileValue
    //   )
    //   // console.log(formData)
    //   const idfile = await axios.post("/attachment", formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }).then((response) => {
    //     console.log(response.data.data.id)
    //     setMessageValue({...messageValue,
    //       attachment_id:response.data.data.id
    //     })
    //     // console.log(idfile)
    //     console.log(messageValue)
    //   })
    // uploadFile()
    // setMessageValue({...messageValue, attachment_id:idfile})
    // console.log(messageValue)
    await axios.post("message", messageValue);
    setMessageValue(messageForm);
    setMessageValue({
      user_id: messageValue.user_id,
      chatroom_id: messageValue.chatroom_id,
      message: "",
      attachment_id: ""
    });
    getMessages();
  };

  
  const [status, setStatus] = useState([])

  const getStatus = async(id_room) => {
    const response = await axios.get('status/'+Cookies.get("user")+"/"+id_room)
    const data = response.data.data[0]
    setStatus(data);
    console.log(status)
  }


  const banPeople = async(id_user, id_room) => {
    const response = await axios.get('status/'+id_user+"/"+id_room)
    const iddata = response.data.data[0].id
    await axios.put('/chatroomuser/'+iddata, {
      user_id: id_user,
      chatroom_id : id_room,
      banned: 1,
      admin: 0
    })
    console.log(iddata)
    console.log(id_user, id_room)
  }
  const setAdmin = async(id_user, id_room) => {
    const response = await axios.get('status/'+id_user+"/"+id_room)
    const iddata = response.data.data[0].id
    await axios.put('/chatroomuser/'+iddata, {
      user_id: id_user,
      chatroom_id : id_room,
      banned: 0,
      admin: 1
    })
    console.log(id_user, id_room)
  }
  // console.log(messageValue)
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
        messageValue,
        setChatroomValue,
        setMessageForm,
        storeMessage,
        fileForm,
        fileValue,
        setFileValue,
        setFileForm,
        status,
        setStatus,
        getStatus,
        banPeople,
        setAdmin
      }}
    >
      {children}
    </Connection.Provider>
  );
};

export default Connection;
