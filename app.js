import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser, { json } from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("home");
const handleTest = (req, res) => res.send("test");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/test", handleTest);
app.use("/user", userRouter);

export default app;
