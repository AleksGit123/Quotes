import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/router.js"
// port
const PORT = 8080;

// server
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectFolder = path.join(__dirname, "..");
const publicFolder = path.join(projectFolder, "public");
// quotes object
app.use("/",router)

// server listening and static
app.use(express.static(publicFolder));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});