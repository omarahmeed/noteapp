import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  let navigate = useNavigate;
  function logOut() {
    localStorage.removeItem("usertoken");
    navigate("/login");
  }

  return (
    <>
      <div>
        <div className="p-0 min-vh-100 bg-dark">
          <ul className="text-light list-unstyled">
            <li className="p-3 pe-lg-2 d-lg-flex d-none  ">
              <i className="fa-regular fa-note-sticky text-info fs-2"></i>
              <p className="ps-3 fs-4">Notes</p>
            </li>

            <li className="p-3 pe-lg-5 sidebar-element">
              <a href="/#" className="nav-link px-0 px-lg-2">
                {" "}
                <i className="bi-house" />
                <span className="px-lg-2 ms-1 d-none d-lg-inline">
                  Home
                </span>{" "}
              </a>
            </li>

            <li className="p-3 pe-lg-5 sidebar-element">
              <a href="/#" className="nav-link px-0 px-lg-2">
                {" "}
                <i className="bi bi-box-arrow-left"></i>
                <span
                  onClick={logOut}
                  className="px-lg-2 ms-1 d-none d-lg-inline"
                >
                  Logout
                </span>{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
