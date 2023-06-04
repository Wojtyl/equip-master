const Invoice = require("../models/invoiceModel");

const generalController = require("./generalController");

exports.getAllInvoices = generalController.getAll(Invoice);
exports.getInvoice = generalController.getOne(Invoice);
exports.createInvoice = generalController.createOne(Invoice);
exports.updateInvoice = generalController.updateOne(Invoice);
exports.deleteInvoice = generalController.deleteOne(Invoice);
exports.deleteAllInvoices = generalController.deleteAll(Invoice);
