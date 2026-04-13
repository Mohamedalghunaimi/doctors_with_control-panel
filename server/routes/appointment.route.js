const { isAdmin } = require("../controllers/admin.controller");
const { addAppointment, appointmentsForUser, changeAvaliablity, cancelAppointmentForUser, payOnline, isPaied } = require("../controllers/appointment.controller");
const {  protectAuth} = require("../controllers/user.controller");

const appointmentRouter = require("express").Router();
appointmentRouter.route("/add-appointment").post(protectAuth,addAppointment)
appointmentRouter.route("/my-appointments").post(protectAuth,appointmentsForUser)
appointmentRouter.route("/change-status").post(isAdmin,changeAvaliablity)
appointmentRouter.route("/user-cancel").post(protectAuth,cancelAppointmentForUser)
appointmentRouter.route("/pay-online").post(protectAuth,payOnline)
appointmentRouter.route("/is-paied").post(protectAuth,isPaied)

module.exports = {
    appointmentRouter
}