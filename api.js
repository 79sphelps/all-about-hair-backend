"use strict";

/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */
const { expressjwt: jwt } = require("express-jwt"); // const jwt = require("express-jwt");
// const jwt2 = require("jsonwebtoken");
const jwks = require("jwks-rsa");

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */
module.exports = (app, config) => {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5, // was 5
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    // algorithm: "RS256"
    algorithms: ["RS256"]
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf("admin") > -1) {
      next();
    } else {
      res.status(401).send({ message: "Not authorized for admin access" });
    }
  };

  // GET API root
  app.get("/api/", (req, res) => {
    res.send("API Works");
  });

  require(appRoot + "/routes/contact.router")(
    app,
    jwtCheck,
    adminCheck
  );
  require(appRoot + "/routes/gallery.router")(
    app,
    jwtCheck,
    adminCheck
  );
  require(appRoot + "/routes/homepage.router")(
    app,
    jwtCheck,
    adminCheck
  );
  require(appRoot + "/routes/personel.router")(
    app,
    jwtCheck,
    adminCheck
  );
  require(appRoot + "/routes/services.router")(
    app,
    jwtCheck,
    adminCheck
  );
  require(appRoot + "/routes/request.router")(
    app,
    jwtCheck,
    adminCheck
  );
  require(appRoot + "/routes/appointment.router")(
    app,
    jwtCheck,
    adminCheck
  );

  require(appRoot + "/routes/footer.router")(
    app,
    jwtCheck,
    adminCheck
  );
};
