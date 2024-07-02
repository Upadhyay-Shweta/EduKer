var mysql=require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"Main"
});
con.connect(function(err){
    if(err) throw err;
    console.log("Database connected!");
    var sql= "CREATE table student(fullname VARCHAR(30), Age INT, Class INT, Email VARCHAR(20), Gender Enum('Male', 'Female', 'Transmale/Transfemale'))";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("database Created");
    });

});