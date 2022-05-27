const sequelize = require('../models');
const User = sequelize.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordSchema = require('../models/validator-password');
require('dotenv').config();

exports.signup = async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  userInfo = {
    prenom: req.body.prenom,
    nom: req.body.nom,
    email: req.body.email,
    password: hash,
  }
  console.log("user prêt à être créé", userInfo)  
  try {
    const user = await User.create(userInfo)
    console.log("Utilisateur crée !", userInfo)
    res.status(200).json({
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: "Erreur serveur" })
  }
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            id: user.id,
            admin: user.admin,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
              expiresIn: "24h",
            })
          });
        }) 
        .catch(error => res.status(500).json({ error }));
    })
};


  exports.delete = async (req, res, next) => {
   const user_id = User.findOne({where: {id: req.params.id}})
    if (User.admin == 0 && user_id.user_id !== req.auth.userId) {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      });
    }
    if (User.photo) {
      const filename = user_id.photo.split("/images")[1]
      console.log("Filename to Delete", filename)
      fs.unlink(`images/${filename}`, function(error) {
        if(error){
          throw error;
        }
        User.destroy({
          where: {
            id: req.params.id
          }
        })
      })
    } else
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Profil supprimé" });
      }
      else {
        res.status(404).json({ message: "Profil non trouvé" })
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}


exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.params.id } })
    if (req.file) {
      console.log("filename", req.file.filename)
      user.photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    if (req.body.prenom) {
      user.prenom = req.body.prenom
      console.log("Ancien prenom : ", user.prenom)
    }
    if (req.body.nom) {
      user.nom = req.body.nom
      console.log("Ancien nom : ", user.nom)
    }
    if (req.body.email) {
      user.email = req.body.email
      console.log("Ancien email : ", user.email)
    }
    if (req.body.password) {
      function generateHash(user) {
        if (user === null) {
          throw new Error('No found employee');
        }
        else if (!user.changed('password')) return user.password;
        else {
          let salt = bcrypt.genSaltSync();
          return user.password = bcrypt.hashSync(user.password, salt);
        }
      }
      User.beforeUpdate(generateHash);
      user.password = req.body.password
      console.log("Ancien password : ", user.password)
    }
    try {
      user.save({})
      console.log("New userInfo : ", user)
      res.status(200).json({
        user: user,
        messageRetour: "Votre profil a bien été modifié",
      })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de votre proifl" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
};


exports.findAll = async (req, res, next) => {
  try {
    User.findAll({
      attributes: ["id", "prenom", "nom", "email", "photo"],
    }).then(users => {
      users.map(users => {
      });
      res.json(users)
    })
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenue lors de la récupération des utilisateurs",
    })
  }
};

exports.findOne = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }, attributes: ["id", "prenom", "nom", "email", "photo"]
  }).then(
    (user) => {
      if (!user) {
        return res.status(404).json({ message: "Profil non trouvé" });
      }
      res.status(200).json(user);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};