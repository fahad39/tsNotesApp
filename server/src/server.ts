import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello, world");
});

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(PORT, () => {
      console.log("server is running: ", PORT);
    });
  })
  .catch(console.error);
