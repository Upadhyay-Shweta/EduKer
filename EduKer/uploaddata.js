const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
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

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/edudashboard.html'); 
});

//set a multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
    
});

//initialise multer
const upload = multer({ storage: storage });
// Handle form submission
app.post('/submit',upload.single('file'), (req, res) => {
    // const sr_no = req.body.sr_no;
    const upload = req.body.Upload;

    // Insert data into the 'student' table
    const sql = 'INSERT INTO upload (Upload) VALUES (?)';
    const values = [upload];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err.stack);
            res.send('Error inserting data into the database');
            return;
        }
        console.log('File is uploaded into the database');
        res.send('Your response is recorded');
    });
    // res.redirect("/edudashboard.html");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
