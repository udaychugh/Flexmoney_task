var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true 
}))

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', ()=>console.log("Error in connecting to database"));
db.once('open', ()=>console.log("connected to database"));

app.post('/register', (req,res)=>{
    var name = req.body.name;
    var age = req.body.age;
    var doj = req.body.doj;
    var months = req.body.months;
    var batch = req.body.batch;

    var data ={
        "name" : name,
        "age" : age,
        "doj" : doj,
        "months" : months,
        "batch" : batch
    }

    db.collection('users').insertOne(data, (err, collection)=>{
        if(err)
        {
            throw err;
        }
        console.log("User enroll yoga classes successfully");
    });

    return res.redirect('enrolled.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*' 
    });
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on port 3000");