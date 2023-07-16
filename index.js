const express = require("express");
const { createPool } = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 5000;

const db_engg = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "engineering_department",
  connectionLimit: 50,
});

app.get("/", (req, res) => {
  res.send("Library management Server running!");
});

app.get("/cse-books", (req, res) => {
  const sql = "SELECT * FROM cse";
  db_engg.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
