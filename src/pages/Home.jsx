import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiMessageSquareAdd, BiMessageSquareX } from "react-icons/bi";
import { db } from "../firebase/FirebaseAuth";
import { QuerySnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { MdArchive, MdUnarchive } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
function Home() {
  const [addNote, setAddNote] = useState(false);
  const user = useSelector((state) => state.user);

  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchItems = async () => {
    const db = getFirestore();
    const itemsCollectionRef = collection(db, "users", user.user.uid, "items");
    const q = query(itemsCollectionRef, where("archived", "==", false));

    try {
      const querySnapshot = await getDocs(q);
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error retrieving items:", error);
    }
  };
  const createItem = async () => {
    const newItem = { id: Date.now(), title: msg, archived: false };
    const db = getFirestore();
    const itemsCollectionRef = collection(db, "users", user.user.uid, "items");

    try {
      await setDoc(doc(itemsCollectionRef, newItem.id.toString()), newItem);
      setMsg("");
      setAddNote(!addNote);
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
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
                    onClick={createItem}
                  />
                  <BiMessageSquareX
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setAddNote(!addNote)}
                  />
                </div>
              </div>
            )}
            {items.length === 0 && (
              <p className="text-3xl flex relative left-0 xl:left-64 top-44">
                Oops! No task available
              </p>
            )}
            {items.map((item) => {
              console.log(item);
              return (
                <div
                  key={item.id}
                  className="w-full cursor-pointer hover:scale-105 duration-500 min-h-[4rem] h-auto  flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md hover:bg-white hover:text-black "
                >
                  <div className="w-[78%] md:w-[88%] lg:w-[92%] mr-2">
                    <p className="truncate  hover:text-clip hover:whitespace-normal ">
                      {" "}
                      {item.title}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 md:gap-4 ">
                    <MdArchive size={22} />
                    <AiOutlineEye size={22} />
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

export default Home;
