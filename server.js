const express = require('express');

const MasterBackend =  require('./BackEnd/MasterBackend');

const app = express();
app.use(express.json());

app.get('/api/customers',(req,res)=>{


    console.log(MasterBackend);
    var mt = new MasterBackend.MasterBackend();
    
    const customers =[
       {id:1,Name:"John"},
       {id:2,Name:"Jack"},
       {id:3,Name:"Jill"}
    ];

    console.log("hello")

    res.json(customers);

});

const port  = 5000;

app.post('/api',(req,res)=> {
    console.log("hello");
    console.log(req.body);
});


app.listen(port,()=> console.log(`server started on port ${port}`))