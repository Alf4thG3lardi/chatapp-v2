import React, { useState } from "react";
import { useEffect, useContext } from "react";
import Connection from "../../connection/connection";
import { Navigate } from "react-router-dom";
import IconLogin from "../../assets/iconlogin.png";
import IconTelepon from "../../assets/telepooon.png";
import "./register.css";
import logo from "../../assets/logoooo.png";
import ReCAPTCHA from 'react-google-recaptcha';


const Register = () => {
  const { setChatuserForm, storeChatuser, chatuserValue } = useContext(Connection);

  const tologin = () => {
    window.location.href = "/login";
  };

  useEffect(() => {}, []);

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const onChange = (value) => {
        setRecaptchaValue(value);
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
        Sign up now to continue
          
        </p>
        <div className="row mx-auto justify-content-center pb-5">
          <div className="col-6 border border-white bg-white shadow-lg p-3 mb-5 bg-body rounded" style={{ borderRadius: "17px" }}>
            <div className="row">
              <div className="col mt-5 ms-5 pb-5 pe-4 shadow p-3 mb-5 bg-body rounded">
                <h3 className="mt-4 text-center" style={{ fontFamily: "Roboto", fontWeight: "700" }}>
                  SIGN UP
                </h3>
                <img src={IconLogin} width={120} className="mt-3 mx-auto d-block" />
                <form onSubmit={storeChatuser}>
                  <input required className="mt-3 form-control" onChange={setChatuserForm} value={chatuserValue["username"]} type="text" name="username" id="name" placeholder="Username"/>
                  <input required className="mt-2 form-control" onChange={setChatuserForm} value={chatuserValue["password"]} type="password" name="password" id="password" placeholder="Password"/>

                  <ReCAPTCHA sitekey="6LeC4vsoAAAAAClbqn87RBaMHRokUJ3ANNMJvJyv" onChange={onChange}/>
                  
                  <input type="submit" className="mt-3 btn btn-primary" value="Submit" />
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
                <a className="text-primary" onClick={tologin} style={{ textDecoration: "none", cursor:'pointer'}}>
                  Login Here
                </a>{" "}
                {/* <button type="button" className="btn btn-info" onClick={tologin}>
                    Login
                  </button> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
