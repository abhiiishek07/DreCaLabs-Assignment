const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

const db = admin.firestore();
