const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) console.error(err.message);
    console.log("Connected to SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL
)`);

app.get("/", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) console.error(err.message);
        res.render("index", { tasks: rows });
    });
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    db.run("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
        if (err) console.error(err.message);
        res.redirect("/");
    });
});

// New Delete Route
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM tasks WHERE id = ?", id, (err) => {
        if (err) console.error(err.message);
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});