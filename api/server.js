const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contacts");

const app = express();

app.use(express.json());

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://mongo:6JaZ25I9aFhWOgQ1@cluster0.f9jp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((error) => console.error(error));

//read
app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

//create
app.post("/contacts/new", (req, res) => {
  const newContact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
  });
  newContact.save();

  res.json(newContact);
});

//delete
app.delete("/contacts/delete/:id", async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.id);

  res.json(result);
});
//update
app.put("/contacts/complete/:id", async (req, res) => {
  const findContact = await Contact.findById(req.params.id);

  findContact.complete = !findContact.complete;

  findContact.save();

  res.json(findContact);
});

app.listen(3001, () => console.log("server started on port 3001"));
