"use strict";

const mongoose = require("mongoose");
const config = require("../config");
const Homepage = require("../models/Homepage");

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.getHomepage = function (req, res, next) {
  Homepage.find({})
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

module.exports.getHomepageById = function (req, res, next) {
  Homepage.findById(req.params.id)
    .then((service) => {
      res.send(service);
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  Homepage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update Homepage with id=${id}. Not found.`,
          });
      } else {
        res.status(200).send({ message: "Homepage was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Homepage with id=" + id,
      });
    });
};
