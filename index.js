const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const industryTemplates = {
  bakery: [
    ({ name, location }) => `Why ${name} is ${location}'s Sweetest Bakery in 2025`,
    ({ name, location }) => `Fresh Bakes & Big Love – ${name} in ${location}`,
    ({ name, location }) => `Locals Crave ${name} – The Best Bakery in ${location}`,
  ],
  salon: [
    ({ name, location }) => `Discover Why ${name} is the Go-To Salon in ${location}`,
    ({ name, location }) => `${name} is Redefining Beauty in ${location}`,
    ({ name, location }) => `${location} Women Love the Style at ${name}`,
  ],
  cafe: [
    ({ name, location }) => `Why ${name} is ${location}'s Coziest Coffee Spot`,
    ({ name, location }) => `Sip, Relax, Repeat – ${name} in ${location}`,
    ({ name, location }) => `Top Café in ${location}? It's ${name}`,
  ],
  general: [
    ({ name, location }) => `Why ${name} is ${location}'s Top Business in 2025`,
    ({ name, location }) => `${name} is Making Waves in ${location}`,
    ({ name, location }) => `Discover What Makes ${name} Stand Out in ${location}`,
  ],
};

const generateHeadline = (name, location, industry) => {
  const templates = industryTemplates[industry?.toLowerCase()] || industryTemplates.general;
  const templateFn = templates[Math.floor(Math.random() * templates.length)];
  return templateFn({ name, location });
};

app.post("/business-data", (req, res) => {
  const { name, location, industry } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required." });
  }

  const simulatedData = {
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300 + 50),
    headline: generateHeadline(name, location, industry),
  };

  res.json(simulatedData);
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location, industry } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required." });
  }

  const headline = generateHeadline(name, location, industry);
  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
