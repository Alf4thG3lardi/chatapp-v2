import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import Connection from '../../../connection/connection'
import Cookies from 'js-cookie'



const Chatroom = () => {
    const {getChatusers, chatusers, getChatroom, chatroom, getMessages, messages, setMessageForm, storeMessage, messageValue, storeChatroomuser, setChatroomuserForm} = useContext(Connection);
    const user_id = Cookies.get('user')
    const {room_id} = useParams()
    useEffect(()=> {
        room_id  ?  getChatroom(room_id) : <></>
        getMessages()
        getChatusers()
    }, [])
  return (
    <div className='bg-black' style={{minHeight:'100vh'}}>
        {
            room_id ? <>        
            <p className='h1 text-white'>{chatroom.name}</p>
                <form onSubmit={storeChatroomuser}>
                    <select class="form-select" name='user_id' onChange={setChatroomuserForm}>
                        <option selected>Open this select menu</option>
                            {
                                chatusers.map(
                                    (chatuser) => {
                                        return (
                                            <option value={chatuser.id}>{chatuser.username}</option>
                                        )
                                    }
                                )
                            }
                    </select>
                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                </form>
            <ul>
                {
                    messages.filter(messages => messages.chatroom_id == room_id).map(
                        (message) => {
                            return (
                                <li className='text-white'>
                                    {message.message}, {message.username}
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div >
                <form className='row' onSubmit={storeMessage}>
                    <div className='col-9'>
                        <input className='form-control' name='message' type='text' onChange={setMessageForm} value={messageValue["message"]}/>
                    </div>
                    <div className='col-3'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                </form>
            </div>
            </> : <>
                <p className='text-white'> Chat kosong </p>
            </>
        }
        
    </div>
  )
}

export default Chatroom