# 🛠️ Headline Generator Backend

This is the backend server for the Headline Generator App. It provides dynamic business headlines based on name, location, and industry, using pre-defined templates stored in a SQLite database.

## 📦 Tech Stack

- Node.js
- Express.js
- SQLite3
- CORS

## 📁 Folder Structure

backend/
├── db/
│ └── business.db # SQLite database storing headline templates
├── index.js # Main server file
├── package.json

shell
Copy
Edit

## 🚀 How to Run

### 1. Install Dependencies

```bash
cd backend
npm install
2. Start the Server
bash
Copy
Edit
node index.js
Server runs on: http://localhost:5000

🔗 API Endpoints
POST /business-data
Generate headline and mock rating/review data.

Body:

json
Copy
Edit
{
  "name": "Cafe Bliss",
  "location": "New York",
  "industry": "cafe"
}
Response:

json
Copy
Edit
{
  "rating": "4.1",
  "reviews": 120,
  "headline": "Why Cafe Bliss is New York's Coziest Coffee Spot"
}
GET /regenerate-headline?name=...&location=...&industry=...
Returns a new headline only.

Example:

pgsql
Copy
Edit
/regenerate-headline?name=Cafe%20Bliss&location=New%20York&industry=cafe
