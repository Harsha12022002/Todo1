const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017/Todo';
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

const UserSchema = new mongoose.Schema(
  {
      email: String,
    password: String
  },
  { collection: 'Users' });

const User = mongoose.model('User', UserSchema);

const ListSchema=new mongoose.Schema(
    {
        email:String,
        task_name:String,
        Date:String,
        status:String,
    },
    { collection:'List'}
)

const List=mongoose.model('List',ListSchema);
app.post('/task',async(req,res)=>{
    try{
        const newTask=new List(req.body);
        const saved=await newTask.save();
        console.log(saved);
        res.status(201).send("done");
    }catch(e){
        res.status(400).send("error occured");
    }
})


app.delete('/task',async(req,res)=>{
    try{
       const deleted=await List.deleteOne({status:"Completed"});
        console.log(deleted);
        res.status(201).send("done");
    }catch(e){
        res.status(400).send("error occured");
    }
})

app.put('/task',async(req,res)=>{
  const id=req.query.id;
  try{
    const update=await List.updateOne({id:id},{$set:{status:"Completed"}});
    console.log(update)
    res.status(200);
  }
  catch(error){
    res.status(404);
  }
})

app.get('/task', async (req, res) => {
  const email = req.query.email;
  console.log(email)
  try {
    const findout = await List.find({ email: email });

    if (findout.length > 0) {
      return res.status(200).send(findout);
    }

    res.status(200).send([]);
  } catch (error) {
    res.status(400).send("Error occurred");
  }
});

app.post('/users', async (req, res) => {
    const email = req.body.email;
  console.log(email)
    try {
      const check = await User.find({ email: email });
  
      if (check.length > 0) {
        console.log("Account with mail id already present");
        res.status(200).send("already");
      } else {
        try {
          const newUser = new User(req.body);
          const savedUser = await newUser.save();
          console.log('Saved User:', savedUser);
          res.status(201).json(savedUser);
        } catch (err) {
          console.error('Error:', err);
          res.status(500).send('Error creating user');
        }
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(400).send('Error checking user existence');
    }
  });
  

  app.get('/Login', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    
    try {
      const check = await User.find({ email: email, password: password });
      
      if (check.length !== 0) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).json({ message: "Server error" });
    }
  });


  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
