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
    res.sendFile(__dirname + '/educator.html'); // Replace 'your_html_file.html' with your actual HTML file name
});

// Handle form submission
app.post('/register', (req, res) => {
    const fullname = req.body.fullname;
    const qualification = req.body.qualification;
    const experience = req.body.experience;
    const email = req.body.email;
    const gender = req.body.selectedGender;

    // Insert data into the 'student' table
    const sql = 'INSERT INTO educator (Fullname, Qualification, Experience, Email, Gender) VALUES (?, ?, ?, ?, ?)';
    const values = [fullname, qualification, experience, email, gender];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err.stack);
            res.send('Error inserting data into the database');
            return;
        }
        console.log('Data inserted into the database');
        //res.send('Your response is recorded');
    });
    res.redirect('/edudashboard.html');

});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
