const express = require("express");
const router = express.Router();
const User = require("../models/userschema");
const jwt = require("jsonwebtoken");
const { findOneAndRemove } = require("../models/userschema");
router.post('/signup',async(req, res) => {
        const user = new User(req.body);
        console.log(user);
        try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token }); 
        // shorthand syntax to define both properties.(user:user, token:token)
        //res.send(user);
        }
        catch(err){
        res.json(err);
    }
});
router.post('/login', async (req,res) =>{ //login
    try{
    // Creating a separate function to match the user's credentials(from the whole User collection)
    const user = await User.findByCredentials(req.body.email, req.body.password);
    console.log(user);
    // we're trying to generate a token for a very specific user.
    const token = await user.generateAuthToken();
    console.log(token);
    res.json({user: user, token: token});
    } catch(e){
    res.status(400).send();
    }
});
router.get('/users', async(req, res) => {
    try{
        const user = await User.find({});
        console.log(user);
        res.json(user);
    }catch(err)
    {
        res.json("No Users Found");
    }
});
router.delete('/delete/:id', async(req, res) => {
    try{
        const user = await User.findOneAndRemove({_id:req.params.id});
        res.json(user);
    }
    catch(err)
    {
        res.json(err);
    }
});
router.patch('/update/:id', async(req, res) => {
    try{
    const user =  await User.findOneAndUpdate({_id:req.params.id},req.body);
    const updated = await User.findById({_id:req.params.id});
    res.json(updated);    
    }
    catch(err)
    {
        res.json(err);
    }
});
module.exports = router;