import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";

const app = express();
// Configure CORS with specific options
const corsOptions = {
  origin: "https://gigih-final-lilac.vercel.app", // Allow only this origin
  methods: "*", // Allow all methods
};

app.use(cors(corsOptions));
app.use(express.json());

//NOTE - Routes
import videoRoutes from "./app/router/video.js";
import commentRoutes from "./app/router/comment.js";
import productRoutes from "./app/router/product.js";
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/product", productRoutes);

app.use((req, res) => {
  res.status(404).send("Not Found/Invalid route");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT || 3000);
});
