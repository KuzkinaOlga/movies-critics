/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      movies_details: joi.string().max(1000).presence(presence),
      user_id: joi.number().integer().presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const addOne = async (req, res) => {
  const errors = validate(req.body);
  console.warn(req.body);
  if (errors) {
    const errorMessages = errors.details.map((error) => error.message);
    return res.status(422).json({ errors: errorMessages });
  }
  const { name, movies_details, user_id } = req.body;
  if (!user_id) {
    return res.status(422).json({ errors: ["User ID is required"] });
  }

  models.post
    .insert({
      name,
      movies_details,
      user_id,
    })
    .then(([result]) => {
      res.location(`/blogs/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      if (err.errno === 1062) {
        return res.status(409).send("Article already exist");
      }
      return res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.post
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  addOne,
  browse,
};
