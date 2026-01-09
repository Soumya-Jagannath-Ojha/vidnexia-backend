import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";



const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

// express common middleware
app.use(express.json({limit: "16kb"}))    // to recieve file
app.use(express.urlencoded({extended: true, limit: "16kb"}))   //EX: url space percentage
app.use(express.static("public"))   //Static files
app.use(cookieParser())


// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRoutes from "./routes/user.routes.js";




// routes
app.use("/api/v1/healthcheck",healthcheckRouter);
app.use("/api/v1/users",userRoutes);




export {app};