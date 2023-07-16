const express = require("express");
const { createPool } = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/cse-book-add", (req, res) => {
  const title = req.body.title;
  const auther = req.body.auther;
  const edition = req.body.edition;
  const publisher = req.body.publisher;
  const img = req.body.img;
  const quantity = req.body.quantity;

  const sqlInsert =
    "INSERT INTO cse (title, auther, edition, publisher, img, quantity) VALUES (?,?,?,?,?,?)";
  db_engg.query(
    sqlInsert,
    [title, auther, edition, publisher, img, quantity],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
