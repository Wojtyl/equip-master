import e from "express";
import * as authController from "../controllers/authController";
import { DashboardController } from "../controllers/DashboardController";
const dashboardRouter = e.Router();

const dashboardController = new DashboardController();

dashboardRouter.route("/upcomingDeliveries")
    .get(authController.auth, dashboardController.getUpcomingDeliveries())

dashboardRouter.route("/deliveriesGraph")
    .get(authController.auth, dashboardController.getDeliveriesGraphData())

dashboardRouter.route("/topSuppliers")
    .get(authController.auth, dashboardController.getTopSippliers())

dashboardRouter.route("/topProducts")
    .get(authController.auth, dashboardController.getTopProducts())

export { dashboardRouter };