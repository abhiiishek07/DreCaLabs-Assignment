const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSENGER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

const db = admin.firestore();

app.get("/", (req, res) => {
  console.log("server is running");
  res.send("Server is running successfully!");
});

// fetching all data with archived val
app.get("/api/users/:userId/items", async (req, res) => {
  const { userId } = req.params;
  const { archived } = req.query;

  try {
    let itemsSnapshot;

    if (archived === "true") {
      itemsSnapshot = await db
        .collection("users")
        .doc(userId)
        .collection("items")
        .where("archived", "==", true)
        .get();
    } else {
      itemsSnapshot = await db
        .collection("users")
        .doc(userId)
        .collection("items")
        .where("archived", "==", false)
        .get();
    }

    const items = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

//creating a new item
app.post("/api/users/:userId/items", async (req, res) => {
  const { userId } = req.params;
  const { title, archived, publicView } = req.body;

  try {
    const newItemRef = await db
      .collection("users")
      .doc(userId)
      .collection("items")
      .doc();

    const newItem = {
      id: newItemRef.id,
      title,
      archived,
      publicView,
    };

    await newItemRef.set(newItem);

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// PUT request to update an existing item for a specific user
app.put("/api/users/:userId/items/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;
  const { title, archived, publicView } = req.body;

  try {
    const itemRef = db
      .collection("users")
      .doc(userId)
      .collection("items")
      .doc(itemId);

    await itemRef.update({
      title,
      archived,
      publicView,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

//put to archive the item
app.put("/api/users/:userId/items/:itemId/handleArchive", async (req, res) => {
  const { userId, itemId } = req.params;
  const { archived } = req.body;

  try {
    const itemRef = db
      .collection("users")
      .doc(userId)
      .collection("items")
      .doc(itemId);

    await itemRef.update({ archived });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// handling the public View of a item
app.put(
  "/api/users/:userId/items/:itemId/handlePublicView",
  async (req, res) => {
    const { userId, itemId } = req.params;
    const { publicView } = req.body;

    try {
      const itemRef = db
        .collection("users")
        .doc(userId)
        .collection("items")
        .doc(itemId);

      await itemRef.update({ publicView });

      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Failed to update item" });
    }
  }
);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
