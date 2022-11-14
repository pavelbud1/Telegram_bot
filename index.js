import express from "express";
import mongoose from "mongoose";
import initBot from "./src/initBot";
import Storage from "./src/classes/Storage";

const port = process.env.PORT || 3000;
const app = express();

export const storage = new Storage();

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://pass:word@cluster0.2dlpseg.mongodb.net/?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    const bot = initBot();
    await storage.setProducts();
    bot.launch();
    app.listen(port, () => console.log("listening on port ", port));
  } catch (err) {
    console.error(err);
  }
}

startServer();
