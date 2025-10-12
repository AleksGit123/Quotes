import  express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";
const PORT = 8080;
const app = express();
app.use(cors())
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectFolder = path.join(__dirname,"..")
const publicFolder = path.join(projectFolder,"public")
app.use(express.static(publicFolder));
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})