import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './connection/protectedroute';
import Login from './Pages/LoginRegister/login';
import Home from './Pages/Home/home';
import Register from './Pages/LoginRegister/register';
import Cookies from 'js-cookie';
import { ConnectionProvider } from './connection/connection';


function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path='/home' element={Cookies.get('user') ? <Home/>: <Navigate to='/login'/>}></Route>
            <Route path='/home/:room_id' element={Cookies.get('user') ? <Home/>: <Navigate to='/login'/>}></Route>
            <Route path='/' element={<Navigate to='/home'/> }></Route>
          </Routes>
        </Router>
      </ConnectionProvider>
    </div>
  );
}

export default App;
