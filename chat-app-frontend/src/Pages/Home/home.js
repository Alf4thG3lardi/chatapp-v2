import React from "react";
import { useEffect, useContext } from "react";
import Connection from "../../connection/connection";
import Cookies from "js-cookie";
import Chatroom from "./chatroom/chatroom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoooo.png";
import profil from '../../assets/profilwa.png';

const Home = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("user");
    window.location.href = "/";
  };
  const tochatroom = (room_id) => {
    window.location.href = "/home/" + room_id;
  };

  const { chatuser, getChatuser, getChatroomusers, chatroomusers, storeChatroom, setChatroomForm, chatroomValue } = useContext(Connection);
  const user_id = Cookies.get("user");
  useEffect(() => {
    getChatuser(user_id);
    getChatroomusers();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-4" style={{ background: "#8086FF", height: "90px", paddingRight: "350px" }}>
          <img src={logo} alt="" width={130} style={{ paddingTop: "15px", paddingLeft: "15px" }} />
        </div>
        <div className="col-8" user_id style={{ background: "#8086FF" }}>
          <button className="btn btn-light" onClick={logout} style={{ position: "relative", top: "30px", left: "400px" }}>
            Logout
          </button>
        </div>
      </div>

      <div className="row" user_id style={{ background: "white" }}>
        <div className="col-3">
          <p className="text-white">{chatuser.username}</p>

          <form onSubmit={storeChatroom}>
            <div style={{ height: "430px" }}>
              <div className="row mt-4 mb-3 ms-3">
                <input type="text" class="col-10 form-control" placeholder="Another User" style={{ width: "270px" }} onChange={setChatroomForm} value={chatroomValue["name"]} />
                <button type="submit" class="col-2 ms-2 btn btn-outline-secondary" style={{ borderRadius: "25px" }}>
                  make
                </button>
              </div>
            </div>
          </form>

          {chatroomusers
            .filter((chatroomusers) => chatroomusers.user_id == user_id)
            .map((chatroomuser) => {
              return (
                <div style={{ marginBottom: "15px" }}>
                  <button
                    className="btn"
                    onClick={() => {
                      tochatroom(chatroomuser.chatroom_id);
                    }}
                    style={{ background: "#416BF7", position: "relative", bottom: "350px", color:'white'}}
                  >
                    {chatroomuser.name}
                  </button>
                </div>
              );
            })}
        </div>

        <div className="col-9" style={{ background: "#DBDDFF" }}>
          <Chatroom />
        </div>
      </div>
    </div>
  );
};

export default Home;
