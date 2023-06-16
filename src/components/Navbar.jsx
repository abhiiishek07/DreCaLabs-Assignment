import React, { useState } from "react";
import DreacaLogo from "../assets/dreca-logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { auth } from "../firebase/FirebaseAuth";
import { useSelector } from "react-redux";
function Navbar() {
  const [crossBar, setCrossBar] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const links = [
    {
      id: 0,
      link: "Home",
      style: "border-b-2 border-gray-400",
      func: () => navigate("/home"),
    },
    {
      id: 1,
      link: "Archives",
      style: "border-b-2 border-gray-400",
      func: () => navigate("/archives"),
    },
    {
      id: 2,
      link: "Logout",
      func: () => auth.signOut(),
    },
  ];
  return (
    <div className="flex justify-between items-center w-full h-20 text-white fixed bg-black px-0 md:px-4 ">
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={DreacaLogo} alt="img" className="h-fit w-fit" />
        <p className="text-xl md:text-3xl font-medium">DreCaLabs</p>
      </div>
      <ul className="hidden md:flex gap-4 md:mr-14 md:gap-12">
        {user.user &&
          links.map(({ id, link, func, style }) => {
            return (
              <li
                key={id}
                className="cursor-pointer font-bold text-gray-500 hover:scale-105 duration-200"
                onClick={func}
              >
                {link}
              </li>
            );
          })}
      </ul>
      {user.user && (
        <>
          <div
            className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            onClick={() => setCrossBar(!crossBar)}
          >
            {crossBar ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
          {user.user && crossBar && (
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800">
              {links.map(({ id, link, func }) => {
                return (
                  <li
                    key={id}
                    className="px-4 cursor-pointer font-medium py-6 text-4xl "
                    onClick={func}
                  >
                    {link}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Navbar;
