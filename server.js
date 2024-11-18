const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./hero.db");

app.use(cors());
app.use(bodyParser.json());

// Get Hero Content
app.get("/api/hero", (req, res) => {
  db.get("SELECT * FROM hero_content WHERE id = 1", (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update Hero Content
app.post("/api/hero", (req, res) => {
  const { title, subtitle } = req.body;

  db.run(
    `UPDATE hero_content SET title = ?, subtitle = ? WHERE id = 1`,
    [title, subtitle],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Hero content updated successfully!" });
    }
  );
});

//add new services
app.get("/api/services", (req, res) => {
  db.all("SELECT * FROM services", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
