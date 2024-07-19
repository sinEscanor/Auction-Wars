import React from "react";

import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="w-[40%] max-w-[250px] h-screen bg-slate-800 ">
      <li className="w-full items-center flex flex-col text-xl p-5 gap-5">
        <ul>
          <Link to={"/"}>Home</Link>
        </ul>
        <ul>
          <Link to={"/"}>Profile</Link>
        </ul>
        <ul>
          <Link to={"/"}>Products</Link>
        </ul>
        <ul>
          <Link to={"/"}>Auctions</Link>
        </ul>
        {/* <ul></ul> */}
      </li>
    </div>
  );
}
