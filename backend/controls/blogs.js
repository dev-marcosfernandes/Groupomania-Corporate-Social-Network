const sequelize = require('../models');
const User = sequelize.User;
const Post = sequelize.Post;
const fs = require('fs');
const Comments = sequelize.Comment;

exports.createPost = async (req, res, next) => {
  const post = JSON.parse(req.body.post);
  const titre = post.titre;
  const texte = post.texte;
  const user_id = req.params.id;
  const user = await User.findByPk(user_id);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  } let imageUrl
  if (req.file) {
    console.log("filename", req.file.filename)
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  const publi = await Post.create({ titre, texte, imageUrl, user_id });
  return res.json(publi);
}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({where: {id: req.params.id}})
    console.log("Post trouvé :", post)
    if (User.admin == 0 && post.user_id !== req.auth.userId) {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      });
    }
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images")[1]
      console.log("Filename to Delete", filename)
      fs.unlink(`images/${filename}`, function(error) {
        if(error){
          throw error;
        }
        Post.destroy({where: {id: req.params.id}})
        res.status(200).json({message: "Post et image supprimé"})
      })
    } else {
      Post.destroy({where: {id: post.id}}, {truncate: true})
      res.status(200).json({message: "Post supprimé"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
};

exports.findAll = async (req, res, next) => {
  try {
    Post.findAll({ attributes: ["id", "titre", "texte", "imageUrl", "user_id"], })
      .then(posts => {
        posts.map(posts => {
        });
        res.json(posts)
      })
  } catch (error) { return res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts ", }) }
};

exports.findOne = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id
    }, attributes: ["id", "titre", "texte", "imageUrl", "user_id", "createdAt"]
  }).then(
    (post) => {
      if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
      }
      res.status(200).json(post);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};


exports.findAllPostsUser = async (req, res, next) => {
  try {
    Post.findAll({
      where: { user_id: req.params.id },
      attributes: ["id", "titre", "texte", "imageUrl", "user_id"],
    })
      .then(posts => {
        posts.map(posts => {
        });
        res.json(posts)
      })
  } catch (error) { return res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts ", }) }
};


exports.findOnePost = async (req, res, next) => {
  try {
    Post.findOne({
      where: { user_id: req.params.id },
      attributes: ["id", "titre", "texte", "imageUrl", "user_id"],
    })
      .then(posts => {
        posts.map(posts => {
        });
        res.json(posts)
      })
  } catch (error) { return res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts ", }) }
};


