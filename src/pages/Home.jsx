import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [addNote, setAddNote] = useState(false);
  return (
    <>
      <Navbar />
      <div className="h-fit min-h-screen  w-full bg-gradient-to-b from-black via-black to-gray-800">
        <div className="h-auto max-w-screen-lg mx-auto flex text-white flex-col">
          <div
            className="mt-28 ml-4 my-3 cursor-pointer hover:scale-105 duration-500  rounded-md border-dashed border-2 border-gray-300  h-10 flex justify-center items-center w-28 text-white"
            onClick={() => setAddNote(!addNote)}
          >
            Add a note
          </div>

          <div className="my-4 h-full flex flex-col mx-4 gap-6">
            {addNote && (
              <textarea
                placeholder="Enter Your Message"
                rows="3"
                className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none "
              />
            )}
            <div className="w-full cursor-pointer hover:scale-105 duration-500 min-h-[4rem] h-auto  flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              <p className="truncate  hover:text-clip hover:whitespace-normal ">
                {" "}
                hkj kdhjkodgheorghji vvjkdh fjkshkj kdhjkodgheorghjiv vv jkdh
                fjkshkj kdhjkodgheorghji jkdh fjkshkj kdhjkodgheorghji vjkdh
                fjkshkj kdhjkodgheorghji jkdh fjkshkj kdhjkodgheorghji jkdh
                fjkshkj kdhjkodgheorghji jkdh fjkshkj kdhjkodgheorghji vvjkdh
                fjkshkj kdhjkodgheorghjiv vv jkdh fjkshkj kdhjkodgheorghji jkdh
                fjkshkj kdhjkodgheorghji vjkdh fjkshkj kdhjkodgheorghji
              </p>
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              <p className="truncate  hover:text-clip hover:whitespace-normal ">
                {" "}
                hkj kdhjkodgheorghj
              </p>
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              <p className="truncate  hover:text-clip hover:whitespace-normal ">
                {" "}
                hkj kdhjkodgheorghj
              </p>
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              <p className="truncate  hover:text-clip hover:whitespace-normal ">
                {" "}
                hkj kdhjkodgheorghj
              </p>
            </div>

            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              jkdh fjkshkj kdhjkodgheorghji
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              jkdh fjkshkj kdhjkodgheorghji
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              jkdh fjkshkj kdhjkodgheorghji
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              jkdh fjkshkj kdhjkodgheorghji
            </div>
            <div className="w-full cursor-pointer hover:scale-105 duration-500 h-16 flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black">
              jkdh fjkshkj kdhjkodgheorghji
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
