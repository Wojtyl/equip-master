import e from "express";
import * as authController from "../controllers/authController";
import { DashboardController } from "../controllers/DashboardController";
const dashboardRouter = e.Router();

const dashboardController = new DashboardController();

dashboardRouter.route("/upcomingDeliveries")
    .get(authController.auth, dashboardController.getUpcomingDeliveries())

export { dashboardRouter };