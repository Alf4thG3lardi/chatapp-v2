import React from 'react'
import profil from '../../../assets/profilwa.png'

const ListUser = () => {
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
        <div className="col-5 border border-white bg-primary shadow-lg p-3 mb-5 bg-body rounded d-flex flex-column" style={{ width: "400px", height: "360px" }}>
          <div style={{ background: "#DBDDFF", cursor: "pointer" }}>
            <img className="ms-2" src={profil} alt="" width={73} height={75} style={{ float: "left" }} />
            <h5 className="pt-4" style={{ fontFamily: "Poppins", fontWeight: "600" }}>
              Alfath
            </h5>
          </div>
          </div>
      </div>
    </div>
  )
}

export default ListUser