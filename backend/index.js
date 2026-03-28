import dotenv from "dotenv"

dotenv.config({
  path: "./backend/.env",
});

import connectDB from "./connection/index.js";
import app from "./app.js";

const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR", error);
  });
