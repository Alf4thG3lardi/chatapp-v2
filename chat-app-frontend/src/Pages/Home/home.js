import React from "react";
import { useEffect, useContext } from "react";
import Connection from "../../connection/connection";
import Cookies from "js-cookie";
import Chatroom from "./chatroom/chatroom";
// import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoooo.png";
// import profil from '../../assets/profilwa.png';

const Home = () => {
  // const navigate = useNavigate();
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
        <div className="col-4" style={{ background: "#8086FF", height: "90px"}}>
          <img src={logo} alt="" width={130} style={{ paddingTop: "15px", paddingLeft: "15px", marginRight:'347px' }} />
        </div>
        <a href="/listuser" className="col-4" style={{ background: "#8086FF", paddingTop:'30px', paddingLeft:'390px', cursor:'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="black" class="bi bi-person-plus" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
          </svg>
          </a>
        <div className="col-4" style={{ background: "#8086FF" }}>
          <button className="btn btn-light" onClick={logout} style={{ position: "relative", top: "30px", left:'160px'}}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ background: "white" }} className="row"user_id>
        <div className="col-3">
          <h5 className="ms-4 mt-4 text-secondary text-start" style={{ fontFamily:'Roboto', fontWeight:'600'}}> <span className="text-primary">Username : </span> {chatuser.username}</h5>

          <form onSubmit={storeChatroom}>
            <div>
              <div className="row mt-3 mb-3 ms-3">
                <input type="text" name="name" className="col-10 form-control" placeholder="Chatroom" style={{ width: "270px" }} onChange={setChatroomForm} value={chatroomValue["name"]} />
                <button type="submit" className="col-2 ms-2 btn btn-outline-secondary" style={{ borderRadius: "17px" }}>
                  Make
                </button>
              </div>
            </div>
          </form>

          {/* <ul>
            {chatroomusers.filter(chatroomusers => chatroomusers.user_id == user_id).map(
              (chatroomuser) => {
                return (
                <li className='text-white'>
                  <button onClick={() => {tochatroom(chatroomuser.chatroom_id)}}>{chatroomuser.name}</button>
                </li>
                )
              }
            )}
          </ul> */}

          {chatroomusers
            .filter(chatroomusers => chatroomusers.user_id == user_id)
            .map((chatroomuser) => {
              return (
                <div className="mt-2">
                  <button
                    className="btn"
                    style={{ background: "#668DDC", color:'white'}}
                    onClick={() => {tochatroom(chatroomuser.chatroom_id)}}>{chatroomuser.name}
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
