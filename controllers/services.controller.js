"use strict";

const mongoose = require("mongoose");
const config = require("../config");
const Services = require("../models/Service");

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports.getServices = function (req, res, next) {
  Services.find({})
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

module.exports.getServiceById = function (req, res, next) {
  Services.findById(req.params.id)
    .then((service) => {
      res.send(service);
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

module.exports.create = function (req, res, next) {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const service = new Services({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    pricing: req.body.pricing,
  });

  service
    .save(service)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the service.",
      });
    });
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;

  Services.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot update Service with id=${id}. Not found.` });
      } else {
        res.status(200).send({ message: "Service was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Service with id=" + id,
      });
    });
};

module.exports.delete = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to delete cannot be empty." });
  }

  const id = req.params.id;

  // Services.findByIdAndRemove(id, { useFindAndModify: false })
  Services.findByIdAndDelete(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete service with id=${id}. Not found.`,
        });
      } else {
        res.status(200).send({ message: "Service was deleted successfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete service with id=" + id });
    });
};
