const { canelAppointmentForDoctor, appointmentCompleted } = require("../controllers/appointment.controller");
const { doctorLogin, protectDoctorRoutes, doctorData, dashboardDoctorData, getDoctorAppointments, updateProfile, doctorLogout, getDoctorsForUser } = require("../controllers/doctor.controller");

const doctorRouter = require("express").Router();
doctorRouter.route("/login").post(doctorLogin)
doctorRouter.route("/doctor-data").get(protectDoctorRoutes,doctorData)
doctorRouter.route("/dashboard").post(protectDoctorRoutes,dashboardDoctorData)
doctorRouter.route("/appointments").post(protectDoctorRoutes,getDoctorAppointments)
doctorRouter.route("/update").post(protectDoctorRoutes,updateProfile)
doctorRouter.route("/logout").get(protectDoctorRoutes,doctorLogout)
doctorRouter.route("/doctors").get(getDoctorsForUser)
doctorRouter.route("/cancel").post(protectDoctorRoutes,canelAppointmentForDoctor)
doctorRouter.route("/complete").post(protectDoctorRoutes,appointmentCompleted)


module.exports = {
    doctorRouter
}