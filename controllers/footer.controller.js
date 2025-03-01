"use strict";

const mongoose = require("mongoose");
const config = require(appRoot + "/config");
const Footer = require(appRoot + "/models/Footer");

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.getFooterInfo = function (req, res, next) {
  Footer.find({})
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

// module.exports.getFooterInfoById = function(req, res, next) {
//     Footer.findById(req.params.id, (err, info) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     }
//     if (!info) {
//       return res.status(400).send({ message: "Info not found." });
//     }
//     res.send(info);
//   });
// };

module.exports.update = (req, res, next) => {
  Footer.findById(req.params.id, (err, info) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!info) {
      return res.status(400).send({ message: "Info not found." });
    }

    // info.location = req.body.location;
    // info.phone = req.body.phone;
    // info.email = req.body.email;
    // info.hours = req.body.hours;
    info.aboutMsg = req.body.aboutMsg;

    info.save((err) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.send(info);
    });
  });
};
