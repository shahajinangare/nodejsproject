var express = require("express");
var path = require("path");
var bodyParser = require('body-parser'); 
var morgan = require("morgan");
var db = require("./config.js");

var app = express();
var port = process.env.port || 3000;
var srcpath  =path.join(__dirname,'/templates') ;
app.use(express.static('templates'));
app.use(bodyParser.json({limit:'5mb'}));  
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

var mongoose = require("mongoose");

var schema = mongoose.Schema;
//var logDetSchema = new Schema({ type: Object });
var activityLogSchema = new schema({   
    modulename: { type: String },
    urlpath: { type: String } , 
    message: { type: String } , 
    logdetails:{ type: Object },
    clientip: { type: String },
    createdby: { type: String },   
    createddate: { type: String }
},{ versionKey: false });

var model = mongoose.model('activitylog', activityLogSchema, 'activitylog');

//api for get data from database
app.get("/api/getlogs",function(req,res){ 
    model.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{           
            res.send(data);
        }
    });
})

//api for Insert data from database
app.post("/api/insertrecord",function(req,res){ 
    var mod = new model(req.body);
    mod.logdetails=JSON.parse(mod.logdetails);
    mod.save(function(err,data){
        if(err){
            res.send(err);              
        }
        else{      
                res.send({data:"Activity log has been Inserted !!!"});
        }
    });
})

//api for Update data from database
app.post("/api/updaterecord",function(req,res){ 
    model.findByIdAndUpdate(req.body.id, { modulename:  req.body.modulename, 
        message: req.body.message, 
        urlpath:req.body.urlpath,
        logdetails:req.body.logdetails,
        clientip:req.body.clientip,
        createdby: req.body.createdby,
        createddate:req.body.createddate }, 
    function(err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send({data:"Activity log has been Updated..!!"});
        });
})  

//api for Delete data from database
app.post("/api/deleterecord",function(req,res){ 
    model.remove({ _id: req.body.id }, function(err) {
        if(err){
            res.send(err);
        }
        else{  
            res.send({data:"Activity log has been Deleted !!!"});           
        }
    });
})

// call by default index.html page
app.get("*",function(req,res){ 
    res.sendFile(srcpath +'/index.html');
})

//server stat on given port
app.listen(port,function(){ 
    console.log("Server Start on Port : "+ port);
})
   