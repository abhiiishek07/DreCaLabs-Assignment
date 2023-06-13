import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { BiMessageSquareAdd, BiMessageSquareX } from "react-icons/bi";
import { db } from "../firebase/FirebaseAuth";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
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
import { MdArchive, MdUnarchive, MdOutlineEdit } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Home() {
  const [addNote, setAddNote] = useState(false);
  const user = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState({ id: 123, title: "" });
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
    if (msg.length === 0) {
      setAddNote(!addNote);
      return;
    }
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
  const updateItem = async () => {
    const id = selectedItem.id.toString();
    const itemRef = doc(getFirestore(), "users", user.user.uid, "items", id);

    try {
      await updateDoc(itemRef, { title: valueRef.current.value });
      console.log("Item updated successfully.");
      fetchItems();
      handleClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const archiveItem = async (itemId) => {
    const id = itemId.toString();
    const itemRef = doc(db, "users", user.user.uid, "items", id);

    try {
      await updateDoc(itemRef, { archived: true });
      console.log("Item archived successfully.");
      fetchItems();
    } catch (error) {
      console.error("Error archiving item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  console.log("selected item", selectedItem);
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
                  <div className="w-[72%] md:w-[88%] lg:w-[90%] mr-3">
                    <p className="truncate  hover:text-clip hover:whitespace-normal ">
                      {" "}
                      {item.title}
                    </p>
                  </div>
                  {/* <div className="w-[72%] md:w-[88%] lg:w-[90%] mr-3">
                    <input
                      type="text"
                      className="truncate  hover:text-clip hover:whitespace-normal bg-transparent border-none h-full"
                      value={item.title}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div> */}
                  <div className="flex justify-center items-center gap-2 ">
                    <MdOutlineEdit
                      size={20}
                      onClick={() => {
                        handleSelectedItem(item);
                        handleClickOpen();
                      }}
                    />
                    <MdArchive size={20} onClick={() => archiveItem(item.id)} />
                    <AiOutlineEye size={20} />
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
