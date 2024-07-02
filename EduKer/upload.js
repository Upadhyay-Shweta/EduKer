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
    var sql= "CREATE table upload(Sr_no INT NULL, Upload VARCHAR(300))";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("database Created");
    });

});