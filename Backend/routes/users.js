var express = require("express");
var router = express.Router();
var { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const SECRET_KEY = "za5ed7xSQ1W2s@po!k?56Gh";
const initializePassport = require('../middleware/passport-config');
const authenticateToken = require('../middleware/authentificateToken');

initializePassport(passport);

// Configuration Mailtrap
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "970a5cd5bdea13",
    pass: "0503a42be7f51c"
  }
});

router.post("/register", async (req, res) => {
  const { nom, prenom, email, password } = req.body;

 
  if (!nom || !prenom || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({ nom, prenom, email, password: hashedPassword });

    
    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    await user.save();

    const verificationLink = `http://localhost:3000/users/verify/${token}`;

    const mailOptions = {
      from: 'ingdc@mail.com',
      to: email,
      subject: 'Vérification de votre adresse email',
      html: `<p>Merci pour votre inscription. Veuillez cliquer sur le lien suivant pour vérifier votre email :</p>
             <a href="${verificationLink}">Vérifiez votre email</a>`
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
      }
      console.log('Email envoyé : ' + info.response);
    });

    res.status(201).json({ message: "Inscription réussie. Veuillez vérifier votre email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
  }
});

router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ error: 'Token invalide ou expiré.' });
    }

    user.verificationToken = null;
    user.isVerified = true;
    await user.save();
    
    res.status(200).json({ message: 'Email vérifié avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de la vérification de l\'email.' });
  }
});


router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  
  const token = jwt.sign({ id: req.user.id }, SECRET_KEY, { expiresIn: "1h" });
    
  res.status(200).json({ message: "Connexion réussie", token });
});

module.exports = router;