import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { db } from "../firebase/FirebaseAuth";
import { useSelector } from "react-redux";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
import { MdUnarchive } from "react-icons/md";
import axios from "axios";

function Archives() {
  const user = useSelector((state) => state.user);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      console.log("trying to fetch", user.user.uid);
      const response = await axios.get(
        `http://localhost:5000/api/users/${user.user.uid}/items?archived=true`
      );

      setItems(response.data);
    } catch (error) {
      console.error("Error retrieving items:", error);
    }
  };
  const unArchiveItem = async (itemId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user.user.uid}/items/${itemId}/handleArchive`,
        { archived: false }
      );
      console.log("item archived successfully");
      fetchItems();
    } catch (error) {
      console.error("Error updating item to archive:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-fit min-h-screen  w-full bg-gradient-to-br from-black via-black to-gray-950">
        <div className="h-auto max-w-screen-lg mx-auto flex text-white flex-col">
          <div className="my-4 h-full flex flex-col mx-4 gap-6">
            <div className="mt-28 my-3 text-2xl border-dashed border-b-2 border-gray-300 h-10 flex items-end w-fit  text-white ">
              Archived items
            </div>
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full cursor-pointer hover:scale-105 duration-500 min-h-[4rem] h-auto  flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md lg:hover:bg-white md:hover:text-black "
                >
                  <div className="w-[88%] md:w-[93%] lg:w-[95%] mr-3">
                    <p className="truncate  hover:text-clip hover:whitespace-normal ">
                      {" "}
                      {item.title}
                    </p>
                  </div>
                  <div className="flex justify-end items-center ">
                    <MdUnarchive
                      size={20}
                      onClick={() => unArchiveItem(item.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Archives;
