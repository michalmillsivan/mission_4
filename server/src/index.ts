import express from "express"
import cors from "cors"
import connectToDB from "./connection";
import dotenv from "dotenv"
import operationsRoutes from "./routes/Opperations";

const app = express();
dotenv.config()
app.use(express.json())


app.use(cors())
connectToDB()

app.get("/health-check", (req, res, next) => {
    res.status(200).send("Api is working!")
})

app.use("/opperations", operationsRoutes)

app.use((error: any, req: any, res: any, next: any) => {
    console.log(error)
    res.status(409).send("Something went Wrong")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Listen to API, API is running on port: ", PORT) 
})