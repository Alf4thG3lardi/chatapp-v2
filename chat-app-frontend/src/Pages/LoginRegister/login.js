import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [postdata, setPostdata] = useState({
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', postdata);
      const user = response.data.data.id;
      Cookies.set('user', user, { sameSite: 'strict' });
      window.location.href='/'
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here, e.g., set a state variable for displaying error messages.
    }
  };

  const toregister = () => {
    window.location.href='/register'
  }

  return (
    <div>
      <form onSubmit={loginuser}>
        <input
          required
          className="form-control"
          onChange={(e) => setPostdata({ ...postdata, name: e.target.value })}
          value={postdata.name}
          type="text"
          name="name"
          id="name"
          placeholder="Username"
        />
        <input
          required
          className="form-control"
          onChange={(e) => setPostdata({ ...postdata, password: e.target.value })}
          value={postdata.password}
          type="password" // Change input type to password
          name="password"
          id="password"
          placeholder="Password"
        />
        <button type='button' className='btn btn-info' onClick={toregister}>
            Register
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
