const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Parse form data

// Connect to SQLite database
const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) console.error(err.message);
    console.log("Connected to SQLite database.");
});

// Create tasks table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL
)`);

// Route to display tasks
app.get("/", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) console.error(err.message);
        res.render("index", { tasks: rows });
    });
});

// Route to add a new task
app.post("/add", (req, res) => {
    const task = req.body.task;
    db.run("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
        if (err) console.error(err.message);
        res.redirect("/");
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});