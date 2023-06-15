/* eslint-disable import/no-extraneous-dependencies */
const joi = require("joi");
const { hashPassword } = require("../utils/auth");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      firstname: joi.string().max(45).presence(presence),
      mail: joi.string().email().presence(presence),
      password: joi.string().max(255).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// eslint-disable-next-line consistent-return
const addOne = async (req, res) => {
  const errors = validate(req.body);

  if (errors) return res.sendStatus(422);
  const { name, firstname, mail, password } = req.body;
  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    return res.sendStatus(500);
  }
  models.user
    .insert({
      name,
      firstname,
      mail,
      password: hashedPassword,
    })
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      if (err.errno === 1062) {
        return res.status(409).send("User already exist");
      }
      return res.sendStatus(500);
    });
};

// eslint-disable-next-line consistent-return
const edit = (req, res) => {
  const user = req.body;
  const errors = validate(req.body, false);
  if (errors) return res.sendStatus(422);
  const { password } = req.body;
  let hashedPassword = null;
  if (password) {
    hashedPassword = hashPassword(password);
    req.body.password = hashedPassword;
  }

  user.id = parseInt(req.params.id, 10);

  models.user
    .updateOne(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.errno === 1062) {
        return res.status(409).send("User already exist");
      }
      if (err.errno === 1452) {
        return res.sendStatus(422).send("Role does not exist");
      }
      return res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.candidate
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

// eslint-disable-next-line consistent-return
const getUserByMailToNext = async (req, res, next) => {
  const { mail } = req.body;
  console.warn(req.body);
  if (!mail) {
    return res.sendStatus(422);
  }
  const [result] = await models.user.findByMail(mail);
  if (result) {
    if (result[0] != null) {
      // eslint-disable-next-line prefer-destructuring
      const userType = "user";
      req.user = { ...result[0], userType };
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

module.exports = {
  browse,
  addOne,
  edit,
  destroy,
  getUserByMailToNext,
};
