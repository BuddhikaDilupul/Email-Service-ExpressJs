const express = require("express");
const morgan = require("morgan");

const config = require("../config");
const apiRouter = require("../routes/api");
const errorHandler = require("../middlewares/errorHandler");
const Eureka = require("eureka-js-client").Eureka;

const app = express();
const { networkInterfaces } = require('os');

const getPrivateIP = () => {
  const interfaces = networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (!address.internal && address.family === 'IPv4') {
        return address.address;
      }
    }
  }
  return null;
}
const eureka = new Eureka({
  instance: {
    app: "Email-Service",
    vipAddress: "Email-Service",
    hostName: getPrivateIP(),
    ipAddr: "172.0.0.1",
    port: {
      $: 4042,
      "@enabled": "true",
    },
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "127.0.0.1",
    port: 8761,
    servicePath: "/eureka/apps/",
  },
});

eureka.start((error) => {
  if (error) {
    console.log("Eureka registration failed: ", error);
  } else {
    console.log("Eureka registration successful!");
  }
});


app.use(morgan("tiny")); //logger
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(function (req, res, next) {
  console.log("Logged");
  next();
});

app.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});
app.use("/email", apiRouter);

app.use(errorHandler.handleError);

exports.start = () => {
  app.listen(config.port, (err) => {
    if (err) {
      console.log("Error: ${err}");
      process.exit(-1);
    }
    console.log("Email Service is working at port", config.port);
  });
};

