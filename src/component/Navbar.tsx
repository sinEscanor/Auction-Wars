import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { RxHamburgerMenu } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const user = useSelector((state: any) => state.Authenticate.user);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <MobileNav isVisible={isVisible} setIsVisible={setIsVisible} />
      <nav className="flex justify-between  items-center py-3">
        <h1 className="text-lg">Auctionwars</h1>
        <ul className="md:flex hidden items-center">
          <li className="hover:text-amber-500">
            {" "}
            <Link to="/"> Home</Link>
          </li>
          <li className="hover:text-amber-500">
            <Link to="/product/post"> Post a product</Link>
          </li>
          <li className="hover:text-amber-500">
            <Link to="/product"> Products</Link>
          </li>
          <li className="ml-9">
            {" "}
            {user ? (
              <button
                onClick={() => navigate("/userinfo")}
                className="bg-gradient-to-r from-[#EC9F05] to-[#FF4E00]  rounded-lg p-2 px-4"
              >
                {" "}
                {user.user.name}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-[#20BF55] to-[#01BAEF] bg-clip-text bg-transparent rounded-lg p-2 px-4 "
              >
                {" "}
                Login
              </button>
            )}{" "}
          </li>
        </ul>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsVisible(!isVisible)}
        >
          <RxHamburgerMenu />
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
