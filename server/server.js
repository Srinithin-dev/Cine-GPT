import express from "express";
const app = express();
const PORT = 8080;

app.post("/findMovie", (req, res) => {});

app.listen(PORT, () => {
  console.log("server running in " + PORT);
});
