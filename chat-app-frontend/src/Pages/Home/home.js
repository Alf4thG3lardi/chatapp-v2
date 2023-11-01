import React from 'react'
import { useEffect, useContext } from 'react'
import Connection from '../../connection/connection'
import Cookies from 'js-cookie'
import Chatroom from './chatroom/chatroom'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const logout = () => {
    Cookies.remove('user')
    window.location.href = '/'
  }
  const tochatroom = (room_id) => {
    window.location.href='/home/'+room_id
  }

  const {chatuser, getChatuser, getChatroomusers, chatroomusers, storeChatroom, setChatroomForm, chatroomValue} = useContext(Connection);
  const user_id = Cookies.get('user')
  useEffect(()=>{
    getChatuser(user_id);
    getChatroomusers();
  }, [])
  return (
    <div className='container bg-dark' style={{minHeight:"100vh"}}>
      <div className='row'user_id>
        <div className='col-3 bg-black'>
          <p className='text-white'>{chatuser.username}</p>
          <button className='btn btn-danger' onClick={logout}>Logout</button>
          <form onSubmit={storeChatroom}>
            <div className='row'>
              <div className='col-8'>
                <input type='text' name='name' className='form-control' onChange={setChatroomForm} value={chatroomValue["name"]}/>
              </div>
              <div className='col-3'>
                <button type='submit' className='btn btn-primary'>make</button>
              </div>
            </div>
          </form>
          <ul>
            {chatroomusers.filter(chatroomusers => chatroomusers.user_id == user_id).map(
              (chatroomuser) => {
                return (
                <li className='text-white'>
                  <button onClick={() => {tochatroom(chatroomuser.chatroom_id)}}>{chatroomuser.name}</button>
                </li>
                )
              }
            )}
          </ul>
        </div>
        
        <div className='col-9'>
          <Chatroom/>
        </div>
      </div>
    </div>
  )
}

export default Home