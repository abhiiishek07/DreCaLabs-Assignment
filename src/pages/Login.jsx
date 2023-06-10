import React from "react";
import DreacaLogo from "../assets/dreca-logo.png";
import { BsGoogle, BsGithub } from "react-icons/bs";
function Login() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-800 w-full h-screen text-white ">
      <div className="max-w-screen-lg flex items-center text-2xl md:text-4xl  h-1/6">
        <div className=" flex items-center p-0 m-4 cursor-pointer">
          <img src={DreacaLogo} alt="img" className="h-fit w-fit" />
          <p>DreCaLabs</p>
        </div>
      </div>
      <div className="flex flexc-col justify-center py-20 px-6 xl:px-72 items-center w-full h-5/6">
        <div className="w-full h-full">
          <p className="text-2xl md:text-5xl font-bold">
            Welcome to our app! Log in to unlock a seamless and personalized
            experience.
          </p>
          <p className="text-xl md:text-3xl py-4 md:py-8 text-gray-300 ">
            With our app, you can effortlessly manage your tasks, stay
            organized, and boost your productivity.
          </p>
          <div className="flex flex-col xl:flex-row justify-around items-center gap-4">
            <button className="py-4 flex justify-center items-center gap-3 border-2 rounded-md hover:text-black hover:bg-white w-full xl:w-1/2">
              {" "}
              <BsGoogle />
              Sign In With Google
            </button>
            <button className="py-4 flex justify-center items-center gap-3 border-2 rounded-md hover:text-black hover:bg-white w-full xl:w-1/2">
              <BsGithub />
              Sign In With Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
