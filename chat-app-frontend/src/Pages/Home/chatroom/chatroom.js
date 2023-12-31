import React, { useState } from "react";
import { useParams, useNavigate as navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Connection from "../../../connection/connection";
import Cookies from "js-cookie";
import axios from "axios";

const Chatroom = () => {
  const {  status, getStatus, getChatusers, chatusers, getChatroom, chatroom, getMessages, messages, setMessageForm, storeMessage, messageValue, storeChatroomuser, setChatroomuserForm } = useContext(Connection);
  const user_id = Cookies.get("user");
  const { room_id } = useParams();


  useEffect(() => {
    if (room_id ? getChatroom(room_id): <></>) {
      console.log(status)
      getChatusers();
      getStatus(room_id, user_id)
      setInterval(getMessages, 5000);
    }
  }, []);
  return (
    <div style={{ background: "#DBDDFF", minHeight: "80vh"}}>
      {room_id ? (
        <>
          <p className="h1 mt-3 mb-3" style={{ fontFamily: "Poppins", fontWeight: "900", color: "#31059A" }}>
            {chatroom.name}
          </p>
          <a href={`/listuser/${room_id}`}>
            list user
          </a>
          {/* {
            status.admin ? <form className="mx-auto d-flex justify-content-start" onSubmit={storeChatroomuser} style={{ width: "500px", marginBottom: "40px" }}>
            <select className="form-select" name="user_id" onChange={setChatroomuserForm}>
              <option selected>Open this select user</option>
              {chatusers.map((chatuser) => {
                return <option value={chatuser.id}>{chatuser.username}</option>;
              })}
            </select>
            <button type="submit" className="ms-2 btn btn-primary float-right">
              Submit
            </button>
          </form> : <div></div>
          } */}
          <form className="mx-auto d-flex justify-content-start" onSubmit={storeChatroomuser} style={{ width: "500px", marginBottom: "40px" }}>
            <select className="form-select" name="user_id" onChange={setChatroomuserForm}>
              <option selected>Open this select user</option>
              {chatusers.map((chatuser) => {
                return <option value={chatuser.id}>{chatuser.username}</option>;
              })}
            </select>
            <button type="submit" className="ms-2 btn btn-primary float-right">
              Submit
            </button>
          </form>
            <div className="overflow-y-auto overflow-x-hidden" style={{ maxHeight: "50vh" }}>
            {messages
            .filter((messages) => messages.chatroom_id == room_id)
            .map((message) => {
              return message.user_id == user_id ? (
                <div className=" row " >
                  <div className="d-flex justify-content-end" style={{ cursor: "pointer" }}>
                    <p className="bg-primary border border-primary text-white mb-2 ms-5 me-5 p-3" style={{ borderRadius: "9px", fontFamily: "Roboto" }}>
                    {message.message} : {message.username}
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" row">
                  <div className=" d-flex justify-content-start" style={{ cursor: "pointer" }}>
                    <p className="bg-white border border-primary mb-2 ms-5 me-5 p-3" style={{ borderRadius: "9px", fontFamily: "Roboto" }}>
                      {message.username} : {message.message}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>
            <div>
                <form className="row mx-auto" onSubmit={storeMessage}>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control border border-secondary"
                      name="message"
                      onChange={setMessageForm}
                      value={messageValue["message"]}
                      placeholder="Message"
                      style={{ marginTop: "30px", borderRadius: "15px" }}
                    />
                  </div>
                  <div className="col-3" style={{ position: "relative", marginTop: "29px", paddingLeft: "60px" }}>
                    <input type="submit" className="btn" value="Submit" style={{ background: "#668DDC", color:'white', borderRadius:'20px'}}/>
                  </div>
                </form>
              </div>
            {/* {
              status.banned != 1 ? 
              <div>
                <form className="row mx-auto" onSubmit={storeMessage}>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control border border-secondary"
                      name="message"
                      onChange={setMessageForm}
                      value={messageValue["message"]}
                      placeholder="Message"
                      style={{ marginTop: "30px", borderRadius: "15px" }}
                    />
                  </div>
                  <div className="col-3" style={{ position: "relative", marginTop: "29px", paddingLeft: "60px" }}>
                    <input type="submit" className="btn" value="Submit" style={{ background: "#668DDC", color:'white', borderRadius:'20px'}}/>
                  </div>
                </form>
              </div>
              :
              <div>
                <form className="row mx-auto">
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control border border-secondary"
                      name="message"
                      onChange={setMessageForm}
                      value={messageValue["message"]}
                      placeholder="Message"
                      style={{ marginTop: "30px", borderRadius: "15px" }}
                      readOnly
                    />
                  </div>
                </form>
              </div>
                } */}
        </>
      ) : (
        <>
          <p className="mt-3 text-white"> Chat kosong </p>
        </>
      )}
    </div>
  );
};

export default Chatroom;
