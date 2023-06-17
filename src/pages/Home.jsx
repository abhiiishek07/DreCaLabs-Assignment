import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { BiMessageSquareAdd, BiMessageSquareX } from "react-icons/bi";
// import { db } from "../firebase/FirebaseAuth";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   setDoc,
// } from "firebase/firestore";
import { MdArchive, MdOutlineEdit } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

function Home() {
  const [addNote, setAddNote] = useState(false);
  const user = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = React.useState(false); // for mui modal box to
  const [selectedItem, setSelectedItem] = useState({ id: null, title: "" });
  const valueRef = useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const fetchItems = async () => {
  //   const itemsCollectionRef = collection(db, "users", user.user.uid, "items");
  //   const q = query(itemsCollectionRef, where("archived", "==", false));

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     console.log("home");
  //     const fetchedItems = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setItems(fetchedItems);
  //   } catch (error) {
  //     console.error("Error retrieving items in home:", error);
  //   }
  // };
  // const createItem = async () => {
  //   if (msg.length === 0) {
  //     setAddNote(!addNote);
  //     return;
  //   }
  //   const newItem = {
  //     id: Date.now(),
  //     title: msg,
  //     archived: false,
  //     publicView: true,
  //   };
  //   const db = getFirestore();
  //   const itemsCollectionRef = collection(db, "users", user.user.uid, "items");

  //   try {
  //     await setDoc(doc(itemsCollectionRef, newItem.id.toString()), newItem);
  //     setMsg("");
  //     setAddNote(!addNote);
  //     fetchItems();
  //   } catch (error) {
  //     console.error("Error adding item:", error);
  //   }
  // };
  // const updateItem = async () => {
  //   const id = selectedItem.id.toString();
  //   const itemRef = doc(getFirestore(), "users", user.user.uid, "items", id);

  //   try {
  //     await updateDoc(itemRef, { title: valueRef.current.value });
  //     console.log("Item updated successfully.");
  //     fetchItems();
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //   }
  // };
  // const archiveItem = async (itemId) => {
  //   const id = itemId.toString();
  //   const itemRef = doc(db, "users", user.user.uid, "items", id);

  //   try {
  //     await updateDoc(itemRef, { archived: true, publicView: false }); //if item is archived then it will be not shown in public page also
  //     console.log("Item archived successfully.");
  //     fetchItems();
  //   } catch (error) {
  //     console.error("Error archiving item:", error);
  //   }
  // };
  // const handlePublicView = async (itemId, value) => {
  //   const id = itemId.toString();
  //   const itemRef = doc(db, "users", user.user.uid, "items", id);

  //   try {
  //     await updateDoc(itemRef, { publicView: value });
  //     console.log("Item view chnaged successfully.");
  //     fetchItems();
  //   } catch (error) {
  //     console.error("Error :", error);
  //   }
  // };

  const fetchItems = async () => {
    try {
      console.log("trying to fetch", user.user.uid);
      const response = await axios.get(
        `http://localhost:5000/api/users/${user.user.uid}/items?archived=false`
      );

      setItems(response.data);
    } catch (error) {
      console.error("Error retrieving items:", error);
    }
  };
  const createItem = async () => {
    if (msg.length === 0) {
      setAddNote(!addNote);
      return;
    }

    const newItem = {
      title: msg,
      archived: false,
      publicView: true,
    };

    try {
      await axios.post(
        `http://localhost:5000/api/users/${user.user.uid}/items`,
        newItem
      );
      setMsg("");
      setAddNote(!addNote);
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async () => {
    const updatedItem = {
      title: valueRef.current.value,
      archived: selectedItem.archived,
      publicView: selectedItem.publicView,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/users/${user.user.uid}/items/${selectedItem.id}`,
        updatedItem
      );
      console.log("Item updated successfully.");
      fetchItems();
      handleClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const archiveItem = async (itemId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user.user.uid}/items/${itemId}/handleArchive`,
        { archived: true }
      );
      console.log("item archived successfully");
      fetchItems();
    } catch (error) {
      console.error("Error updating item to archive:", error);
    }
  };
  const handlePublicView = async (itemId, val) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user.user.uid}/items/${itemId}/handlePublicView`,
        { publicView: val }
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
          <div
            className="mt-28 ml-4 my-3 cursor-pointer hover:scale-105 duration-500  rounded-md border-dashed border-2 border-gray-300  h-10 flex justify-center items-center w-28 text-white"
            onClick={() => setAddNote(!addNote)}
          >
            Add a task
          </div>

          <div className="my-4 h-full flex flex-col mx-4 gap-6">
            {addNote && (
              <div className="flex  xl:w-[66.5rem]">
                <textarea
                  placeholder="Enter Your Message"
                  rows="2"
                  className="p-2 w-full bg-transparent border-2 rounded-md text-white focus:outline-none mr-1"
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
            {items.map((item) => {
              console.log(item);
              return (
                <div
                  key={item.id}
                  className="w-full cursor-pointer hover:scale-105 duration-500 min-h-[4rem] h-auto  flex justify-start items-center p-2 rounded-md border-2 border-gray-500 shadow-md lg:hover:bg-white md:hover:text-black "
                >
                  <div className="w-[72%] md:w-[88%] lg:w-[90%] mr-3">
                    <p className="truncate  hover:text-clip hover:whitespace-normal ">
                      {" "}
                      {item.title}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 ">
                    <MdOutlineEdit
                      size={20}
                      onClick={() => {
                        handleSelectedItem(item);
                        handleClickOpen();
                      }}
                    />
                    <MdArchive size={20} onClick={() => archiveItem(item.id)} />
                    {item.publicView ? (
                      <AiOutlineEye
                        size={20}
                        onClick={() => handlePublicView(item.id, false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        size={20}
                        onClick={() => handlePublicView(item.id, true)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-multiline-static"
            defaultValue={selectedItem.title}
            multiline
            rows={4}
            inputRef={valueRef}
            style={{ width: 300, marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            color="success"
            rows={4}
            style={{ margin: "1rem 1rem 0 0" }}
            onClick={updateItem}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ margin: "1rem 1rem 0 0" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Home;
