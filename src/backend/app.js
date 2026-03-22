import express from "express";
import cors from "cors";


const app = express();
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

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
import flowchartRoutes from "./routes/flowchart.routes.js";

// USING ROUTES
app.use("/api/v1/topic", queryRoutes);
app.use("/api/v1/input", flowchartRoutes);

export default app;
