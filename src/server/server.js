import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "..", "client", "dist");

const PORT = process.env.PORT;
const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

routes(app);

app.use(express.static(clientDist));

app.use("/api/*", (req, res) => {
  res.status(404).json({ message: `${req.originalUrl} not found` });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

export default app;
