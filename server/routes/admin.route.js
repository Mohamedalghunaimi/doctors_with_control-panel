const { addDoctor, getAppointments, getDoctors, dashboardData, adminLogin, authAdmin, isAdmin, updateDoctor, adminLogout, canceledAppointmentByAdmin } = require("../controllers/admin.controller");
const { cancelAppointmentForUser } = require("../controllers/appointment.controller");
const { upload } = require("../methods/multer");

const adminRouter = require("express").Router();
adminRouter.route("/add-doctor").post(isAdmin,upload.single("image"),addDoctor)
adminRouter.route("/appointments").get(isAdmin,getAppointments)
adminRouter.route("/doctors").get(isAdmin,getDoctors)
adminRouter.route("/dashboard-data").get(isAdmin,dashboardData)
adminRouter.route("/login").post(adminLogin)
adminRouter.route("/is-admin").get(isAdmin,authAdmin)
adminRouter.route("/update-doctor").post(isAdmin,updateDoctor)
adminRouter.route("/logout").get(isAdmin,adminLogout)
adminRouter.route("/cancel").post(isAdmin,canceledAppointmentByAdmin)

module.exports = {
    adminRouter
}