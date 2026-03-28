import dotenv from "dotenv"

dotenv.config({
  path: "./backend/.env",
});

import connectDB from "./connection/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR", error);
  });
