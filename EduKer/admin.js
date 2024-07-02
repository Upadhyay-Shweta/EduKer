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
    var sql= "INSERT INTO admin(adminUserName, adminPassword) Values('admin','_admin')";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("database Created");
    });

});