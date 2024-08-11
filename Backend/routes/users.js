var express = require("express");
var router = express.Router();
var { User } = require("../models");
const bcrypt = require('bcrypt'); 
const { where } = require("sequelize");
const { Model } = require("sequelize");


router.post("/register", async (req, res) => {
  const { nom, prenom, email, password } = req.body;
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ nom, prenom, email, password: hashedPassword });
    res.status(201).json({ message: "Successful registration" });
    if(!user){
      return res.status(401).json({error:'Registration failed'})
    }
  } catch (error) {
    res.status(404).json({ error:'server is not found' });
  }
})

router.post('/login', async(req,res)=>{
  const{email,password}= req.body
  try{
    const user = await User.findOne({where:{email}})
    if(!user){
      return res.status(401).json({error: 'Incorrect email or password'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({error:'Incorrect email or password'})
    }
    res.status(200).json({message: 'Successful login'})
    return;
    
  }catch(error){
    res.status(500).json({error: 'Erreur du serveur'})
  }
})


module.exports = router;