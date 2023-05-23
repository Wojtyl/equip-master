const Delivery = require("./../models/deliveryModel");
const generalController = require("./generalController");

exports.createDelivery = generalController.createOne(Delivery);
exports.getDelivery = generalController.getOne(Delivery);
exports.getAllDeliveries = generalController.getAll(Delivery);
