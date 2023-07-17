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

const db_general = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "general_department",
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

app.get("/eee-books", (req, res) => {
  const sql = "SELECT * FROM eee";
  db_engg.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.get("/english-books", (req, res) => {
  const sql = "SELECT * FROM english";
  db_general.query(sql, (err, data) => {
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

app.post("/eee-book-add", (req, res) => {
  const title = req.body.title;
  const auther = req.body.auther;
  const edition = req.body.edition;
  const publisher = req.body.publisher;
  const img = req.body.img;
  const quantity = req.body.quantity;

  const sqlInsert =
    "INSERT INTO eee (title, auther, edition, publisher, img, quantity) VALUES (?,?,?,?,?,?)";
  db_engg.query(
    sqlInsert,
    [title, auther, edition, publisher, img, quantity],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/english-book-add", (req, res) => {
  const title = req.body.title;
  const auther = req.body.auther;
  const edition = req.body.edition;
  const publisher = req.body.publisher;
  const img = req.body.img;
  const quantity = req.body.quantity;

  const sqlInsert =
    "INSERT INTO english (title, auther, edition, publisher, img, quantity) VALUES (?,?,?,?,?,?)";
  db_general.query(
    sqlInsert,
    [title, auther, edition, publisher, img, quantity],
    (err, result) => {
      console.log(err);
    }
  );
});

app.delete("/cse-book-delete/:book_id", (req, res) => {
  const book = req.params.book_id;
  const sql = "DELETE FROM cse WHERE book_id = ?";
  db_engg.query(sql, book, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/eee-book-delete/:book_id", (req, res) => {
  const book = req.params.book_id;
  const sql = "DELETE FROM eee WHERE book_id = ?";
  db_engg.query(sql, book, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/english-book-delete/:book_id", (req, res) => {
  const book = req.params.book_id;
  const sql = "DELETE FROM english WHERE book_id = ?";
  db_general.query(sql, book, (err, result) => {
    if (err) console.log(err);
  });
});

app.post("/borrow-book-info", (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const auther = req.body.auther;
  const edition = req.body.edition;
  const publisher = req.body.publisher;
  const img = req.body.img;

  const sqlInsert =
    "INSERT INTO borrowBook (email, title, auther, edition, publisher, img) VALUES (?,?,?,?,?,?)";
  db_engg.query(
    sqlInsert,
    [email, title, auther, edition, publisher, img],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/borrow-books", (req, res) => {
  const sql = "SELECT * FROM borrowBook";
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
