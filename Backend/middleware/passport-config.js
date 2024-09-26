const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    
    // Vérifier si l'utilisateur existe
    if (!user) {
      return done(null, false, { message: 'Email incorrect' });
    }
    
    // Vérifier si l'email est vérifié
    if (!user.isVerified) {
      return done(null, false, { message: 'Email non vérifié. Veuillez vérifier votre email.' });
    }
      
    try {
      // Comparer le mot de passe avec le mot de passe haché
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Mot de passe incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
  });
}

module.exports = initialize;
