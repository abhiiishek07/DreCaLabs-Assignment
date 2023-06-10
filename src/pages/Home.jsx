import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { BiMessageSquareAdd, BiMessageSquareX } from "react-icons/bi";

function Home() {
  const [addNote, setAddNote] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState("");
  const handleAddMsg = () => {
    const newItem = {
      id: Date.now(),
      message: msg,
    };
    tasks.unshift(newItem);
    setTasks(tasks);
    setAddNote(!addNote);
  };
  return (
    <>
      <Navbar />
      <div className="h-fit min-h-screen  w-full bg-gradient-to-br from-black via-black to-gray-800">
        <div className="h-auto max-w-screen-lg mx-auto flex text-white flex-col">
          <div
            className="mt-28 ml-4 my-3 cursor-pointer hover:scale-105 duration-500  rounded-md border-dashed border-2 border-gray-300  h-10 flex justify-center items-center w-28 text-white"
            onClick={() => setAddNote(!addNote)}
          >
            Add a task
          </div>

          <div className="my-4 h-full flex flex-col mx-4 gap-6">
            {addNote && (
              <div className="flex">
                <textarea
                  placeholder="Enter Your Message"
                  rows="2"
                  className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none w-full mr-1"
                  onChange={(e) => setMsg(e.target.value)}
                />

                <div className="flex justify-center items-center gap-3">
                  <BiMessageSquareAdd
                    size={30}
                    className="cursor-pointer"
                    onClick={handleAddMsg}
                  />
                  <BiMessageSquareX
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setAddNote(!addNote)}
                  />
                </div>
              </div>
            )}
            {tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className="w-full cursor-pointer hover:scale-105 duration-500 min-h-[4rem] h-auto  flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black  hover:text-clip hover:whitespace-normal"
                >
                  <p className="truncate  hover:text-clip hover:whitespace-normal ">
                    {" "}
                    {task.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
