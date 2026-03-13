import express from 'express';

const app = express()

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// IMPORTING ROUTES
import queryRoutes from "./routes/query.routes.js";

app.use("/api/v1/topic", queryRoutes);

export default app;