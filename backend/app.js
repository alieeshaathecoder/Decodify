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
import timeComplexityRoute from "./routes/timeComplexity.routes.js";  
import spaceComplexityRoute from "./routes/spaceComplexity.routes.js";
import dryRunRoute from "./routes/dryRun.routes.js";

// USING ROUTES
app.use("/api/v1/topic", queryRoutes);
app.use("/api/v1/input", flowchartRoutes);
app.use("/api/v1/generate", timeComplexityRoute); 
app.use("/api/v1/generate", spaceComplexityRoute);
app.use("/api/v1/create" , dryRunRoute);

export default app;
