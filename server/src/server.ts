import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import env from "./util/validateEnv";
dotenv.config();
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(PORT, () => {
      console.log("server is running: ", PORT);
    });
  })
  .catch(console.error);
