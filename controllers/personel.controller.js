"use strict";

const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Personel = require("../models/Personel");

module.exports.getPersonel = function (req, res, next) {
  Personel.find({})
    .then((data) => {
      let dataArr = [];
      if (data) {
        data.forEach((item) => {
          dataArr.push(item);
        });
      }
      res.send(dataArr);
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

module.exports.getPersonelById = function (req, res, next) {
  Personel.findById(req.params.id)
    .then((service) => {
      res.send(service);
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

module.exports.create = function (req, res, next) {
  if (!req.body.name) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const member = new Personel({
    name: req.body.name,
    role: req.body.role,
    photo: req.body.photo,
    bio: req.body.bio,
  });

  member
    .save(member)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the team member.",
      });
    });
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;

  Personel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update team member with id=${id}. Not found.`,
          });
      } else {
        res
          .status(200)
          .send({ message: "Team member was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating team member with id=" + id,
      });
    });
};

module.exports.delete = (req, res, next) => {
  Personel.findByIdAndDelete(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete team member with id=${id}. Not found.`,
        });
      } else {
        res
          .status(200)
          .send({ message: "Team member was deleted successfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete team member with id=" + id });
    });
};
