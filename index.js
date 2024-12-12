const express = require('express');
const userSchema = require('./model/userModel')
const app = express();
const path = require('path')

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public'))); 


//Create User Route

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/create',async (req,res)=>{
  const {name,email,password,profileUrl} = req.body;
  await userSchema.create({
    name:name,
    email:email,
    password:password,
    profileUrl:profileUrl
  })
res.redirect('/')

})

//All Users Route
app.get('/users',async (req,res)=>{
  let userdata = await userSchema.find()
  res.render('users',{userdata})
})
//Edit User Route
app.get('/edit/:id',async (req,res)=>{
    let user = await userSchema.findOne({_id:req.params.id});
 
    res.render('edit',{user})
    
})
app.post('/update/:id',async(req,res)=>{
    const {name,email,profileUrl} = req.body;
    await userSchema.findOneAndUpdate({_id:req.params.id},{$set:{name:name,email:email,profileUrl:profileUrl}})    
    res.redirect('/users')
})
//Delete User Route
app.get('/delete/:id',async (req,res)=>{
  await userSchema.findOneAndDelete({_id:req.params.id})
res.redirect('/users')
})



app.listen(3000)