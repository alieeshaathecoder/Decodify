import express from 'express';
import cors from "cors";

const app = express()

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// IMPORTING ROUTES
import queryRoutes from "./routes/query.routes.js";

app.use("/api/v1/topic", queryRoutes);
app.get("/", (req, res) => {
  res.send("Server is working")
});

export default app;