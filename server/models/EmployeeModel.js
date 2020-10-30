var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    employeeId: { type: String, required: true, unique: true },
    employeeName: { type: String },
    employeePassword: { type: String },
    dateOfBirth: { type: String },
    dateOfJoining: { type: String },
    designation: { type: String },
    mailId: { type: String },
    reportingTo: { type: String },
    team: { type: String },
    contactNumber: { type: String },
    empType: { type: String, enum: ["HR", "developer", "teamLead", "productManager"], default: "HR" },

});


module.exports = mongoose.model("Employee", EmployeeSchema);


