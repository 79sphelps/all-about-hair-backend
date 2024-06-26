"use strict";

const ctrlServices = require("../controllers/services.controller");

module.exports = (app, jwtCheck, adminCheck) => {
  app.get("/api/admin/services", ctrlServices.getServices);

  app.get(
    "/api/admin/services/:id", 
    // jwtCheck, 
    ctrlServices.getServiceById
  );
  // app.post("/api/admin/services", jwtCheck, adminCheck, ctrlServices.create);
  app.post("/api/admin/services/new", ctrlServices.create);
  app.put(
    "/api/admin/services/update/:id",
    // jwtCheck,
    // adminCheck,
    ctrlServices.update
  );
  app.delete(
    "/api/admin/services/:id",
    // jwtCheck,
    // adminCheck,
    ctrlServices.delete
  );
};
