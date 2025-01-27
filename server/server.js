const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
const { emit } = require("process");
const { error } = require("console");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const upload = multer({ dest: "uploads/" });

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task-manager",
});

const SECRET_KEY = "your_secret_key";

app.use(express.json());
app.use(cors(corsOptions));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileUrl = `http://localhost:3000/uploads/${file.filename}`;

  res.json({ url: fileUrl });
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const user = data[0];

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Tworzenie tokena JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload tokena
        SECRET_KEY, // Sekretny klucz
        { expiresIn: "1h" } // Ważność tokena
      );

      // Zwrot tokena i danych użytkownika
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Error comparing passwords:", err);
      return res.status(500).json({ error: "Internal server error" });
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
          const match = err.message.match(
            /Duplicate entry '(.*?)' for key '(.*?)'/
          );
          return res
            .status(400)
            .json({ error: `${match[2]} is already in use` });
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
