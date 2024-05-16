import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { noteState } from "../Atoms/noteAtom.js";

export default function Layout() {
  let [notelength, setnotelength] = useRecoilState(noteState);
  return (
    <>
      <div
        style={{ backgroundColor: "#0DCAF0" }}
        className="w-100 p-2 text-white text-center fixed-top "
      >
        Notes App :{notelength}
      </div>

      <Outlet></Outlet>
    </>
  );
}
