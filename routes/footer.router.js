"use strict";

const ctrlFooter = require(appRoot + "/controllers/footer.controller");

module.exports = (app, jwtCheck, adminCheck) => {
  app.get("/api/admin/footerAbout", ctrlFooter.getFooterInfo);
  app.put(
    "/api/admin/footerAbout/update/:id",
    jwtCheck,
    adminCheck,
    ctrlFooter.update
  );
};
