const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

const URL = "#MONGOURI#";

mongoose.connect(process.env.MONGODB_URI || URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to DB")).catch(console.error);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
const Todo = require('./models/Todo');
const User = require('./models/Users');
const Cat = require('./models/Category');

app.post('/user/new', async(req,res) =>{
    let exist = await User.findOne({googleId: req.body.googleId});
    if(exist){
        res.status(200).json('user already exists.');
        return;
    }
    try{
        const user = new User({
            googleId: req.body.googleId,
            name: req.body.name
        });
        user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

app.get('/user/:id', async(req,res) =>{
    try{
    const user = await User.findById(req.params.id);

    res.json(user);
    }catch(error){
        console.log(error);
    }
});

app.get('/users', async(req,res) =>{
    try{
    const users = await User.find();

    res.json(users);
    }catch(error){
        console.log(error);
    }
});
app.get('/todos/:id', async(req,res) =>{
    try{
    const todos = await Todo.find({googleId:req.params.id});
    res.json(todos);
    }catch(error){
        console.log(error);
    }
});

app.get('/cats/:id', async(req,res) =>{
    try{
    const cats = await Cat.find({googleId:req.params.id});
    res.json(cats);
    }catch(error){
        console.log(error);
    }
});

app.post('/todo/new', async(req,res) =>{
    try{
        const todo = new Todo({
            googleId: req.body.googleId,
            text: req.body.text,
            category: req.body.category
        });
        todo.save();
        res.json(todo);
    }
    catch(err){
        console.log(err);
    }
    
});




app.post('/cat/new', async(req,res) =>{
    try{
        const cat = new Cat({
            googleId: req.body.googleId,
            name: req.body.name,
        });
        cat.save();
        res.json(cat);
    }
    catch(err){
        console.log(err);
    }
    
});

app.put("/cat/:id",async (req, res) =>{
    try{
        const updatedCat = await Cat.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new: true})
        res.status(200).json(updatedCat)
    }catch(err){
        res.status(500).json(err)
    }
})


app.delete('/todo/delete/:id', async(req,res) =>{
    try{
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
    }catch(error){
        console.log(error);
    }
});

app.delete('/cat/delete/:id', async(req,res) =>{
    try{
    const result = await Cat.findByIdAndDelete(req.params.id);
    await Todo.deleteMany({category: req.params.id});
    res.json(result);

    }catch(error){
        console.log(error);
    }
});

app.get('/todo/complete/:id', async(req,res) =>{
    try{
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();

    res.json(todo);
    }catch(error){
        console.log(error);
    }
});

app.listen(PORT, () => console.log("Server started "));
