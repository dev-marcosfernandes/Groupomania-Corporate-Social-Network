const sequelize = require('../models');
const User = sequelize.User;
const Comment = sequelize.Comment;

exports.createComment = async (req, res, next) => {
    try {
      const user = await User.findOne({
        attributes: ["prenom", "nom", "email"],
        where: {id: req.params.id},
      })
      console.log("utilisateur trouvé", user.dataValues)
      const comment = await Comment.create({
        texte: req.body.texte,
        user_id: req.params.id,
        post_id: req.body.post_id,
      })
      console.log("commentaire créé", comment.dataValues)
      res.status(201).json({comment: comment})
    } catch(erreur) {res.status(500).send({error: erreur.message})}};


    exports.deleteComment = async (req, res) => {
      const comment_id = await Comment.findOne({where: {id: req.params.id}})
      if (User.admin == 0 && comment_id.user_id !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      const comment = await Comment.destroy({where: {id: req.params.id}})
      res.status(200).json({comment, message: "Commentaire supprimé"})};


    exports.findAll = async (req, res, next) => {
      try {
        Comment.findAll({
          where: { post_id: req.params.id },
          attributes: ["id", "texte", "post_id", "user_id"],
          })
          .then(comments => {
            comments.map(comments => {
            });
            res.json(comments)
          })
      } catch (error) {
        return res.status(500).send({
          error: "Une erreur est survenue lors de la récupération des posts "})}};


          exports.findOne = (req, res, next) => {
            Comment.findOne({
              where: { id: req.params.id }
            }).then(
              (comment) => {
                if (!comment) {
                  return res.status(404).json({ message: "Comment non trouvé" });
                }
                res.status(200).json(comment);
              }
            ).catch(
              () => {
                res.status(500).send(new Error('Database error!'));
              }
            )
          };