import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase/FirebaseAuth";

function PublicItems() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const db = getFirestore();
    const itemsCollectionRef = collection(db, "users", userId, "items");
    const q = query(itemsCollectionRef, where("publicView", "==", true));

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
  const handleLike = async (itemId, val) => {
    if (!user.user) {
      const loginRedirectUrl = `/?redirect=${encodeURIComponent(
        window.location.pathname
      )}`;
      console.log("redirected url", loginRedirectUrl);
      navigate(loginRedirectUrl);
    } else {
      const id = itemId.toString();
      const itemRef = doc(db, "users", userId, "items", id);
      console.log("yop");

      try {
        await updateDoc(itemRef, { liked: val });
        console.log("Item liked successfully.");
        fetchItems();
      } catch (error) {
        console.error("Error liking item:", error);
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-fit min-h-screen w-full bg-gradient-to-br from-black via-black to-gray-950">
        <div className="h-auto max-w-screen-lg mx-auto flex text-white flex-col">
          <div className="my-4 h-full flex flex-col mx-4 gap-6">
            <div className="mt-28 my-3 text-2xl border-dashed border-b-2 border-gray-300 h-10 flex items-end w-fit  text-white ">
              Public Tasks :
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
                    {item.liked ? (
                      <AiFillHeart
                        size={20}
                        color="red"
                        onClick={() => handleLike(item.id, false)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={20}
                        onClick={() => handleLike(item.id, true)}
                      />
                    )}
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

export default PublicItems;
