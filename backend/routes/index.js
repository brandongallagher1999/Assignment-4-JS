const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
const TaskSchema = require("../models/task");

let dbConnection = mongoose.createConnection("mongodb+srv://cryptoguys:LXwbkgdz5G9QOr7p@cluster0.bk4fd.mongodb.net/asmt4?retryWrites=true&w=majority", {useNewUrlParser : true});


const TaskCollection = dbConnection.model("TaskCollection", TaskSchema, "Task");


//POST: /api/tasks/create
router.post("/tasks/create", (req, res, next) => {
  const tempTask = new TaskCollection(req.body);
  try
  {
    tempTask.save(); 
    res.status(200).send("Task Saved!");
  }
  catch (e)
  {
    res.status(500).send({ message: "Could not create user.", user : req.body});
  }

});

//GET: /api/tasks/all
router.get('/tasks/all', (req, res, next) => {
  
  try
  {
    TaskCollection.find({}, (err, docs) => {
      res.status(200).send(docs);
    });
  }
  catch (e)
  {
    console.log(e);
  }
});

//DELETE: /api/tasks/delete/{id}
router.delete("/tasks/delete/:id", (req, res, next) => {
  try
  {
    TaskCollection.findByIdAndDelete({_id : req.params.id}, err => {
      if (err)
      {
          console.log(err);
      }
      else{
          console.log("oay");
      }
    });

    res.status(200).send({ message : `Delete user ${req.params.id}`});
  }
  catch (e)
  {
    res.status(500).send({ message : `Failed to delete user.`});
  }
});

//PUT: /api/tasks/update
router.put("/tasks/update", (req, res, next) => {
  try
  {
    TaskCollection.findByIdAndUpdate({_id : req.body.id}, {
      Name : req.body.name,
      Priority : req.body.priority,
      Complete: req.body.complete
    }, (err, docs) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).send({ message : `Update user ${req.body.id}`});
  }
  catch (e)
  {
    res.status(500).send({ message : `Failed to update user.`});
  }
});


module.exports = router;
