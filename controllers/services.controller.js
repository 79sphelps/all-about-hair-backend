"use strict";

const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Services = require("../models/Service");

module.exports.getServices = function (req, res, next) {
  // Services.find({}, (err, data) => {
  //   let dataArr = [];
  //   if (err) {
  //     return res.status(500).send({ message: err.message });
  //   }

  //   if (data) {
  //     data.forEach(item => {
  //       dataArr.push(item);
  //     });
  //   }
  //   res.send(dataArr);
  // });

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
  // Services.findById(req.params.id, (err, service) => {
  //   if (err) {
  //     return res.status(500).send({ message: err.message });
  //   }
  //   if (!service) {
  //     return res.status(400).send({ message: "Service not found." });
  //   }
  //   res.send(service);
  // });
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

  // Services.findOne({ title: req.body.title }, (err, existingService) => {
  //   if (err) {
  //     return res.status(500).send({ message: err.message });
  //   }
  //   if (existingService) {
  //     return res
  //       .status(409)
  //       .send({ message: "You already have this service." });
  //   }

  //   const service = new Services({
  //     title: req.body.title,
  //     description: req.body.description,
  //     image: req.body.image,
  //     pricing: req.body.pricing
  //   });

  //   service.save(err => {
  //     if (err) {
  //       return res.status(500).send({ message: err.message });
  //     }
  //     res.send(service);
  //   });
  // });
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

  // Services.findById(req.params.id, (err, service) => {
  //   if (err) {
  //     return res.status(500).send({ message: err.message });
  //   }
  //   if (!service) {
  //     return res.status(400).send({ message: "Service not found." });
  //   }

  //   service.title = req.body.title;
  //   service.description = req.body.description;
  //   service.image = req.body.image;
  //   service.pricing = req.body.pricing;

  //   service.save(err => {
  //     if (err) {
  //       return res.status(500).send({ message: err.message });
  //     }
  //     res.send(service);
  //   });
  // });
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

  // Services.findById(req.params.id, (err, service) => {
  //   if (err) {
  //     return res.status(500).send({ message: err.message });
  //   }
  //   if (!service) {
  //     return res.status(400).send({ message: "Service not found." });
  //   }
  //   Services.find({ _id: req.params.id }, (err, services) => {
  //     service.remove(err => {
  //       if (err) {
  //         return res.status(500).send({ message: err.message });
  //       }
  //       res.status(200).send({ message: "Service successfully deleted." });
  //     });
  //   });
  // });
};
