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

app.put("/user/update", (req, res) => {
  const {
    id,
    username,
    email,
    password,
    imageUrl,
    receiveUpdatesEmails,
    receiveProgressEmails,
  } = req.body;

  // Walidacja wymaganych danych
  if (!id) {
    return res.status(400).json({ error: "User ID jest wymagane" });
  }

  // Tworzymy obiekt pól do aktualizacji
  const updates = {};
  if (username) updates.username = username;
  if (email) updates.email = email;
  if (password) updates.password = password;
  if (imageUrl) updates.imageUrl = imageUrl;
  ["receiveUpdatesEmails", "receiveProgressEmails"].forEach((key) => {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  });

  // Jeśli nie ma żadnych pól do aktualizacji, zwracamy błąd
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "Brak danych do aktualizacji" });
  }

  // Generujemy dynamiczne zapytanie SQL
  const fields = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(updates);

  const query = `UPDATE user SET ${fields} WHERE id = ?`;
  values.push(id); // Dodajemy `id` jako ostatni parametr do zapytania

  // Wykonanie zapytania SQL
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Błąd podczas aktualizacji użytkownika:", err.message);
      return res
        .status(500)
        .json({ error: "Nie udało się zaktualizować użytkownika" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Nie znaleziono użytkownika o podanym ID" });
    }

    res.status(200).json({ message: "Użytkownik zaktualizowany pomyślnie" });
  });
});

app.get("/user", (req, res) => {
  const { id } = req.query; // Używamy req.query

  if (!id) {
    return res.status(400).json({ error: "User ID jest wymagane" });
  }

  const sql =
    "SELECT id, username ,email ,imageUrl,receiveUpdatesEmails,receiveProgressEmails  FROM user WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Błąd podczas pobierania użytkownika:", err.message);
      return res
        .status(500)
        .json({ error: "Nie udało się pobrać użytkownika" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "Nie znaleziono użytkownika o podanym ID" });
    }

    res.status(200).json({ user: result[0] }); // Zwróć dane użytkownika
  });
});

app.delete("/user/delete/image", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const sql = "UPDATE user SET imageUrl = NULL WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the image." });
    }

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Image successfully removed from user." });
    } else {
      return res
        .status(404)
        .json({ error: "User not found or no image to delete." });
    }
  });
});

app.post("/user/change-password", async (req, res) => {
  const { currentPassword, newPassword, id } = req.body;

  if (!currentPassword || !newPassword || !id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Pobierz użytkownika z bazy danych
    const sql = "SELECT password FROM user WHERE id = ?";
    const [user] = await new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = user.password;

    // Porównaj obecne hasło
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      hashedPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Haszuj nowe hasło
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Zapisz nowe hasło w bazie danych
    const updateSql = "UPDATE user SET password = ? WHERE id = ?";
    await new Promise((resolve, reject) => {
      db.query(updateSql, [newHashedPassword, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
