const router = require("express").Router();
const {
  addNewService,
  GetAllServices,
  deleteService,
  updateService
} = require("../controllers/service.controller");
