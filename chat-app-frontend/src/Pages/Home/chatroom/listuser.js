import React from "react";
import { useParams, useNavigate as navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Connection from "../../../connection/connection";
import Cookies from "js-cookie";

const ListUser = () => {
  const {getChatroomusers, chatroomusers, banPeople, setAdmin} = useContext(Connection)
  const {room_id} = useParams()
  useEffect(() => {
    getChatroomusers()
  }, [])
  
  return (
    <div className="screen" style={{ height: "720px" }}>
      <div style={{ paddingTop:'70px', paddingLeft:'130px'}}>
      </div>
      <div className="row justify-content-center" style={{ paddingTop: "40px" }}>
        <h1 className="text-center" style={{ fontFamily: "Poppins", fontWeight: "900", color: "#31059A" }}>
          List User
        </h1>
        <p className="mb-4 text-center" style={{ fontSize: "19px", fontFamily: "Poppins" }}>
          This is user that you have been saved
        </p>
        <div className="col-5 border border-white bg-primary shadow-lg p-3 mb-5 bg-body rounded" style={{ width: "400px", height: "360px" }}>
          <div style={{ background: "#DBDDFF" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>Ban</th>
                  <th>set as Admin</th>
                </tr>
              </thead>
              <tbody>
                {
                  chatroomusers.filter(chatroomusers => chatroomusers.chatroom_id == room_id)
                  .map(
                    (chatroomuser) => {
                      return (
                        <tr>
                          <td>{chatroomuser.username}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => {banPeople(chatroomuser.user_id, room_id)}}>
                              Ban
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-success" onClick={() => {setAdmin(chatroomuser.user_id, room_id)}}>
                              Set
                            </button>
                          </td>
                        </tr>
                      )
                    }
                  )
                }
              </tbody>
            </table>
          </div>
          </div>
      </div>
    </div>
  )
}

export default ListUser