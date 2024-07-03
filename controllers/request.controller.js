"use strict";

const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(
  config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const Request = require("../models/Request");

module.exports.getRequests = function(req, res, next) {
  Request.find({})
  .then(data => {
    let dataArr = [];
      if (data) {
        data.forEach(item => {
          dataArr.push(item);
        });
      }
      res.send(dataArr);
  })
  .catch(err => { return res.status(500).send({ message: err.message })})
};

module.exports.getRequestById = function(req, res, next) {
  Request.findById(req.params.id)
  .then(service => {
    res.send(service);
  })
  .catch(err => { return res.status(500).send({ message: err.message })})
};

module.exports.create = function(req, res, next) {
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // const request = new Request({
  //   name: req.body.name,
  //   email: req.body.email,
  //   message: req.body.message,
  //   category: req.body.category
  // });
  const request = new Request({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message,
    phone: req.body.phone
  });

  request
  .save(request)
  .then((data) => res.status(201).send(data))
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the service.",
    });
  });
};

module.exports.update = (req, res, next) => {
  Request.findById(req.params.id, (err, request) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!request) {
      return res.status(400).send({ message: "Request not found." });
    }

    request.name = req.body.name;
    request.email = req.body.email;
    request.message = req.body.message;
    request.category = req.body.category;

    request.save(err => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.send(request);
    });
  });
};

module.exports.delete = (req, res, next) => {
  Request.findById(req.params.id, (err, request) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!request) {
      return res.status(400).send({ message: "Request not found." });
    }
    Request.find({ _id: req.params.id }, (err, requests) => {
      request.remove(err => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Request successfully deleted." });
      });
    });
  });
};
