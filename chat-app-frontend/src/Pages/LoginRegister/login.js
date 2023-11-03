import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";
import IconLogin from "../../assets/iconlogin.png";
import IconTelepon from "../../assets/telepooon.png";
import "./login.css";
import logo from "../../assets/logoooo.png";

const Login = () => {
  const [postdata, setPostdata] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", postdata);
      const user = response.data.data.id;
      Cookies.set("user", user, { sameSite: "strict" });
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here, e.g., set a state variable for displaying error messages.
    }
  };

  const toregister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="screen" style={{ paddingTop: "70px", paddingBottom: "130px" }}>
      <div>
        <h1 className="text-center" style={{ fontFamily: "Poppins", fontWeight: "900", color: "#31059A" }}>
          {" "}
          Register Form
        </h1>
        <hr className="mx-auto" style={{ width: "300px", marginTop: "1px", marginBottom: "5px", borderWidth: "3px" }} />
        <p className="text-center" style={{ fontSize: "19px", fontFamily: "Poppins" }}>
        Log in now to continue
        </p>
        <div className="row mx-auto justify-content-center pb-5">
          <div className="col-6 border border-white bg-white shadow-lg p-3 mb-5 bg-body rounded" style={{ borderRadius: "17px" }}>
            <div className="row">
              <div className="col mt-5 ms-5 pb-5 pe-4 shadow p-3 mb-5 bg-body rounded">
                <h3 className="mt-4 text-center" style={{ fontFamily: "Roboto", fontWeight: "700" }}>
                  SIGN UP
                </h3>
                <img src={IconLogin} width={120} className="mt-3 mx-auto d-block" />
                <form onSubmit={loginuser}>
                  <input required className="mt-3 form-control" onChange={(e) => setPostdata({ ...postdata, name: e.target.value })} value={postdata.name} type="text" name="name" id="name" placeholder="Username" />
                  <input
                    required
                    className="mt-2 form-control"
                    onChange={(e) => setPostdata({ ...postdata, password: e.target.value })}
                    value={postdata.password}
                    type="password" // Change input type to password
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                  <button type="submit" className="mt-3 btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col ms-3" style={{ marginTop: "60px" }}>
                <img className="mx-auto d-block" src={logo} alt="" width={130} style={{ paddingBottom: "10px" }} />
                <img src={IconTelepon} alt="" width={330} height={370} />
              </div>
            </div>
            <div className="mt-1 mb-4 text-center" style={{ fontFamily: "Poppins" }}>
              <p>
                Already a member?{" "}
                <a className="text-primary" onClick={toregister} style={{ textDecoration: "none", cursor:'pointer'}}>
                  Sign Up
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
