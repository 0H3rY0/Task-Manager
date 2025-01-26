const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
const { emit } = require("process");
const { error } = require("console");
const bcrypt = require("bcrypt");

const app = express();
const upload = multer({ dest: "uploads/" });

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileUrl = `http://localhost:3000/uploads/${file.filename}`;

  res.json({ url: fileUrl });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task-manager",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ? AND password = ? ";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json("Login Failed");
    if (data.length <= 0) {
      console.log("No record");
    } else {
      console.log("this is user: " + data);
      return res.json(data);
    }
  });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO user (username, email, password) VALUES (?,?,?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.log("Error inserting user: " + err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email is already in use" });
        }
        return res.status(500).json({ error: "Database error" });
      }

      return res.status(201).json({
        message: "User registered successfullly!",
        userId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
