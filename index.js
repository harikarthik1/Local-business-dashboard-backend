const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./headlines.db");

app.use(cors());
app.use(express.json());

const PORT = 5000;

const generateHeadline = (name, location, industry, callback) => {
  const fallbackIndustry = "general";
  const selectedIndustry = industry?.toLowerCase() || fallbackIndustry;

  db.all(
    "SELECT template FROM headlines WHERE industry = ?",
    [selectedIndustry],
    (err, rows) => {
      if (err || rows.length === 0) {
        // fallback to general
        db.all("SELECT template FROM headlines WHERE industry = ?", [fallbackIndustry], (fallbackErr, fallbackRows) => {
          const templates = fallbackRows.map(r => r.template);
          const template = templates[Math.floor(Math.random() * templates.length)];
          callback(fillTemplate(template, name, location));
        });
      } else {
        const templates = rows.map(r => r.template);
        const template = templates[Math.floor(Math.random() * templates.length)];
        callback(fillTemplate(template, name, location));
      }
    }
  );
};

const fillTemplate = (template, name, location) => {
  return template
    .replace(/{{name}}/g, name)
    .replace(/{{location}}/g, location);
};

app.post("/business-data", (req, res) => {
  const { name, location, industry } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required." });
  }

  generateHeadline(name, location, industry, (headline) => {
    const simulatedData = {
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 300 + 50),
      headline,
    };
    res.json(simulatedData);
  });
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location, industry } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required." });
  }

  generateHeadline(name, location, industry, (headline) => {
    res.json({ headline });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
