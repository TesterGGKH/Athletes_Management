const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Create database connection pool instead of single connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Xutchidi!2', // Your MySQL password
    database: 'athletes_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection and tables
db.query('SELECT 1', (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected successfully');
    
    // Test tables existence
    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.error('Error checking tables:', err);
            return;
        }
        console.log('Available tables:', results);
    });
});

// Athletes endpoints
app.get('/api/athletes', (req, res) => {
    const query = 'SELECT * FROM athletes ORDER BY created_at DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching athletes:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Athletes fetched:', results.length);
        res.json({ data: results });
    });
});

app.post('/api/athletes', (req, res) => {
    const { name, gender, sport, age, country } = req.body;
    const query = 'INSERT INTO athletes (name, gender, sport, age, country) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [name, gender, sport, age, country], (err, result) => {
        if (err) {
            console.error('Error adding athlete:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Athlete added:', result.insertId);
        res.json({ id: result.insertId, ...req.body });
    });
});

// Coaches endpoints
app.get('/api/coaches', (req, res) => {
    const query = 'SELECT * FROM coaches ORDER BY created_at DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching coaches:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Coaches fetched:', results.length);
        res.json({ data: results });
    });
});

app.post('/api/coaches', (req, res) => {
    const { name, gender, sport, age, country } = req.body;
    const query = 'INSERT INTO coaches (name, gender, sport, age, country) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [name, gender, sport, age, country], (err, result) => {
        if (err) {
            console.error('Error adding coach:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Coach added:', result.insertId);
        res.json({ id: result.insertId, ...req.body });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});