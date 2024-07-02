var mysql=require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:""
});
con.connect(function(err){
    if(err) throw err;
    console.log("Database connected!");
    var sql= "CREATE database Main";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("database Created");
    });

});