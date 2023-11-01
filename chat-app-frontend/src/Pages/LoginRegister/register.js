import React from 'react'
import { useEffect, useContext } from 'react'
import Connection from '../../connection/connection'
import { Navigate } from 'react-router-dom'

const Register = () => {
  const {setChatuserForm, storeChatuser, chatuserValue} = useContext(Connection)

  const tologin = () => {
    window.location.href='/login'
  }

  useEffect(()=>{

  }, [])
  return (
    <div>
      <form onSubmit={storeChatuser}>
        <input required className="form-control" onChange={setChatuserForm} value={chatuserValue['username']} type="text" name="username" id="name"/>
        <input required className="form-control" onChange={setChatuserForm} value={chatuserValue['password']} type="text" name="password" id="password"/>
        <button type='button' className='btn btn-info' onClick={tologin}>
            Login
        </button>
        <input type='submit' className='btn btn-primary' value="Submit"/>
      </form>
    </div>
  )
}

export default Register