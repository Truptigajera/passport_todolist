const User = require("../model/user.model");
const bcrypt = require('bcrypt');
// const JsonWebToken = require('jsonwebtoken');
const passport = require('passport')

/*----------------- TodoList With PassPort & EJS ---------------------*/

exports.register = async (req, res) => {
    try {

      let user = await User.findOne({ email: req.body.email, isDelete: false });

      if (user) {
        return res.status(400).json({ message: "User Already Exists." });
      }
      let hashpassword = await bcrypt.hash(req.body.password, 10);
      user = await User.create({ ...req.body, password: hashpassword });
      // console.log(user);
      res.status(201).redirect('user');
    } catch (err) {
      // Send error response once
      console.error(err);
      res.render('register');
    }
  };

exports.todolist = async (req,res)=>{
    try {
      console.log("hii");
        const users = await User.find({});
        if (users.length > 0) {
          console.log(users);
          return res.render('user', { users });  // Pass the users array to the EJS template
      } else {
          res.status(400).send("No users found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({mesg:"internal Server Error"})
    }
}
