const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Create a MySQL connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Main'
});

// Connect to the MySQL database
con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/admin.html'); 
});

// Handle form submission
app.post('/login', (req, res) => {
    const username = req.body.adminUserName;
    const password = req.body.adminPassword;

    // Insert data into the 'student' table
    const sql = 'SELECT * FROM admin WHERE adminUserName = ? AND adminPassword = ?';
    const values = [username,password];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            return res.status(500).json({ error: 'Internal server error' });
            
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Username or password is not correct' });
           
        }

        // User authenticated, return success
        //res.json({ message: 'Authentication successful' });

        res.redirect('/index.html');
    });

});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
