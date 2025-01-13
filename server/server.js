const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileUrl = `http://localhost:3000/uploads/${file.filename}`;

  res.json({ url: fileUrl });
});

// Serwowanie plików statycznych
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
