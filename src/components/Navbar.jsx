import React from "react";
import DreacaLogo from "../assets/dreca-logo.png";
function Navbar() {
  const links = [
    {
      id: 1,
      link: "Home",
    },
    {
      id: 2,
      link: "Archives",
    },
  ];
  return (
    <div className="flex justify-between items-center w-full h-20 text-white fixed bg-black px-4 ">
      <div className="flex justify-center items-center cursor-pointer">
        <img src={DreacaLogo} alt="img" className="h-fit w-fit" />
        <p className="text-xl md:text-3xl font-bold">DreCaLabs</p>
      </div>
      <ul className="flex gap-4 md:mr-14 md:gap-12">
        {links.map(({ id, link }) => {
          return (
            <li
              key={id}
              className=" cursor-pointer font-medium text-gray-500 hover:scale-105 duration-200 "
            >
              {link}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
