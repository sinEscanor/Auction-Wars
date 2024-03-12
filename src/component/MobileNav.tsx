import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface VisibleI {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<VisibleI> = ({ isVisible, setIsVisible }) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.Authenticate.user);
  return (
    <div
      className={`fixed w-full  duration-300 bg-black bg-opacity-40   transition-transform z-40 flex-shrink-0 top-0 ${
        isVisible ? "left-0" : " -translate-x-full"
      }`}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div
        className=" text-white flex flex-col  text-xl font-light font-roboto justify-between bg-gradient-to-r from-[#210a0a] via-[#271d1d] to-[#170808]  h-[100vh] w-[60vw] p-4 shadow-md "
        // onClick={(e) => e.stopPropagation()}
      >
        <ul className="p-2 flex  flex-col space-y-6">
          <li className="mb-6 text-xl font-semibold">
            <h1>AUCTION WARS</h1>
          </li>

          <li className="hover:pl-3 duration-200">
            {" "}
            <Link to={"/"}>Home </Link>
          </li>

          <li className="hover:pl-2 duration-200">
            {" "}
            <Link to={"/auction/post"}>Post Auction </Link>
          </li>

          <li className="hover:pl-2 duration-200">
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
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
