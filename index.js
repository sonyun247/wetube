import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("home");

const handleTest = (req, res) => res.send("test");

app.get("/", handleHome);
app.get("/test", handleTest);
app.listen(PORT, handleListening);
