const express = require('express');
const fileUpload = require('express-fileupload');
const { v4 } = require('uuid');



const MasterBackend =  require('./BackEnd/MasterBackend');

const app = express();
app.use(express.json());
app.use(fileUpload())

var models = [{id:4,Name:"J",is_Ready:false,type:"NonLinear"},
                {id:5,Name:"Jake",is_Ready:false,type:"Linear"}]

console.log(models);


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


app.get('/api/models',(req,res) =>{

    res.json(models)
})


app.post('/api/models/add',(req,res) => {
    
    models.push(req.body);
    console.log(models);

})

app.get(`/api/models/:id`,(req,res)=>{

    models.forEach(model => {if(model.id == req.params.id){res.json(model);console.log(model)}});
    
})

const port  = 5000;

app.post('/api',(req,res)=> {
    //console.log(req.body);
    models.push(req.body);
    //console.log(models);

});

app.delete('/api/models/delete/:id',(req,res) => {
     
     console.log(req.params.id);
     const tmp = models.filter((model) => model.id != req.params.id);
     models = tmp;
     console.log(models);
     
})

app.post('/api/file/add',(req,res) => {   
    if(req.files) {
        console.log(req.files)
        var file = req.files.myFile
        var filename = file.name
        console.log(filename)
    }
    file.mv('./uploads/'+filename,function(err){
        if(err){
            res.send(err)
        }else{
            res.send("File Uploaded")
        }
    })
    
})
app.listen(port,()=> console.log(`server started on port ${port}`))