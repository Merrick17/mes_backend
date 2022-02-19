const Service = require("../models/service.model");
const addNewService = async (req, res) => {
  try {
    let { serviceName, serviceManager } = req.body;
    let newService = new Service({
      serviceName,
      serviceManager
    });
    let result = await newService.save();
    res.status(200).json({
      succes: true,
      message: "Service created "
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};

const GetAllServices = async (req, res) => {
  try {
    let result = await Service.find().populate(
      "serviceManager",
      "firstName lastName"
    );
    res.status(200).json({
      succes: true,
      message: result
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};

const updateService = async (req, res) => {
  try {
    const dataToUpdate = req.body;
    let { id } = req.params;
    const { ...updateData } = dataToUpdate;
    const result = await Service.findByIdAndUpdate(id, updateData, {
      new: true
    });
    res.status(200).json({
      succes: true,
      message: "Service Updated "
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};

const deleteService = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await Service.findByIdAndDelete(id);
    res.status(200).json({
      succes: true,
      message: "Service Deleted "
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message
    });
  }
};

module.exports = {
  deleteService,
  addNewService,
  GetAllServices,
  updateService
};
